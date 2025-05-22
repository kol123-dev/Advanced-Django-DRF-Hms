from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer, CurrentUserSerializer, UserProfileSerializer
from .permissions import IsSuperUser, IsHospitalAdmin
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperUser | IsHospitalAdmin]  # Allow either superusers or hospital admins
    
    # Add debug code to check permissions
    def get_permissions(self):
        permissions = super().get_permissions()
        print(f"User: {self.request.user}, is_superuser: {self.request.user.is_superuser}, role: {self.request.user.role}")
        return permissions
    
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        # Only allow updating limited fields like name, phone, etc.
        user = request.user
        profile_data = request.data.pop('profile', None)

        # Update user fields
        user_serializer = CurrentUserSerializer(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()

        # Update profile fields
        if profile_data:
            profile = user.profile
            profile_serializer = UserProfileSerializer(profile, data=profile_data, partial=True)
            if profile_serializer.is_valid():
                profile_serializer.save()
            else:
                return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(CurrentUserSerializer(user).data)    
