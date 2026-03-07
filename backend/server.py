from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    message: str

class ContactFormResponse(BaseModel):
    status: str
    message: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def send_contact_email(name: str, email: str, phone: str, service: str, message: str):
    """Send contact form submission via SendGrid"""
    sender_email = os.getenv('SENDER_EMAIL')
    recipient_email = os.getenv('RECIPIENT_EMAIL')
    api_key = os.getenv('SENDGRID_API_KEY')
    
    if not api_key or api_key == 'your_sendgrid_api_key_here':
        logging.warning("SendGrid API key not configured, skipping email send")
        return False
    
    subject = f"New Contact Form Submission from {name}"
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #0A0F2C; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">New Contact Form Submission</h2>
                
                <div style="margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong style="color: #3B82F6;">Name:</strong> {name}</p>
                    <p style="margin: 10px 0;"><strong style="color: #3B82F6;">Email:</strong> <a href="mailto:{email}">{email}</a></p>
                    <p style="margin: 10px 0;"><strong style="color: #3B82F6;">Phone:</strong> {phone}</p>
                    <p style="margin: 10px 0;"><strong style="color: #3B82F6;">Service Interested:</strong> {service}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #0A0F2C; margin-top: 0;">Project Brief:</h3>
                    <p style="color: #4a5568; line-height: 1.6;">{message}</p>
                </div>
                
                <p style="color: #94A3B8; font-size: 12px; margin-top: 30px; text-align: center;">
                    This email was sent from the Softogram contact form.
                </p>
            </div>
        </body>
    </html>
    """
    
    mail = Mail(
        from_email=sender_email,
        to_emails=recipient_email,
        subject=subject,
        html_content=html_content
    )
    
    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(mail)
        return response.status_code == 202
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return False


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(request: ContactFormRequest, background_tasks: BackgroundTasks):
    """Submit contact form and send email notification"""
    try:
        # Create submission record
        submission = ContactSubmission(
            name=request.name,
            email=request.email,
            phone=request.phone,
            service=request.service,
            message=request.message
        )
        
        # Store in database
        doc = submission.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.contact_submissions.insert_one(doc)
        
        # Send email in background
        background_tasks.add_task(
            send_contact_email,
            request.name,
            request.email,
            request.phone,
            request.service,
            request.message
        )
        
        return ContactFormResponse(
            status="success",
            message="Thank you! We'll get back to you within 24 hours."
        )
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact form submissions"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub['timestamp'], str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    
    return submissions


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
