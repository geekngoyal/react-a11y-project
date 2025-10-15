import { useState } from 'react';

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
  const [result] = useState(null); 
  const [isError] = useState(false);
  
  const handleCalculate = () => {};

  return (
    <div data-testid="app-container" style={{ padding: '20px', backgroundColor: '#fff', color: '#aaa' }}>
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={600}
        height={400}
        alt='thread'
      />

      <h1>String Calculator</h1>

      <label htmlFor="numbers-input" style={{ fontSize: '20px', display: 'block', marginBottom: '5px' }}>
        Enter numbers
      </label>

      <textarea
        id="numbers-input"
        style={{ margin: '10px 0', color: '#767676', display: 'block', width: '100%' }}
        placeholder='Enter numbers'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
        aria-describedby="input-instructions"
      />

      <button
        onClick={handleCalculate}
        style={{
          padding: '10px',
          backgroundColor: '#008cba',
          color: '#fff',
          border: 'none',
        }}>
        Calculate
      </button>

      {result !== null && <p style={{ color: 'green' }}>Result: {result}</p>}

      {isError && <div role='alert'>
        <p>Make sure you enter numbers correctly!</p>
      </div>}
    </div>
  );
};

export default App;
