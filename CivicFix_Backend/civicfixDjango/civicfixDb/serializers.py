from rest_framework import serializers
from .models import *
import base64
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
        fields = [
            'complaint_id',
            'complaint_type',
            'complaint_category',
            'complaint_details',
            'ref_number',
            'submission_date',
            'status',
            'upload_image',
            'image_url',
            'user_id',
            'assigned_team_id',
            'department',  # Include department
        ]

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



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['__all__']


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['__all__']


class ComplaintStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintStatus
        fields = ['__all__']


class ProofOfResolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProofOfResolution
        fields = ['__all__']


class SubAdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubAdministrator
        fields = ['__all__']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['__all__']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['__all__']