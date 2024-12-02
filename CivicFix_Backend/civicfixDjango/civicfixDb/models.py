from django.db import models
# Create your models here.

class CustomUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    cnic = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.TextField()
    role = models.CharField(max_length=50)
    
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
    status = models.CharField(max_length=50)
    upload_image = models.BinaryField(null=True, blank=True)  # Store image as binary data
    user_id = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    assigned_team_id = models.IntegerField(null=True, blank=True)
    department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True, blank=True)  # Link to Department

    def __str__(self):
        return self.complaint_type


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=255)
    contact = models.CharField(max_length=25)

    def __str__(self):
        return self.department_name


class Team(models.Model):
    team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=255)
    availability_status = models.BooleanField(default=True)

    def __str__(self):
        return self.team_name


class ComplaintStatus(models.Model):
    complaint_status_id = models.AutoField(primary_key=True)
    complaint = models.OneToOneField(Complaint, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    proof_id = models.IntegerField()

    def __str__(self):
        return self.complaint


class ProofOfResolution(models.Model):
    proof_id = models.AutoField(primary_key=True)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    proof_image = models.ImageField(upload_to='proof_images/')
    proof_description = models.TextField()
    date_uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Proof #{self.proof_id}"


class SubAdministrator(models.Model):
    admin_id = models.AutoField(primary_key=True)
    admin_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    assigned_complaints = models.ManyToManyField(Complaint)

    def __str__(self):
        return self.admin_name


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    date_sent = models.DateTimeField(auto_now_add=True)
    notification_message = models.TextField()

    def __str__(self):
        return f"Notification #{self.notification_id}"


class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f'Feedback #{self.feedback_id}'
