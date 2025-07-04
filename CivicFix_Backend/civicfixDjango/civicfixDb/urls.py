from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from .views import ObtainTokenView, RefreshTokenView

urlpatterns = [
    # User Endpoints
    path('api/users/register', UserRegisterView.as_view({'post': 'register'}), name='user-register'),
    
    # Complaint Endpoints
    path('api/users/create-complaint', ComplaintViewSet.as_view({'post': 'createComplaint'}), name='create-complaint'),
    path('api/users/detect-complaint-type', ComplaintViewSet.as_view({'post': 'detectComplaintType'}), name='detect-complaint-type'),
    path('api/complaints/<int:pk>/update', ComplaintUpdateView.as_view(), name='complaint-update'),
    path('api/complaints/<int:pk>', ComplaintGetView.as_view(), name='complaint-get'),
    path('api/complaints', ComplaintListView.as_view(), name='complaint-list'),
    
    # JWT Token Endpoints
    path('api/user/login', ObtainTokenView.as_view(), name='obtain_token'),
    path('api/team/login', ObtainTokenTeamView.as_view(), name='obtain_token'),
    path('api/token/refresh', RefreshTokenView.as_view(), name='token_refresh'),
    path('api/admin/login', ObtainTokenAdminView.as_view(), name='admin-login'),
    path('api/subadmin/login', ObtainTokenSubAdminView.as_view(), name='subadmin-login'),
    
    # URL
    path('api/teamusers-available', TeamUserWithoutTeamListView.as_view(), name='teamuser-without-team'),
    # List of all teams by department
    path('api/teams/list', TeamListByDepartmentView.as_view(), name='team-list-by-department'),
    # Create team
    path('api/team/create', Teamcreateview.as_view(), name='team-create'),
    # Update team
    path('api/team/<int:pk>/update', TeamUpdateView.as_view(), name='team-update'),
    # List of all team users
    path('api/teamusers', TeamuserListView.as_view(), name='teamuser-list'),
    # Create team user
    path('api/teamusers/create', TeamuserCreateView.as_view(), name='teamuser-create'),
    # Update team user
    path('api/teamusers/<int:pk>/update', TeamuserUpdateView.as_view(), name='teamuser-update'),
    # Delete team user
    path('api/teamusers/<int:pk>/delete', TeamuserDeleteView.as_view(), name='teamuser-delete'),
    
    # Department Endpoints
    path('api/departments/create', DepartmentCreateView.as_view(), name='department-create'),
    path('api/departments', DepartmentListView.as_view(), name='department-list'),
    
    # Proof of Resolution Endpoints
    path('api/proof-of-resolution', ProofOfResolutionCreateView.as_view(), name='proof-create'),
    path('api/get-proof-of-resolution',ProofOfResolutionDetailView.as_view(), name='proof-by-complaint-id'),
    
    # Feedback Endpoints
    path('api/feedback', FeedbackCreateView.as_view(), name='feedback-create'),   # Add Feedback
    path('api/feedback/all', FeedbackListView.as_view(), name='feedback-list'),   # Get All Feedback
    path('api/feedback/get', FeedbackByComplaintIdView.as_view(), name='feedback-detail'),  # Get Feedback by Complaint ID


    # Charts Stats
    path('api/complaints/stats', ComplaintStatsView.as_view(), name='complaint-stats'),
    path('api/complaints/map-coords', ComplaintCoordsMapView.as_view(), name='complaint-map-coords'),
    path('api/complaints/bar-chart-stats', ComplaintBarChartStatsView.as_view(), name='complaint-bar-chart-stats'),
    path('api/complaints/pie-chart-stats', ComplaintPieChartStatsView.as_view(), name='complaint-pie-chart-stats'),
    path('api/complaints/line-chart-stats', ComplaintLineChartStatsView.as_view(), name='complaint-line-chart-stats'),
    path('api/complaints/yearly-stats', ComplaintYearlyStatsView.as_view(), name='complaint-line-yearly-stats'),
    path('api/department-complaint-stats', DepartmentComplaintStatsView.as_view(), name='department-complaint-pie-stats'),
    path("api/department-monthly-stats", DepartmentMonthlyStatsView.as_view(), name="department-monthly--multi-line-stats"),
]

