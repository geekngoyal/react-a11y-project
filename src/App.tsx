import { useState } from 'react';
import { calculate } from './stringCalculator';
import './App.css';

//Issues identified
// Change div to button for Calculate
// Add alt text to image
// Fix color contrast (#aaa → #767676 or darker)

// Fix heading hierarchy (h1 → h2)
// Add keyboard support to interactive elements

// Fix alert role usage
// Add focus indicators
// Don't rely on color alone for result

// Add skip navigation
// Set textarea dimensions
// Verify page title
// check for 

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | string | null>(null); 
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleCalculate = () => {
    const calculationResult = calculate(input);
    
    if (typeof calculationResult === 'string' && calculationResult.includes('Error')) {
      setIsError(true);
      setResult(null);
      setErrorText(calculationResult);
    } else {
      setIsError(false);
      setResult(calculationResult);
    }
  };
  

  return (
    <div data-testid="app-container" className="app-container">
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={600}
        height={400}
        alt='Calculator interface with number input field'
        className="calculator-image"
      />

      <h1>String Calculator</h1>

      <label htmlFor="numbers-input" className="input-label">
        Enter numbers
      </label>

      <textarea
        id="numbers-input"
        className="numbers-input"
        placeholder='Enter numbers'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
        aria-describedby="input-instructions"
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleCalculate();
          }
        }}
      />
      <p id="input-instructions" className="input-instructions">
        Only numbers and special characters (+, -, /, *, %) are accepted
      </p>
      <button
        onClick={handleCalculate}
        type="button"
        className="calculate-button"
      >Calculate</button>

      {result !== null && <p className="result-success">Result: {result}</p>}

      {isError && <div role='alert' className="error-alert">
        <p className="result-error">{errorText}</p>
      </div>}
    </div>
  );
};

export default App;
