def get_recommended_exercises(analysis: dict) -> list[dict]:
    """
    Recommends beginner-friendly, at-home exercises based on detected speech issues.
    """
    recommendations = []
    
    # Check for Stuttering
    if len(analysis.get("stuttering_instances", [])) > 0:
        recommendations.append({
            "title": "Easy Onsets Practice",
            "description": "Start words with a gentle outward breath. Try whispering the first sound, then gradually adding your voice.",
            "instructions": "1. Take a slow breath in.\n2. Start letting air out gently.\n3. Slowly turn on your voice as you say: 'Aaaapple', 'Eeee-ven'.",
            "focus": "Smooth speech initiation"
        })
        recommendations.append({
            "title": "Light Contacts",
            "description": "Make sounds by touching your lips or tongue together very gently.",
            "instructions": "Practice saying words starting with P, B, T, D. Barely let your lips/tongue touch: 'Pat', 'Bat', 'Tap'.",
            "focus": "Reducing tension during speech"
        })

    # Check for Long Pauses or Fillers
    filler_feedback = any("filler words" in f for f in analysis.get("feedback", []))
    if analysis.get("long_pauses", 0) > 0 or filler_feedback:
        recommendations.append({
            "title": "The 'Pause and Think' Challenge",
            "description": "Train yourself to embrace silence instead of using filler words or stopping abruptly.",
            "instructions": "1. Read a short paragraph out loud.\n2. Whenever you see a comma or period, stop completely for 2 seconds.\n3. Do not make any sound during the pause.",
            "focus": "Pacing and eliminating fillers"
        })

    # Check for Mispronunciation
    if len(analysis.get("potential_mispronunciations", [])) > 0:
        recommendations.append({
            "title": "Syllable Tapping",
            "description": "Slow down tricky words by physically tapping out each syllable.",
            "instructions": "1. Pick a long word (e.g., 'Wa-ter-me-lon').\n2. Tap your finger on the table for each syllable as you say it out loud.\n3. Exaggerate your mouth movements on each tap.",
            "focus": "Clarity and articulation"
        })
        
    # If their score is high, give a general maintenance exercise
    if not recommendations:
        recommendations.append({
            "title": "Daily Reading Aloud",
            "description": "Maintain your excellent fluency by reading your favorite book or article aloud.",
            "instructions": "Read aloud for 5 minutes a day in front of a mirror. Focus on maintaining a confident, steady pace.",
            "focus": "General fluency maintenance"
        })

    return recommendations
