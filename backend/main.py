from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import whisper
import tempfile
import random

from services.text_cleanup import clean_asr_transcription
from services.speech_analysis import analyze_speech_text
from services.exercise_recommendation import get_recommended_exercises
from services.progress_tracking import compare_scores

# Initialize app
app = FastAPI(title="Speech Therapy Assistant API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model ONCE
model = whisper.load_model("base")

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to AI-Powered Speech Therapy Assistant API"}

# Response schema
class AnalysisResponse(BaseModel):
    raw_text: str
    cleaned_text: str
    analysis: dict
    recommended_exercises: list[dict]
    progress_report: dict

# API endpoint
@app.post("/analyze-audio", response_model=AnalysisResponse)
async def analyze_audio(file: UploadFile = File(...)):

    # Save audio temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        temp_audio.write(await file.read())
        temp_audio_path = temp_audio.name

    # Transcribe
    result = model.transcribe(temp_audio_path)
    raw_transcription = result["text"]

    print("RAW:", raw_transcription)  # debug

    # Process
    cleaned_text = clean_asr_transcription(raw_transcription)
    analysis_results = analyze_speech_text(raw_transcription, cleaned_text)
    exercises = get_recommended_exercises(analysis_results)

    # Mock past scores
    past_scores = {
        "fluency": random.randint(60, 90),
        "pronunciation": random.randint(60, 90),
        "pitch": random.randint(60, 90)
    }

    current_scores = {
        "fluency": analysis_results["fluency_score"],
        "pronunciation": analysis_results["pronunciation_score"],
        "pitch": analysis_results["pitch_stability_score"]
    }

    progress = compare_scores(past_scores, current_scores)

    return AnalysisResponse(
        raw_text=raw_transcription,
        cleaned_text=cleaned_text,
        analysis=analysis_results,
        recommended_exercises=exercises,
        progress_report=progress
    )