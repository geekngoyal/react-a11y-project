// Component Rendering

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';


// User Interactions
// Should update input state when user types in textarea
// Should call handleCalculate when Calculate button is clicked
// Should display result when result state is not null

// Accessibility

// Should have proper heading hierarchy
// Should have placeholder text for textarea
// Should have alert role on warning message

// Negative Test Scenarios
// Missing/Null Values
// Should not display result paragraph when result is null
// Should handle empty input gracefully

// Edge Cases
// Should handle special characters in input
// Should handle very long input strings

// Accessibility Issues
// Should flag incorrect heading hierarchy (h2 after h1)
// Should flag missing alt text on image
// Should flag non-button element used as button (div with onClick)
// Should flag low color contrast (#aaa on #fff)

describe('App Component - Rendering Tests', () => {
  describe('Component Rendering', () => {
    it('should render components', () => {
      render(<App />);
      const mainDiv = screen.getByTestId('app-container');
      expect(mainDiv).toHaveStyle({
        backgroundColor: '#fff',
        color: '#767676'
      });


      const heading = screen.getByRole('heading', { name: /string calculator/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');

      const label = screen.getAllByText(/enter numbers/i)[0];
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', 'Enter numbers');

      const calculateElement = screen.getByText(/calculate/i);
      expect(calculateElement).toBeInTheDocument();
      expect(calculateElement.tagName).toBe('BUTTON');
      expect(calculateElement).toHaveStyle({
        backgroundColor: '#008cba',
        color: '#fff'
      });

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('width', '600');
      expect(image).toHaveAttribute('height', '400');
      expect(image).toHaveAttribute('src', expect.stringContaining('unsplash.com'));

      const alert = screen.queryByRole('alert');
      expect(alert).not.toBeInTheDocument();
    });

    it('should allow button to receive focus via keyboard navigation', () => {
      render(<App />);
      
      const button = screen.getByRole('button', { name: /calculate/i });
      
      // Test that button is focusable (keyboard accessible)
      button.focus();
      expect(button).toHaveFocus();
      
      // Verify button is in the tab order (tabIndex >= 0 or default)
      expect(button).not.toHaveAttribute('tabindex', '-1');
      // Check border color when button is focused
      expect(button).toHaveStyle({
        border: '2px solid #005f73'
      });
    });
  });
});
