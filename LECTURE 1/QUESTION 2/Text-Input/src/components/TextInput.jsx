import React, { useState } from 'react';
import './TextInput.css';

const TextInput = () => {
  const [text, setText] = useState('');
  
  const MAX_CHARS = 200;
  // Trigger warning at 85% of the limit (170 characters)
  const WARNING_THRESHOLD = Math.floor(MAX_CHARS * 0.85); 
  
  const charCount = text.length;
  const charsRemaining = MAX_CHARS - charCount;
  
  // Determine states for UI feedback
  const isWarning = charCount >= WARNING_THRESHOLD;
  const isError = charCount >= MAX_CHARS;
  const isSubmitDisabled = charCount === 0 || charCount > MAX_CHARS;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Handle pasting large text: trim it to the max limit automatically
    if (inputValue.length <= MAX_CHARS) {
      setText(inputValue);
    } else {
      setText(inputValue.slice(0, MAX_CHARS));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      console.log("Submitting:", text);
      alert("Content submitted successfully!");
      setText(''); // Clear input after successful submit
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <textarea
          className={`text-area ${isError ? 'error-border' : isWarning ? 'warning-border' : ''}`}
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
          rows="5"
        />
        
        <div className="action-row">
          <span 
            className={`char-counter ${isError ? 'error-text' : isWarning ? 'warning-text' : 'normal-text'}`}
          >
            {charsRemaining} characters remaining
          </span>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitDisabled}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextInput;