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
from django.utils.timezone import now, timedelta
from datetime import datetime
from django.db.models import Count
import calendar
from dateutil.relativedelta import relativedelta
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from civicfixDb.authentication import TokenOnlyAuthentication

def notify(message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications",
            {
                "type": "send_notification",
                "message": message,
            },
        )

# Create your views here.
class ObtainTokenView(APIView):
    permission_classes=[]
    authentication_classes = []
      # No permission required

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
                'user_id': user.id,
                'name': user.name,
                'father_name': user.father_name,
                'cnic': user.cnic,
                'address': user.address,
                'phone': user.phone,
                'email': user.email,
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token)
            }
            return Response({
                'data': data,
                'message':'User authenticated successfully'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"data": None,'message':{ "status":500,"description": f"Error occurred: {str(e)}"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class ObtainTokenTeamView(APIView):
    permission_classes=[]
    authentication_classes = [ ]
      # No permission required

    def post(self, request, *args, **kwargs):
        return self.authUser(request, *args, **kwargs)
    
    def authUser(self, request, *args, **kwargs):
        # authentication required, could be set to a specific user if needed
        body= request.body
        body = json.loads(body)
        data=body['data']
        email = data['email']
        password= data['password']
        
        # Validate required fields
        if not email or not password:
            return Response({"data": None,'message':{ "status":400,"description": 'email and Password are required.'}}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        user = Teamuser.objects.filter(email=email, password=password).first()
        team=Team.objects.filter(team_members=user).first()
        if not user:
            return Response({"data": None,'message':{ "status":401,"description": 'Invalid email or Password.'}}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            refresh = RefreshToken.for_user(user)
            data = {
                'user_id': user.id,
                'name': user.name,
                'phone': user.phone,
                'email': user.email,
                'team_id': team.id ,
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token)
            }
            return Response({
                'data': data,
                'message':'User authenticated successfully'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"data": None,'message':{ "status":500,"description": f"Error occurred: {str(e)}"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ObtainTokenAdminView(APIView):
    permission_classes=[]
    authentication_classes = []
      # No permission required

    def post(self, request, *args, **kwargs):
        return self.authUser(request, *args, **kwargs)
    
    def authUser(self, request, *args, **kwargs):
        # authentication required, could be set to a specific user if needed
        body= request.body
        data = json.loads(body)
        username = data['username']
        password= data['password']
        
        # Validate required fields
        if not username or not password:
            return Response({"data": None,'message':{ "status":400,"description": 'Username and Password are required.'}}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        user = Admin.objects.filter(username=username, password=password).first()
        if not user:
            return Response({"data": None,'message':{ "status":401,"description": 'Invalid username or Password.'}}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            refresh = RefreshToken()
            refresh['id'] = user.id
            refresh['username'] = user.username
            refresh['role'] = 'admin'
            data = {
                    "username": user.username,
                    "role":"admin",
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh)
                }
            return Response({
                'data': data,
                'message':'User authenticated successfully'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"data": None,'message':{ "status":500,"description": f"Error occurred: {str(e)}"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ObtainTokenSubAdminView(APIView):
    permission_classes=[]
    authentication_classes = []
      # No permission required

    def post(self, request, *args, **kwargs):
        return self.authUser(request, *args, **kwargs)
    
    def authUser(self, request, *args, **kwargs):
        # authentication required, could be set to a specific user if needed
        body= request.body
        data = json.loads(body)
        username = data['username']
        password= data['password']
        
        # Validate required fields
        if not username or not password:
            return Response({"data": None,'message':{ "status":400,"description": 'Username and Password are required.'}}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        user = SubAdmin.objects.filter(username=username, password=password).first()
        if not user:
            return Response({"data": None,'message':{ "status":401,"description": 'Invalid username or Password.'}}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            refresh = RefreshToken()
            refresh['id'] = user.id
            refresh['username'] = user.username
            refresh['role'] = 'subadmin',
            refresh['department'] = user.department.department_name
            data = {
                    "username": user.username,
                    "role":"subadmin",
                    "department":user.department.department_name,
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh)
                }
            return Response({
                'data': data,
                'message':'Sub Admin authenticated successfully'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"data": None,'message':{ "status":500,"description": f"Error occurred: {str(e)}"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RefreshTokenView(APIView):
    permission_classes=[]
    authentication_classes = []
      # No permission required

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
    permission_classes=[]
    authentication_classes = []
      # No permissions required

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
            fields = ['name', 'father_name', 'cnic', 'address', 'phone', 'email', 'password']
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
    permission_classes=[]
    authentication_classes = [TokenOnlyAuthentication]
    
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
                    "message": {"status": 400, "description": "No predictions found."}
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
            notification_object={
                "title": "New Complaint",
                "body": "A new complaint has been lodged.",
                "sub_admins": list(SubAdmin.objects.filter(department__department_name=department_name).values_list('username', flat=True)),
            }
            notify(notification_object)
            return Response(
                {"data": serializer.data, "message": {"status": 200, "description": "Complaint created successfully"}},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        
class ComplaintUpdateView(generics.UpdateAPIView):
    permission_classes=[]
    queryset = Complaint.objects.all()
    serializer_class = ComplaintUpdateSerializer
    authentication_classes = [TokenOnlyAuthentication]

    def get_object(self):
        complaint = super().get_object()
        return complaint

    def update(self, request, *args, **kwargs):
        complaint = self.get_object()
        data = request.data
        complaint_id = kwargs['pk']

        serializer = self.get_serializer(complaint, data=data, partial=True)
        if serializer.is_valid():
            if data['status'] == "IN PROGRESS":
                notification_object={
                    "title": "Complaint",
                    "body": f"Your complaint has been {data['status'].lower()}",
                    "user_id": Complaint.objects.filter(complaint_id=complaint_id).first().user_id.id
                }
                notify(notification_object)
            if data['status'] == "PENDING":
                notification_object={
                    "title": "New Complaint Assigned",
                    "body": f"New Complaint has been assigned to you",
                    "team_id":data["assigned_team_id"] 
                }
                notify(notification_object)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class ComplaintGetView(generics.RetrieveAPIView):
    permission_classes = []
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    authentication_classes = [TokenOnlyAuthentication]
    lookup_field = 'pk'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user_phone_number = instance.user_id.phone if instance.user_id else None
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['user_phone_number'] = user_phone_number
        team_member_phone_number = instance.assigned_team_id.team_members.first().phone if instance.assigned_team_id else None
        data['team_member_phone_number'] = team_member_phone_number
        return Response(data)

class ComplaintListView(generics.ListAPIView):
    permission_classes=[]
    serializer_class = ComplaintListSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def get_queryset(self):
        user = self.request.user
        department_name = self.request.query_params.get('department', None)
        team_id = self.request.query_params.get('team_id', None)
        user_id =self.request.query_params.get('user_id', None)
        if department_name:
            return Complaint.objects.filter(department__department_name__iexact=department_name)

        if team_id:
            return Complaint.objects.filter(assigned_team_id=team_id)
        
        if user_id:
            return Complaint.objects.filter(user_id=user_id)

        if not department_name and not team_id and not user_id:
            return Complaint.objects.all()


    
class Teamcreateview(generics.CreateAPIView):
    permission_classes=[]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class TeamUpdateView(generics.UpdateAPIView):
    permission_classes=[]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


class TeamuserCreateView(generics.CreateAPIView):
    permission_classes=[]
    queryset = Teamuser.objects.all()
    serializer_class = TeamuserSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
        

class TeamuserListView(generics.ListAPIView):
    permission_classes=[]
    queryset = Teamuser.objects.all()
    serializer_class = TeamuserSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def list(self, request, *args, **kwargs):    
       return super().list(request, *args, **kwargs)

class TeamUserWithoutTeamListView(generics.ListAPIView):
    permission_classes=[]
    queryset = Teamuser.objects.filter(team__isnull=True)  # Users without assigned team
    serializer_class = TeamuserSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

class TeamuserUpdateView( generics.UpdateAPIView):
    permission_classes=[]
    queryset = Teamuser.objects.all()
    serializer_class = TeamuserSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
        

class TeamuserDeleteView( generics.DestroyAPIView):
    permission_classes=[]
    queryset = Teamuser.objects.all()
    serializer_class = TeamuserSerializer
    authentication_classes = [TokenOnlyAuthentication]
    

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
        


class DepartmentCreateView(generics.CreateAPIView):
    permission_classes=[]
    authentication_classes = [TokenOnlyAuthentication]
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentListView(generics.ListAPIView):
    permission_classes=[]
    authentication_classes = [TokenOnlyAuthentication]
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    
class TeamListByDepartmentView(generics.ListAPIView):
    permission_classes=[]
    authentication_classes = [TokenOnlyAuthentication]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def get_queryset(self):
        department_name = self.request.query_params.get('department_name')
        if department_name:
            department = get_object_or_404(Department, deptt_name=department_name)
            return Team.objects.filter(department=department)
        return Team.objects.all()

class ProofOfResolutionCreateView(generics.CreateAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    queryset = ProofOfResolution.objects.all()
    serializer_class = ProofOfResolutionSerializer
    permission_classes = []

    def perform_create(self, serializer):
        serializer.save()
        complaint_id = self.request.data['complaint_id']
        status = self.request.data['status']
        complaint = Complaint.objects.get(complaint_id=complaint_id)
        
        notification_object = {
            "title": "Complaint " + status,
            "body": f"Complaint has been {status.lower()}",
            "user_id": complaint.user_id
        }
        notify(notification_object)

class ProofOfResolutionListView(generics.ListAPIView):
    serializer_class = ProofOfResolutionSerializer
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]

    def get_queryset(self):
        complaint_id = self.request.query_params.get('complaint_id')
        return ProofOfResolution.objects.filter(complaint__complaint_id=complaint_id)

# Charts Stats
class ComplaintStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]
    
    def get_queryset(self):
        return Complaint.objects.all()

    def get(self, request, *args, **kwargs):
        filter_param = request.query_params.get("filter", None)
        department = request.query_params.get("department", None)
        queryset = self.get_queryset()

        # Apply department filter if provided
        if department:
            queryset = queryset.filter(department__department_name=department)

        # Time filters
        if filter_param == "today":
            today = now().date()
            queryset = queryset.filter(submission_date__date=today)

        elif filter_param == "yesterday":
            yesterday = now().date() - timedelta(days=1)
            queryset = queryset.filter(submission_date__date=yesterday)

        elif filter_param == "last7days":
            start_date = now().date() - timedelta(days=7)
            queryset = queryset.filter(submission_date__date__gte=start_date)

        elif filter_param == "last30days":
            start_date = now().date() - timedelta(days=30)
            queryset = queryset.filter(submission_date__date__gte=start_date)

        # Complaint status counts
        stats = [
            {"title": "Reported", "count": queryset.count(), "chip": filter_param},
            {"title": "In Progress", "count": queryset.filter(status="IN PROGRESS").count(), "chip": filter_param},
            {"title": "Resolved", "count": queryset.filter(status="RESOLVED").count(), "chip": filter_param},
            {"title": "Closed", "count": queryset.filter(resolved_status="CLOSED").count(), "chip": filter_param},
        ]

        return Response(stats)
    
class ComplaintBarChartStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]

    def get_queryset(self):
        return Complaint.objects.all()

    def get(self, request, *args, **kwargs):
        department = request.query_params.get("department", None)
        queryset = self.get_queryset()

        if department:
            queryset = queryset.filter(department__department_name=department)

        today = now()
        labels = []
        reported_data = []
        resolved_data = []
        closed_data = []

        for i in range(11, -1, -1):
            first_day = (today - relativedelta(months=i)).replace(day=1)
            last_day = (first_day + relativedelta(months=1)) - timedelta(days=1)
            labels.append(first_day.strftime("%b"))

            month_complaints = queryset.filter(submission_date__range=(first_day, last_day))
            reported_data.append(month_complaints.count())
            resolved_data.append(month_complaints.filter(status="RESOLVED").count())
            closed_data.append(month_complaints.filter(resolved_status="CLOSED").count())

        stats = {
            "labels": labels,
            "datasets": [
                {"label": "Reported", "data": reported_data},
                {"label": "Resolved", "data": resolved_data},
                {"label": "Closed", "data": closed_data},
            ],
        }

        return Response(stats)

    
class ComplaintPieChartStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]

    def get(self, request, *args, **kwargs):
        department = request.query_params.get('department', None)
        queryset = Complaint.objects.all()

        if department:
            queryset = queryset.filter(department__department_name=department)

        reported = queryset.count()
        resolved = queryset.filter(status="RESOLVED").count()
        closed = queryset.filter(resolved_status="CLOSED").count()

        data = {
            "labels": ["Reported", "Resolved", "Closed"],
            "data": [reported, resolved, closed],
        }
        return Response(data)

class ComplaintLineChartStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]

    def get(self, request, *args, **kwargs):
        department = request.query_params.get("department", None)
        today = now()
        labels = []
        reported_counts = []
        resolved_counts = []
        closed_counts = []

        for i in range(11, -1, -1):
            first_day = (today - relativedelta(months=i)).replace(day=1)
            last_day = (first_day + relativedelta(months=1)) - timedelta(days=1)
            labels.append(first_day.strftime("%b"))

            queryset = Complaint.objects.filter(submission_date__range=(first_day, last_day))
            if department:
                queryset = queryset.filter(department__department_name=department)

            reported_counts.append(queryset.count())
            resolved_counts.append(queryset.filter(status="RESOLVED").count())
            closed_counts.append(queryset.filter(resolved_status="CLOSED").count())

        data = {
            "labels": labels,
            "datasets": [
                {"label": "Reported", "data": reported_counts},
                {"label": "Resolved", "data": resolved_counts},
                {"label": "Closed", "data": closed_counts},
            ],
        }
        return Response(data)


class ComplaintYearlyStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]

    def get(self, request, *args, **kwargs):
        today = now()
        current_month = today.month
        current_year = today.year
        labels = []
        datasets = {
            "label": "Complaints",
            "data": []
        }

        for i in range(12):
            month = (current_month - i) % 12 or 12
            year = current_year if current_month - i > 0 else current_year - 1
            labels.append(calendar.month_name[month])
            start_date = datetime(year, month, 1)
            if month == 12:
                end_date = datetime(year + 1, 1, 1)
            else:
                end_date = datetime(year, month + 1, 1)
            
            count = Complaint.objects.filter(
                submission_date__gte=start_date,
                submission_date__lt=end_date
            ).count()
            datasets["data"].append(count)

        labels.reverse()
        datasets["data"].reverse()

        return Response({
            "labels": labels,
            "datasets": [datasets]
        })


class DepartmentComplaintStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]

    def get(self, request, *args, **kwargs):
        departments = Department.objects.all()
        labels = []
        data = []
        
        for department in departments:
            labels.append(department.department_name)
            complaint_count = Complaint.objects.filter(department=department).count()
            data.append(complaint_count)

        stats = {
            "labels": labels,
            "data": data
        }

        return Response(stats)

class DepartmentMonthlyStatsView(generics.ListAPIView):
    authentication_classes = [TokenOnlyAuthentication]
    permission_classes=[]
    def get(self, request, *args, **kwargs):
        current_month = now().month
        current_year = now().year

        months = []
        for i in range(12):
            month = (current_month - i) % 12
            year = current_year if month != 0 else current_year - 1
            month = 12 if month == 0 else month
            months.append(calendar.month_name[month])

        department_names = ["LESCO", "SNGPL"]
        datasets = []
        
        for dept in department_names:
            department = Department.objects.filter(department_name=dept).first()
            if department:
                monthly_counts = []
                for i in range(12):
                    month = (current_month - i) % 12
                    year = current_year if month != 0 else current_year - 1
                    month = 12 if month == 0 else month
                    start_date = datetime(year, month, 1)
                    end_date = datetime(year, month+1, 1) if month < 12 else datetime(year+1, 1, 1)
                    count = Complaint.objects.filter(department=department, submission_date__gte=start_date, submission_date__lt=end_date).count()
                    monthly_counts.append(count)
                datasets.append({
                    "label": dept,
                    "data": monthly_counts[::-1]
                })

        data = {
            "labels": months[::-1],
            "datasets": datasets
        }

        return Response(data)
