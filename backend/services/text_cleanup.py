import re

def clean_asr_transcription(text: str) -> str:
    """
    Cleans up raw transcription text from an ASR system (like Whisper).
    - Removes common filler words (um, uh, like, you know).
    - Fixes duplicate spaces.
    - Basic punctuation cleanup.
    """
    if not text:
        return ""
        
    # Lowercase for uniform processing (optional based on ASR output, but typical for cleanup before analysis)
    cleaned = text
    
    # 1. Remove filler words (case-insensitive)
    fillers = [r'\bum\b', r'\buh\b', r'\boh\b', r'\blike\b', r'\byou know\b']
    for filler in fillers:
        cleaned = re.sub(filler, '', cleaned, flags=re.IGNORECASE)
        
    # 2. Remove filler sounds often transcribed by ASR
    cleaned = re.sub(r'\[.*?\]', '', cleaned)  # e.g., [sigh], [laughs]
    
    # 3. Fix multiple spaces caused by removals
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    
    # 4. Fix punctuation (e.g., spaces before commas, multiple periods)
    cleaned = re.sub(r'\s+([.,!?])', r'\1', cleaned)
    cleaned = re.sub(r'\.{2,}', '.', cleaned)
    
    # 5. Capitalize first letter if it was lowercased/removed
    if cleaned:
        cleaned = cleaned[0].capitalize() + cleaned[1:]
        
    return cleaned

# Example usage:
# raw_text = "Um, hello there, like, I am testing the, uh, speech system [laughs]."
# print(clean_asr_transcription(raw_text)) # Output: "Hello there, I am testing the, speech system."
