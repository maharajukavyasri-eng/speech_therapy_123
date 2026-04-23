def compare_scores(past_scores: dict, current_scores: dict) -> dict:
    """
    Compares past and current speech scores to generate an improvement summary
    and suggest what to focus on next.
    
    Args:
        past_scores: dict with keys 'fluency', 'pronunciation', 'pitch'
        current_scores: dict with keys 'fluency', 'pronunciation', 'pitch'
    """
    if not past_scores:
        return {
            "status": "First Session",
            "improvement_summary": "This is your baseline session. Great job getting started!",
            "focus_next": "Keep practicing to establish a trend!"
        }

    diffs = {
        "fluency": current_scores["fluency"] - past_scores.get("fluency", current_scores["fluency"]),
        "pronunciation": current_scores["pronunciation"] - past_scores.get("pronunciation", current_scores["pronunciation"]),
        "pitch": current_scores["pitch"] - past_scores.get("pitch", current_scores["pitch"])
    }

    # Determine Status
    total_diff = sum(diffs.values())
    if total_diff >= 10:
        status = "Excellent Progress"
    elif total_diff > 0:
        status = "Steady Improvement"
    elif total_diff == 0:
        status = "Maintaining Level"
    else:
        status = "Slight Dip"

    # Generate Improvement Summary
    improvements = []
    for metric, diff in diffs.items():
        if diff > 0:
            improvements.append(f"{metric.capitalize()} improved by {diff} points")
        elif diff < 0:
            improvements.append(f"{metric.capitalize()} dropped by {abs(diff)} points")
            
    if not improvements:
        summary = "Your scores remained perfectly stable compared to your last session."
    else:
        summary = " compared to last time: " + ", ".join(improvements) + "."

    if status in ["Excellent Progress", "Steady Improvement"]:
        summary = "Great work!" + summary
    elif status == "Slight Dip":
        summary = "Don't worry about the slight dip." + summary

    # Determine Focus Next
    # Find the metric with the lowest current score
    lowest_metric = min(current_scores, key=current_scores.get)
    
    focus_mapping = {
        "fluency": "Try slowing down and taking deliberate pauses to reduce filler words.",
        "pronunciation": "Focus on clearly enunciating each syllable, especially on longer words.",
        "pitch": "Try adding more emotion and variation to your voice to improve pitch stability."
    }
    
    focus_next = f"Your lowest score is in {lowest_metric}. {focus_mapping.get(lowest_metric, '')}"

    return {
        "status": status,
        "improvement_summary": summary,
        "focus_next": focus_next,
        "score_differences": diffs
    }
