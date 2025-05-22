#users/permissions.py
from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        print(f"Checking superuser: {request.user.email} is_superuser={request.user.is_superuser}")
        return request.user.is_superuser


class IsHospitalAdmin(BasePermission):
    def has_permission(self, request, view):
        print(f"Checking hospital admin: {request.user.email} role={request.user.role}")
        return request.user.role == 'Hospital Admin'


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        print(f"Checking doctor: {request.user.email} role={request.user.role}")
        return request.user.role == 'Doctor'


class IsAdminOrDoctor(BasePermission):
    """
    Allows access only to Hospital Admin or Doctor roles.
    """
    def has_permission(self, request, view):
        print(f"Checking Admin/Doctor: {request.user.email} role={request.user.role}")
        return request.user.role in ['Hospital Admin', 'Doctor']


class IsNurse(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'Nurse'


class IsReceptionist(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'Receptionist'


class IsLabTechnician(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'Laboratory Technician'


class IsPharmacist(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'Pharmacist'


class IsAccountant(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'Accountant'
    
class IsRadiologist(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'Radiologist'