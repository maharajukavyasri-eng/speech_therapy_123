# Speech Therapy Assistance Tool

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Installation Steps](#installation-steps)
- [Usage Instructions](#usage-instructions)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [License](#license)

---

## 🎯 Introduction

The **Speech Therapy Assistance Tool** is an intelligent platform designed to help users improve their speech patterns and pronunciation through personalized, data-driven feedback. Whether you're recovering from speech impediments, improving accent clarity, or enhancing overall communication skills, this tool provides real-time analysis and targeted recommendations.

Leveraging advanced speech processing techniques and deep learning models, our system analyzes vocal characteristics, identifies pronunciation issues, and delivers actionable insights to facilitate continuous improvement in speech quality.

---

## ✨ Features

- **Real-time Speech Analysis**: Process and analyze audio input instantly
- **Pronunciation Assessment**: Identify deviations from target pronunciation patterns
- **Personalized Feedback**: Receive customized recommendations based on individual speech patterns
- **MFCC Feature Extraction**: Advanced audio feature extraction for comprehensive speech characterization
- **Deep Learning Models**: CNN and LSTM-based models for accurate pattern recognition
- **Progress Tracking**: Monitor improvement over time with detailed analytics
- **User-Friendly Interface**: Intuitive web-based dashboard for seamless interaction
- **Multi-language Support**: Support for various languages and dialects
- **Detailed Visualizations**: Visual representations of speech patterns and progress metrics

---

## 🛠️ Technologies Used

### Backend
- **Python**: Core language for machine learning and audio processing
  - TensorFlow/Keras: Deep learning framework for model development
  - Librosa: Audio analysis and feature extraction library
  - NumPy & SciPy: Numerical computing and signal processing
  - Flask: Web framework for API development

### Frontend
- **JavaScript**: Interactive user interface
  - React/Vue.js: Frontend framework
  - Chart.js/Plotly: Data visualization
  - Web Audio API: Client-side audio capture

### Audio Processing
- **MFCC (Mel-Frequency Cepstral Coefficients)**: Feature extraction technique
- **Spectral Analysis**: Frequency domain analysis of speech signals

### Machine Learning Models
- **CNN (Convolutional Neural Networks)**: Spatial pattern recognition in spectrograms
- **LSTM (Long Short-Term Memory)**: Temporal sequence analysis for speech patterns
- **Data Augmentation**: Techniques to improve model robustness

### Database & Storage
- **SQLite/PostgreSQL**: User data and progress tracking
- **Cloud Storage**: Audio file management

### Styling
- **CSS**: Responsive design and custom styling
- **HTML5**: Semantic markup and accessibility

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
│              (JavaScript, HTML, CSS Frontend)                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      API Layer                              │
│              (Flask REST API - Python)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                Audio Processing Layer                        │
│        (Librosa, Feature Extraction, MFCC)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Machine Learning Layer                          │
│         (CNN & LSTM Models - TensorFlow/Keras)              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Data Layer                                  │
│      (Database, User Profiles, Progress Tracking)           │
└─────────────────────────────────────────────────────────────┘
```

### Key Components:

1. **Frontend Module**: Handles user interactions, audio capture, and result visualization
2. **API Gateway**: Routes requests between frontend and backend services
3. **Audio Processing Engine**: Extracts features and prepares data for ML models
4. **ML Pipeline**: Trained CNN and LSTM models for speech analysis
5. **Database**: Stores user information, audio samples, and progress metrics

---

## 📦 Installation Steps

### Prerequisites
- Python 3.8 or higher
- Node.js 14.0 or higher
- pip (Python package manager)
- npm (Node package manager)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/maharajukavyasri-eng/speech_therapy_123.git
   cd speech_therapy_123
   ```

2. **Create a Python virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize the database**
   ```bash
   python setup_db.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the frontend**
   ```bash
   npm run build
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   python app.py
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   # Frontend runs on http://localhost:3000
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

---

## 🚀 Usage Instructions

### Getting Started

1. **Create an Account**
   - Visit the application homepage
   - Click "Sign Up" and provide your details
   - Verify your email address

2. **Record Your Speech**
   - Navigate to the "Record" section
   - Select your target language/dialect
   - Click "Start Recording" and read the provided text
   - Click "Stop Recording" when finished

3. **View Analysis Results**
   - After processing, review detailed feedback including:
     - Pronunciation accuracy scores
     - Identified mispronunciations
     - Confidence levels for each phoneme
     - Comparison with reference samples

4. **Track Progress**
   - Visit the "Dashboard" to monitor improvement over time
   - View historical analysis and trends
   - Set personal goals and milestones

### Advanced Features

- **Custom Exercises**: Create personalized practice sessions
- **Compare Recordings**: Analyze multiple recordings side-by-side
- **Export Reports**: Download detailed analysis reports
- **Therapist Integration**: Share progress with your speech therapist

---

## 📁 Project Structure

```
speech_therapy_123/
│
├── backend/
│   ├── app.py                      # Main Flask application
│   ├── requirements.txt            # Python dependencies
│   ├── config.py                   # Configuration settings
│   │
│   ├── models/
│   │   ├── cnn_model.py           # CNN architecture
│   │   ├── lstm_model.py          # LSTM architecture
│   │   └── model_loader.py        # Model loading utilities
│   │
│   ├── audio_processing/
│   │   ├── feature_extraction.py  # MFCC and spectral features
│   │   ├── preprocessing.py       # Audio normalization
│   │   └── utils.py               # Audio utility functions
│   │
│   ├── api/
│   │   ├── routes.py              # API endpoints
│   │   ├── auth.py                # Authentication
│   │   └── handlers.py            # Request handlers
│   │
│   ├── database/
│   │   ├── models.py              # Database schemas
│   │   ├── db.py                  # Database connection
│   │   └── queries.py             # Database queries
│   │
│   └── utils/
│       ├── logger.py              # Logging configuration
│       └── validators.py          # Input validation
│
├── frontend/
│   ├── public/
│   │   └── index.html             # HTML entry point
│   │
│   ├── src/
│   │   ├── App.js                 # Main React component
│   │   ├── index.js               # React DOM rendering
│   │   │
│   │   ├── components/
│   │   │   ├── Recorder.js        # Audio recording component
│   │   │   ├── Dashboard.js       # Analytics dashboard
│   │   │   ├── Results.js         # Analysis results display
│   │   │   └── Progress.js        # Progress tracking
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js            # Landing page
│   │   │   ├── Login.js           # Login page
│   │   │   └── Account.js         # User account
│   │   │
│   │   ├── services/
│   │   │   ├── api.js             # API client
│   │   │   └── audioService.js    # Audio handling
│   │   │
│   │   └── styles/
│   │       ├── App.css            # Main styles
│   │       ├── components.css     # Component styles
│   │       └── responsive.css     # Responsive design
│   │
│   ├── package.json               # NPM dependencies
│   └── .env.example               # Environment variables template
│
├── data/
│   ├── models/
│   │   ├── cnn_model.h5          # Trained CNN model
│   │   └── lstm_model.h5         # Trained LSTM model
│   │
│   └── training/
│       ├── dataset_info.txt      # Dataset documentation
│       └── model_metrics.json    # Model performance metrics
│
├── tests/
│   ├── test_audio_processing.py
│   ├── test_models.py
│   └── test_api.py
│
├── docs/
│   ├── API_DOCUMENTATION.md      # API endpoint documentation
│   ├── SETUP_GUIDE.md            # Detailed setup instructions
│   └── MODEL_ARCHITECTURE.md     # ML model details
│
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── LICENSE                        # License file
└── README.md                      # Project readme (this file)
```

---

## 🔮 Future Enhancements

- **Real-time Feedback**: Live speech analysis with instantaneous corrections
- **Mobile App**: Native iOS and Android applications
- **AI Coaching**: Conversational AI tutors for interactive learning
- **Multiple Languages**: Support for additional languages and accents
- **Gamification**: Reward system and achievement badges
- **Community Features**: User community for peer learning
- **Advanced Analytics**: Predictive analysis for improvement rates
- **Integration with Hearing Aids**: Compatibility with hearing aid devices
- **Telehealth Integration**: Direct connection with licensed speech therapists
- **Continuous Model Improvement**: Regular updates with improved ML models

---

## 👥 Contributors

This project is developed and maintained by:

- **Kavya Sri Maharaju** - Project Lead & Developer

### Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed contribution guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Usage Rights

You are free to:
- Use this software for personal, educational, or commercial purposes
- Modify and distribute the software
- Include it in your own projects

### Conditions

- Include a copy of the license and copyright notice

---

## 📞 Support & Contact

If you have questions or need assistance:

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/maharajukavyasri-eng/speech_therapy_123/issues)
- **Email**: [Your contact email]
- **Documentation**: Visit [docs/](docs/) for detailed guides

---

## 🙏 Acknowledgments

- Thanks to the open-source community for TensorFlow, Librosa, and other libraries
- Inspiration from modern speech therapy practices
- Special thanks to all contributors and testers

---

**Last Updated**: June 2026

**Status**: Active Development 🚀
