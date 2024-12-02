from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserRegisterView, 
    ComplaintViewSet
)
from .views import ObtainTokenView, RefreshTokenView

urlpatterns = [
    # User Endpoints
    path('api/users/register', UserRegisterView.as_view({'post': 'register'}) ,name='user-register'),
    
    # Complaint Endpoints
    path('api/users/get-complaints', ComplaintViewSet.as_view({'get': 'getComplaintsByUserId'}) ,name='get-complaints'),
    path('api/users/create-complaint', ComplaintViewSet.as_view({'post': 'createComplaint'}) ,name='create-complaint'),
    path('api/users/detect-complaint-type', ComplaintViewSet.as_view({'post': 'detectComplaintType'}) ,name='detect-complaint-type'),
    
    # JWT Token Endpoints
    path('api/user/login', ObtainTokenView.as_view(), name='obtain_token'),
    path('api/token/refresh', RefreshTokenView.as_view(), name='token_refresh'),
]
