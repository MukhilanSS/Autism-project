import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/main.css';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || 'No result available';
  const isAutismDetected = result.includes('Detected');

  return (
    <div className="result-container">
      <div className="result-header">
        <h1>Screening Results</h1>
        <p>Based on your responses, here's the assessment</p>
      </div>

      <div className={`result-card ${isAutismDetected ? 'detected' : 'not-detected'}`}>
        <div className="result-icon">
          {isAutismDetected ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          )}
        </div>
        <h2>{result}</h2>
        <p className="result-message">
          {isAutismDetected
            ? 'This screening suggests characteristics consistent with autism spectrum disorder. Please consult with a healthcare professional for a comprehensive evaluation.'
            : 'This screening does not suggest characteristics of autism spectrum disorder. However, if you have concerns, please consult with a healthcare professional.'}
        </p>
      </div>

      <div className="result-actions">
        <button 
          onClick={() => navigate('/')}
          className="action-btn primary"
        >
          Take Another Test
        </button>
        <button 
          onClick={() => navigate('/resources')}
          className="action-btn secondary"
        >
          View Resources
        </button>
      </div>

      <div className="result-disclaimer">
        <h3>Important Note</h3>
        <p>
          This screening tool is not a diagnostic instrument. It is designed to identify potential symptoms 
          that might warrant further evaluation by a qualified healthcare professional. 
          A positive screening result does not equate to a diagnosis of autism spectrum disorder.
        </p>
      </div>
    </div>
  );
}