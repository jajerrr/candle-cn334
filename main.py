import json
import os
import shutil
import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient

from dashboard_service import router as dashboard_router
from orders_service import router as orders_router
from products_service import router as products_router
from shipping_service import router as shipping_router
from users_service import router as users_router

# เรียกใช้ FastAPI
app = FastAPI()

uri = "mongodb://localhost:27017/"
IMAGED = "/Users/jajan./Desktop/image"

if not os.path.exists(IMAGED):
    os.makedirs(IMAGED)

app.mount("/images", StaticFiles(directory=IMAGED), name="images")
client = MongoClient(uri, connect=False)
db = client['CoffeeApp']

class Images(BaseModel):
    filename: str
    url: str 

# เพิ่ม Middleware เพื่ออนุญาตให้เข้าถึง API จากต่างๆ โดยที่ไม่ต้องรับสิทธิ์เพิ่มเติม
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ระบุโดเมนที่อนุญาตให้เข้าถึงได้
    allow_credentials=True,
    allow_methods=["*"],  # ระบุเมทอดที่อนุญาต
    allow_headers=["*"],  # ระบุเฮดเดอร์ที่อนุญาต
)

# เชื่อมต่อ MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

# เรียกใช้งาน Microservices APIs
app.include_router(products_router, prefix="/api/products", tags=["Products"])

app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(orders_router, prefix="/api/orders", tags=["Orders"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(shipping_router, prefix="/api/shipping", tags=["Shipping"])

import requests
import os
import json

def get_speech_description(message, product_id):
    try:
        def fetch_speech_description(message):
            url_path = "https://api.aiforthai.in.th/vaja9/synth_audiovisual"
            api_key = "ruBZK9SmwaZ2J6SgSiWEoNO0KlufhPSi"
            headers = {
                "Apikey": api_key,
                "Content-Type": "application/json",
            }
            body_data = {
                "input_text": message,
                "speaker": 1,
                "phrase_break": 0,
                "audiovisual": 0,
            }
            response = requests.post(url_path, json=body_data, headers=headers)
            return response.json()["wav_url"]
        
        wav_url = fetch_speech_description(message)
        
        def fetch_sound(wav_url, product_id):
            api_key = "ruBZK9SmwaZ2J6SgSiWEoNO0KlufhPSi"
            headers = {
                "Apikey": api_key,
            }
            response = requests.get(wav_url, headers=headers)
            if response.status_code == 200:
                location = "/sound"
                sound_location = os.path.join(os.getcwd(), location)
                with open(f"{sound_location}/{product_id}.wav", "wb") as f:
                    f.write(response.content)
        
        fetch_sound(wav_url, product_id)
    except Exception as e:
        print(e)

def create_sound(request):
    try:
        req_data = request.get_json()
        description = req_data["description"]
        product_id = req_data["id"]
        get_speech_description(description, product_id)
        return {"status": 200}
    except Exception as e:
        print(e)
        return {"error": str(e)}

@app.post("/upload_image/")
async def upload_image(file: UploadFile = File(...)):
    # Generate a unique filename to avoid conflicts
    file_extension = file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(IMAGED, unique_filename)

    # Save the file to the specified directory
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Store image data in MongoDB (assuming db setup is already done)
    image_data = {
        "filename": unique_filename,
        "url": f"/images/{unique_filename}"
    }
    db.Images.insert_one(image_data)

    # Return the filename and URL where the image can be accessed
    return {"filename": unique_filename, "url": f"/images/{unique_filename}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
