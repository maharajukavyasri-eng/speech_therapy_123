import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, PlayCircle, TrendingUp } from 'lucide-react';

export default function Practice() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // 🎤 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = sendAudioForAnalysis;

      mediaRecorder.current.start();
      setIsRecording(true);
      setResults(null);

    } catch (err) {
      console.error("Mic error:", err);
      alert("Allow microphone access.");
    }
  };

  // 🛑 Stop Recording
  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsAnalyzing(true);
    }
  };

  // 📡 Send Audio to Backend
  const sendAudioForAnalysis = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });

    const formData = new FormData();
    formData.append("file", audioBlob, "practice.webm");

    try {
      console.log("Uploading audio...");

      const response = await fetch("http://localhost:8000/analyze-audio", {
        method: "POST",
        body: formData,
      });

      console.log("Status:", response.status);

      const data = await response.json();
      console.log("API RESPONSE:", data);   // 🔥 IMPORTANT DEBUG

      setResults(data);

    } catch (error) {
      console.error("Error:", error);
      alert("Backend not working or not running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page-container">

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>Practice Session</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Speak and get instant AI feedback
        </p>
      </div>

      {/* BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        {!isRecording ? (
          <button
            className="btn"
            onClick={startRecording}
            disabled={isAnalyzing}
            style={{ padding: '16px 32px', borderRadius: '50px', fontSize: '1.2rem' }}
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Mic />}
            {isAnalyzing ? "Analyzing..." : "Start Recording"}
          </button>
        ) : (
          <button
            className="btn btn-recording"
            onClick={stopRecording}
            style={{ padding: '16px 32px', borderRadius: '50px', fontSize: '1.2rem' }}
          >
            <Square />
            Stop Recording
          </button>
        )}
      </div>

      {/* RESULTS */}
      {results && (
        <div className="glass-panel">

          {/* 🔥 DEBUG VIEW (REMOVE LATER) */}
          <pre style={{ fontSize: "12px", marginBottom: "20px" }}>
            {JSON.stringify(results, null, 2)}
          </pre>

          {results.analysis ? (
            <>
              <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
                Analysis Results
              </h2>

              {/* TEXT */}
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <p style={{ margin: 0 }}>
                  "{results.cleaned_text || "No text detected"}"
                </p>
              </div>

              {/* SCORES */}
              <div className="grid-layout">

                <div style={{ textAlign: 'center' }}>
                  <div className="score-circle">
                    {results.analysis?.fluency_score ?? "N/A"}
                  </div>
                  <h3>Fluency</h3>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div className="score-circle">
                    {results.analysis?.pronunciation_score ?? "N/A"}
                  </div>
                  <h3>Pronunciation</h3>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div className="score-circle">
                    {results.analysis?.pitch_stability_score ?? "N/A"}
                  </div>
                  <h3>Pitch Stability</h3>
                </div>

              </div>

              {/* PROGRESS */}
              {results.progress_report && (
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--primary)'
                }}>
                  <h3>
                    <TrendingUp /> {results.progress_report.status}
                  </h3>
                  <p>{results.progress_report.improvement_summary}</p>
                  <p><b>Next:</b> {results.progress_report.focus_next}</p>
                </div>
              )}

              {/* FEEDBACK */}
              <h3 style={{ marginTop: '24px' }}>Feedback</h3>
              <ul>
                {results.analysis?.feedback?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {/* EXERCISES */}
              <h3>Exercises</h3>
              <div className="grid-layout">
                {results.recommended_exercises?.map((ex, i) => (
                  <div key={i} className="glass-panel">
                    <h4>
                      <PlayCircle size={18} /> {ex.title}
                    </h4>
                    <p>{ex.description}</p>
                    <p style={{ fontSize: '0.85rem' }}>
                      {ex.instructions}
                    </p>
                  </div>
                ))}
              </div>

            </>
          ) : (
            <p>No structured analysis received from backend.</p>
          )}

        </div>
      )}

    </div>
  );
}