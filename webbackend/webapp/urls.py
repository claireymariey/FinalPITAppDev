from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views.list_users, name='list_users'),
    path('motion/post/', views.motion_event_post, name='motion_event_post'),  # POST endpoint
    path('motion/get/', views.motion_event_get, name='motion_event_get'),    # GET endpoint
]
    