from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import MotionEvent
from .serializers import MotionEventSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if not username or not password or not email:
            return Response({"error": "Username, email, and password are required."}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already in use."}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=201)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    users = User.objects.all().values('id', 'username', 'email')
    return Response(list(users))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def motion_event_post(request):
    serializer = MotionEventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Received and saved", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def motion_event_get(request):
    events = MotionEvent.objects.all().order_by('-timestamp')
    serializer = MotionEventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
