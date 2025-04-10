from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
import base64
from django.contrib.auth.hashers import make_password

class BinaryField(serializers.CharField):
    def to_internal_value(self, data):
        try:
            if isinstance(data, str):
                return data
            raise serializers.ValidationError("Invalid file encoding")
        except Exception:
            raise serializers.ValidationError("Invalid file encoding")

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'name',
            'father_name',
            'cnic',
            'address',
            'phone',
            'email',
            'password',
        ]
        
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
        fields="__all__"

    def create(self, validated_data):
        # Handle binary data for the upload_image
        upload_image = validated_data.pop('upload_image', None)
        if upload_image:
            validated_data['upload_image'] = base64.b64decode(upload_image)
        complaint = Complaint.objects.create(**validated_data)
        return complaint

    def get_image_url(self, obj):
        if obj.upload_image:
            return f"{base64.b64encode(obj.upload_image).decode('utf-8')}"
        return None
    
class ComplaintListSerializer(serializers.ModelSerializer):
    assigned_to = serializers.StringRelatedField() 
    department = serializers.StringRelatedField() 
    feedback_submitted = serializers.BooleanField(read_only=True)  # Add feedback flag
    class Meta:
        model = Complaint
        exclude = ['upload_image']
        

class TeamuserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

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

class ProofOfResolutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProofOfResolution
        fields = ['proof_id', 'complaint', 'proof_image', 'proof_description', 'date_uploaded']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['__all__']

class FeedbackSerializer(serializers.ModelSerializer):
    complaint_id = serializers.PrimaryKeyRelatedField(
        queryset=Complaint.objects.all(), source='complaint', required=True
    )

    class Meta:
        model = Feedback
        fields = ['feedback_id', 'complaint_id', 'rating', 'comment', 'date']

    def validate_rating(self, value):
        """Ensure rating is between 1 and 5"""
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

