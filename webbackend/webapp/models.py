from django.db import models 

class Post(models.Model): 
    title = models.CharField(max_length=200) 
    content = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self): 
        return self.title 


class MotionEvent(models.Model):
    device_id = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device_id} - {self.status} at {self.timestamp}"
