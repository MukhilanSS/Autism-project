import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

export default function Home() {
  const [formData, setFormData] = useState({
    user_type: 'adult',
    age: '',
    gender: '',
    jaundice: '',
    family_asd: '',
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });
  const [activeSection, setActiveSection] = useState('basic');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      navigate('/result', { state: { result: result.result } });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const questions = [
    "Does your child look at you when you call his/her name?",
    "How easy is it for you to get eye contact with your child?",
    "Does your child point to indicate that she/he wants something?",
    "Does your child point to share interest with you?",
    "Does your child pretend?",
    "Does your child follow where you're looking?",
    "Does your child use simple gestures?",
    "Does your child stare at nothing with no apparent purpose?",
    "If you or someone else in family is visibly upset, does your child show signs of warning to comfort them?",
    "Would you describe your child's first words as?"
  ];

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Autism Spectrum Screening</h1>
        <p>Please answer all questions honestly for accurate results</p>
      </div>

      <div className="progress-steps">
        <div 
          className={`step ${activeSection === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveSection('basic')}
        >
          1. Basic Info
        </div>
        <div 
          className={`step ${activeSection === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveSection('questions')}
        >
          2. Screening Questions
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {activeSection === 'basic' && (
          <div className="form-section">
            <div className="input-group">
              <label>Who is this assessment for?</label>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="user_type" 
                    value="child" 
                    checked={formData.user_type === 'child'}
                    onChange={handleChange}
                  />
                  <span>Child</span>
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="user_type" 
                    value="adult" 
                    checked={formData.user_type === 'adult'}
                    onChange={handleChange}
                  />
                  <span>Adult</span>
                </label>
              </div>
            </div>

            <div className="input-group">
              <label>Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                required 
                min="1"
                max="100"
                placeholder="Enter age"
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Gender</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
                <option value="2">Other/Prefer not to say</option>
              </select>
            </div>

            <div className="input-group">
              <label>Born with Jaundice?</label>
              <select 
                name="jaundice" 
                value={formData.jaundice} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="input-group">
              <label>Family History of Autism?</label>
              <select 
                name="family_asd" 
                value={formData.family_asd} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <button 
              type="button" 
              className="next-btn"
              onClick={() => setActiveSection('questions')}
            >
              Continue to Questions
            </button>
          </div>
        )}

        {activeSection === 'questions' && (
          <div className="form-section">
            <h3>Behavioral Questions</h3>
            <p>Please answer based on typical behavior (0 = No, 1 = Yes)</p>
            
            <div className="questions-grid">
              {questions.map((question, index) => (
                <div className="question-card" key={`q${index+1}`}>
                  <p>{question}</p>
                  <div className="answer-options">
                    <label>
                      <input 
                        type="radio" 
                        name={`q${index+1}`} 
                        value="0" 
                        checked={formData[`q${index+1}`] === "0"}
                        onChange={handleChange}
                        required
                      />
                      <span>No</span>
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name={`q${index+1}`} 
                        value="1" 
                        checked={formData[`q${index+1}`] === "1"}
                        onChange={handleChange}
                      />
                      <span>Yes</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="back-btn"
                onClick={() => setActiveSection('basic')}
              >
                Back
              </button>
              <button type="submit" className="submit-btn">
                Get Assessment
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}