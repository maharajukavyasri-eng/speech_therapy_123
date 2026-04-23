import re
from typing import Dict, Any, List

def analyze_speech_text(raw_text: str, cleaned_text: str) -> Dict[str, Any]:
    """
    Analyzes the transcribed speech for communication issues.
    
    Args:
        raw_text: The original transcription (before cleanup), used to detect fillers and pauses.
        cleaned_text: The cleaned transcription.
        
    Returns:
        Dictionary containing analysis metrics and detected issues.
    """
    analysis = {
        "stuttering_instances": [],
        "long_pauses": 0,
        "potential_mispronunciations": [],
        "grammatical_mistakes": [],
        "fluency_score": 100,
        "pronunciation_score": 100,
        "grammar_score": 100,
        "pitch_stability_score": 85,  # Mocked value since true pitch requires audio
        "feedback": []
    }
    
    if not raw_text:
        return analysis

    # 1. Detect Stuttering (Repeated words or sounds)
    # Looking for word repetition e.g. "I I I" or "the the"
    words = re.findall(r'\b\w+\b', raw_text.lower())
    for i in range(len(words) - 1):
        if words[i] == words[i+1]:
            analysis["stuttering_instances"].append(words[i])
            
    # Also look for hyphenated stutters e.g. "w-w-what"
    hyphen_stutters = re.findall(r'\b(\w)-\1+\w*\b', raw_text.lower())
    analysis["stuttering_instances"].extend(hyphen_stutters)
    
    if analysis["stuttering_instances"]:
        words = ', '.join(set(analysis['stuttering_instances']))
        analysis["feedback"].append(
            f"I noticed a little repetition on these words: '{words}'. "
            "Tip: Take a slow, deep breath before you start a sentence, and try to ease into the first word."
        )
        analysis["fluency_score"] -= len(analysis["stuttering_instances"]) * 5

    # 2. Detect Long Pauses (often transcribed as ellipses by ASR)
    pauses = re.findall(r'\.\.\.', raw_text)
    analysis["long_pauses"] = len(pauses)
    if analysis["long_pauses"] > 0:
        analysis["feedback"].append(
            f"I heard some long pauses. "
            "Tip: It's okay to pause! Try to use pauses intentionally to organize your thoughts, rather than stopping in the middle of an idea."
        )
        analysis["fluency_score"] -= analysis["long_pauses"] * 5

    # 3. Mispronunciation (Approximate text-based detection)
    # Without audio, we look for unusually long stretches of identical characters (e.g. "soooo")
    # or rely on the ASR returning broken word fragments.
    weird_words = re.findall(r'\b\w*([a-z])\1{2,}\w*\b', raw_text.lower())
    if weird_words:
        analysis["potential_mispronunciations"].extend(weird_words)
        analysis["feedback"].append(
            "Some sounds seemed a bit stretched out or unclear. "
            "Tip: Let's practice exaggerating our mouth movements on those tricky words to make them super clear!"
        )
        analysis["fluency_score"] -= len(weird_words) * 3
        analysis["pronunciation_score"] -= len(weird_words) * 10

    # Note: True mispronunciation detection requires phonetic level audio analysis (e.g., using Wav2Vec).
    # We are using text heuristics as a proxy.

    # 4. Lack of Fluency (Filler words impact)
    # Count filler words by comparing raw and cleaned text length (roughly)
    filler_words = ['um', 'uh', 'oh', 'like']
    filler_count = sum(len(re.findall(fr'\b{fw}\b', raw_text.lower())) for fw in filler_words)
    
    if filler_count > 0:
        analysis["feedback"].append(
            f"I counted {filler_count} filler words like 'um' or 'uh'. "
            "Tip: Next time you feel an 'um' coming, try just closing your mouth and taking a silent pause instead. You're doing great!"
        )
        analysis["fluency_score"] -= filler_count * 2

    # 5. Basic Grammar Detection (Heuristic)
    grammar_errors = [
        (r'\bI is\b', "I am"),
        (r'\bhe don\'t\b', "he doesn't"),
        (r'\bshe don\'t\b', "she doesn't"),
        (r'\bwe was\b', "we were"),
        (r'\bthey is\b', "they are"),
        (r'\bmore better\b', "better")
    ]
    
    for pattern, correction in grammar_errors:
        matches = re.findall(pattern, cleaned_text.lower())
        if matches:
            analysis["grammatical_mistakes"].extend(matches)
            analysis["feedback"].append(
                f"I noticed a tiny grammar slip-up: '{matches[0]}'. "
                f"Tip: Try saying '{correction}' instead next time!"
            )
            analysis["grammar_score"] -= len(matches) * 5

    # Clamp scores between 0 and 100
    analysis["fluency_score"] = max(0, min(100, analysis["fluency_score"]))
    analysis["pronunciation_score"] = max(0, min(100, analysis["pronunciation_score"]))
    analysis["grammar_score"] = max(0, min(100, analysis["grammar_score"]))
    
    # Simulate pitch stability variance based on fluency (mocked for now)
    import random
    analysis["pitch_stability_score"] = max(60, min(100, analysis["fluency_score"] + random.randint(-10, 10)))

    if analysis["fluency_score"] > 85:
        analysis["fluency_level"] = "Excellent work! Your speech was very smooth and clear."
    elif analysis["fluency_score"] > 60:
        analysis["fluency_level"] = "Good job! With a little more practice, it will be perfect."
    else:
        analysis["fluency_level"] = "Keep practicing! Every time you try, you get a little bit better."

    return analysis

# Example usage:
# raw = "I I I want to go to the store, um... but it's sooo far."
# cleaned = "I want to go to the store, but it's so far."
# print(analyze_speech_text(raw, cleaned))
