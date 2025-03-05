from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
import base64

class BinaryField(serializers.CharField):
    def to_internal_value(self, data):
        try:
            if isinstance(data, str):
                return data
            raise serializers.ValidationError("Invalid file encoding")
        except Exception:
            raise serializers.ValidationError("Invalid file encoding")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'user_id',
            'name',
            'father_name',
            'cnic',
            'address',
            'phone',
            'email',
            'password',
            'role'
        ]
        extra_kwargs = {
            'password': {'write_only': True} # Password is write-only
        }
        
class ComplaintSerializer(serializers.ModelSerializer):
    upload_image = serializers.CharField(write_only=True, required=False)  # Base64 string for input
    image_url = serializers.SerializerMethodField(read_only=True)  # For output
    department = serializers.SlugRelatedField(
        queryset=Department.objects.all(),
        slug_field='department_name',
        required=False
    )  # Accepts department name for input

    class Meta:
        model = Complaint
        exclude=['assigned_team_id','status','resolved_status']

    def create(self, validated_data):
        # Handle binary data for the upload_image
        upload_image = validated_data.pop('upload_image', None)
        if upload_image:
            validated_data['upload_image'] = base64.b64decode(upload_image)
        complaint = Complaint.objects.create(**validated_data)
        return complaint

    def get_image_url(self, obj):
        if obj.upload_image:
            return f"data:image/jpeg;base64,{base64.b64encode(obj.upload_image).decode('utf-8')}"
        return None
    
class ComplaintListSerializer(serializers.ModelSerializer):
    assigned_to = serializers.StringRelatedField() 
    department = serializers.StringRelatedField() 
    class Meta:
        model = Complaint
        fields='__all__'
        

class TeamuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teamuser
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class ComplaintUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['assigned_team_id', 'status','resolved_status']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class ProofOfResolutionSerializer(serializers.ModelSerializer):
    complaint_id = serializers.PrimaryKeyRelatedField(queryset=Complaint.objects.all(), source='complaint', required=True)
    resolved_status = serializers.CharField(write_only=True)
    proof_image = BinaryField(required=True)
    status = serializers.CharField(write_only=True)

    class Meta:
        model = ProofOfResolution
        fields = ['proof_image', 'proof_description', 'complaint_id', 'resolved_status', 'status']

    def create(self, validated_data):
        complaint = validated_data.pop('complaint')
        resolved_status = validated_data.pop('resolved_status')
        status = validated_data.pop('status')
        proof_image = validated_data.pop('proof_image')

        complaint.resolved_status = resolved_status
        complaint.status = status
        complaint.save()

        proof = ProofOfResolution.objects.create(
            complaint=complaint,
            proof_image=base64.b64decode(proof_image),  # Decode and save binary data
            **validated_data
        )
        return proof


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['__all__']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['__all__']

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        try:
            admin = Admin.objects.get(username=username, password=password)
            if admin:
                refresh = RefreshToken.for_user(admin)
                return {
                    "username": admin.username,
                    "role":"admin",
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh)
                }
        except Admin.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

class SubAdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        try:
            subadmin = SubAdmin.objects.get(username=username, password=password)
            if subadmin:
                refresh = RefreshToken.for_user(subadmin)
                return {
                    "username": subadmin.username,
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                    "role":"subadmin",
                    "department": subadmin.department.department_name
                }
        except SubAdmin.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

