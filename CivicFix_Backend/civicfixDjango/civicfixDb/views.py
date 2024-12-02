import numpy as np
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import json
#EasyOCR
import easyocr
# import the inference-sdk
from inference_sdk import InferenceHTTPClient
# PIL for image processing
from PIL import Image
import io
import base64


# Create your views here.
class ObtainTokenView(APIView):
    permission_classes = []  # No permission required

    def post(self, request, *args, **kwargs):
        return self.authUser(request, *args, **kwargs)
    
    def authUser(self, request, *args, **kwargs):
        # authentication required, could be set to a specific user if needed
        body= request.body
        body = json.loads(body)
        data=body['data']
        cnic = data['cnic']
        password= data['password']
        
        # Validate required fields
        if not cnic or not password:
            return Response({"data": None,'message':{ "status":400,"description": 'CNIC and Password are required.'}}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        user = CustomUser.objects.filter(cnic=cnic, password=password).first()
        if not user:
            return Response({"data": None,'message':{ "status":401,"description": 'Invalid CNIC or Password.'}}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken.for_user(user)
            data = {
                'user_id': user.user_id,
                'name': user.name,
                'father_name': user.father_name,
                'cnic': user.cnic,
                'address': user.address,
                'phone': user.phone,
                'email': user.email,
                'role': user.role,
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token)
            }
            return Response({
                'data': data,
                'message':'User authenticated successfully'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"data": None,'message':{ "status":500,"description": f"Error occurred: {str(e)}"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RefreshTokenView(APIView):
    permission_classes = []  # No permission required

    def post(self, request, *args, **kwargs):
        return self.refreshToken(request, *args, **kwargs)
    
    def refreshToken(self, request, *args, **kwargs):    
        try:
            body= request.body
            body = json.loads(body)
            data=body['data']
            refresh_token = data['refresh_token']
            
            if not refresh_token:
                return Response({"data": None, 'message': {"status": 400, "description": 'Refresh token is required.'}}, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken(refresh_token)
            data = {
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }
            return Response({'data': data, 'message':{ "status": 200, "description": 'Token refreshed successfully'}}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"data": None, 'message': {"status": 500, "description": f"Error occurred: {str(e)}"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UserRegisterView(viewsets.ViewSet):
    permission_classes = []  # No permissions required

    @action(detail=False, methods=['post'])
    def register(self, request, *args, **kwargs):
        try:
            body = request.body
            body = json.loads(body)
            data = body['data']
            
            if not data:
                return Response({
                    "data": None,
                    "message": {"status":400,"description":"Invalid request: Missing 'data' field"}
                }, status=status.HTTP_400_BAD_REQUEST)

            # Extract fields
            fields = ['name', 'father_name', 'cnic', 'address', 'phone', 'email', 'password', 'role']
            user_data = {field: data.get(field) for field in fields}

            # Validate required fields
            if not all(user_data.values()):
                return Response({
                    "data": None,
                    "message":{ "status":400,"description": "Missing required fields"}
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Check for existing cnic, phone, or email
            for field in ['cnic', 'phone', 'email']:
                if CustomUser.objects.filter(**{field: user_data[field]}).exists():
                    return Response({
                        "data": None,
                        "message": {"status": 400, "description": f"{field.capitalize()} already registered"}
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the user
            user = CustomUser.objects.create(**user_data)
            user.save()
            return Response({
                "data": None,
                "message":{ "status":200,"description": "User registered successfully"}
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({
                "data": None,
                "message":{ "status":500,"description": f"Error occurred: {str(e)}"}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ComplaintViewSet(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def detectComplaintType(self, request, *args, **kwargs):
        body = request.body
        body = json.loads(body)
        data = body.get('data', {})

        # Initialize the client
        CLIENT = InferenceHTTPClient(
            api_url="https://detect.roboflow.com",
            api_key="lAKNzp806uAafXBzJmmr"
        )

        # Decode the Base64 image
        image_base64 = data.get('image')
        if not image_base64:
            return Response({
                "data": None,
                "message": {"status": 400, "description": "Image is required."}
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            if "data:image" in image_base64:
                image_base64 = image_base64.split(",")[1]
            
            image_bytes = base64.b64decode(image_base64)
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

            original_width, original_height = image.size

        except Exception as e:
            return Response({
                "data": None,
                "message": {"status": 400, "description": f"Image processing error: {str(e)}"}
            }, status=status.HTTP_400_BAD_REQUEST)

        # Infer on the image
        try:
            result = CLIENT.infer(image, model_id="civicfix-x71zo/3")
            predictions = result.get('predictions', [])
            if not predictions:
                return Response({
                    "data": None,
                    "message": {"status": 400, "description": "No bounding box detected."}
                }, status=status.HTTP_400_BAD_REQUEST)

            # Extract the first bounding box
            box = predictions[0]
            x, y, width, height = box['x'], box['y'], box['width'], box['height']

            # Calculate crop coordinates proportionally to the original image size
            left = max(int(x - width / 2), 0)
            top = max(int(y - height / 2), 0)
            right = min(int(x + width / 2), original_width)
            bottom = min(int(y + height / 2), original_height)

            cropped_image = image.crop((left, top, right, bottom))

            #open the cropped image
            #cropped_image.show()
            
            # Convert the cropped image to numpy array for EasyOCR
            cropped_image_np = np.array(cropped_image)

            # Apply EasyOCR
            reader = easyocr.Reader(['en'])
            ocr_result = reader.readtext(cropped_image_np)
            extracted_text = " ".join([item[1] for item in ocr_result])  # Combine all detected text
            complaint_class = result['predictions'][0]['class']
            if(complaint_class=='meter_number'):
                complaint_class='SNGPL'
            elif(complaint_class=='sr_number'):
                complaint_class='LESCO'
                
            return Response({
                "data": {
                    "inference": result,
                    "complaint_class": complaint_class,
                    "ocr_text": extracted_text
                },
                "message": {"status": 200, "description": "Complaint Type Detected"}
            })

        except Exception as e:
            return Response({
                "data": None,
                "message": {"status": 500, "description": f"Inference or OCR error: {str(e)}"}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    @action(detail=False, methods=['get'])
    def getComplaintsByUserId(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response(
                {"data": None, 'message': {"status": 400, "description": 'User ID is required.'}},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            complaints = Complaint.objects.filter(user_id=int(user_id))
            serializer = ComplaintSerializer(complaints, many=True)
            return Response({
                'data': serializer.data,
                "message": {"status": 200, "description": "Complaints fetched successfully"}
            })
        except Exception as e:
            return Response(
                {"data": None, 'message': {"status": 500, "description": f"Error occurred: {str(e)}"}},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    
    @action(detail=False, methods=['post'])
    def createComplaint(self, request, *args, **kwargs):
        body = request.body
        body = json.loads(body)
        data = body['data']
        department_name = data.get('department')
        
        # Resolve department by name if provided
        if department_name:
            try:
                department = Department.objects.get(department_name=department_name)
                data['department'] = department.department_name
            except Department.DoesNotExist:
                return Response(
                    {"data": None, "message": {"status": 400, "description": "Invalid department name."}},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = ComplaintSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"data": serializer.data, "message": {"status": 200, "description": "Complaint created successfully"}},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        