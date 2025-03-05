from django.db import models
# Create your models here.

class CustomUser(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    cnic = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.TextField()
    
    
    is_active = True
    is_authenticated = True
    is_anonymous = False
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.name
    


class Complaint(models.Model):
    complaint_id = models.AutoField(primary_key=True)
    complaint_type = models.CharField(max_length=255)
    complaint_category = models.CharField(max_length=255)
    complaint_details = models.TextField()
    ref_number = models.CharField(max_length=255)
    submission_date = models.DateTimeField(auto_now_add=True)
    upload_image = models.BinaryField(null=True, blank=True)  # Store image as binary data
    user_id = models.ForeignKey('CustomUser', on_delete=models.CASCADE,null=True, blank=True)
    assigned_team_id = models.ForeignKey('Team',on_delete=models.CASCADE,null=True, blank=True)
    department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True, blank=True)  # Link to Department
    status = models.CharField(max_length=20, default='PENDING')
    resolved_status = models.CharField(
        max_length=20, blank=True, null=True
    )
    latitude = models.FloatField(null=True, blank=True)  # For Latitude
    longitude = models.FloatField(null=True, blank=True)  # For Longitude

    
    def save(self, *args, **kwargs):
        # Ensure resolved_status is only set when status is 'resolved'
        if self.status != 'RESOLVED':
            self.resolved_status = None
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.complaint_type


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=255)
    contact = models.CharField(max_length=25)

    def __str__(self):
        return self.department_name
    
class Teamuser(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.CASCADE,null=True, blank=True)
    phone = models.CharField(max_length=15, unique=True,null=True, blank=True)
    email = models.EmailField(unique=True,null=True, blank=True)
    password = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.id} - {self.name}"
    
    
class Team(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    department=models.ForeignKey(Department,on_delete=models.CASCADE,null=True, blank=True)
    team_members = models.ManyToManyField(Teamuser,null=True, blank=True)
    def __str__(self):
        return f"{self.id} - {self.name}"



class ProofOfResolution(models.Model):
    proof_id = models.AutoField(primary_key=True)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE,null=True, blank=True)
    proof_image = models.BinaryField(null=True, blank=True)
    proof_description = models.TextField()
    date_uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Proof #{self.proof_id}"


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True, blank=True)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE,null=True, blank=True)
    date_sent = models.DateTimeField(auto_now_add=True)
    notification_message = models.TextField()

    def __str__(self):
        return f"Notification #{self.notification_id}"


class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE,null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f'Feedback #{self.feedback_id}'

class Admin(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.username

class SubAdmin(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.username
