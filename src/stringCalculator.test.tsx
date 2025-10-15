import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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
      
      button.focus();
      expect(button).toHaveFocus();
      
      expect(button).not.toHaveAttribute('tabindex', '-1');
      expect(button).toHaveStyle({
        border: '2px solid #005f73'
      });
    });
  });

  describe('Textarea Input Validation', () => {
    it('should handle null/empty input', async() => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      expect(textarea.value).toBe('');
      
      button.click();
      
      const errorMessage = await screen.findByText(/please enter an expression/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it('should reject invalid characters in input', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      const invalidInputs = [
        'abc',
        '10 + @',
        '5 # 3',
        '10 $ 5',
        'hello world',
        '10 & 5',
      ];
      
      for (const input of invalidInputs) {
        fireEvent.change(textarea, { target: { value: '' } });
        
        fireEvent.change(textarea, { target: { value: input } });
        
        button.click();
        
        const errorMessage = await screen.findByText(/invalid characters/i);
        expect(errorMessage).toBeInTheDocument();
      }
    });

    it('should accept valid mathematical expressions', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      const validInputs = [
        '10 + 5',
        '20 - 10',
        '5 * 4',
        '20 / 4',
        '10 % 3',
        '(10 + 5) * 2',
        '10.5 + 2.3',
      ];
      
      for (const input of validInputs) {
        fireEvent.change(textarea, { target: { value: '' } });
        
        fireEvent.change(textarea, { target: { value: input } });
        
        button.click();
        
        const result = await screen.findByText(/result/i);
        expect(result).toBeInTheDocument();
      }
    });

    it('should handle whitespace in expressions correctly', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      const inputsWithSpaces = [
        '10 + 5',
        '  10+5  ',
        '10  +  5',
        '\n10 + 5\n',
      ];
      
      for (const input of inputsWithSpaces) {
        fireEvent.change(textarea, { target: { value: '' } });
        
        fireEvent.change(textarea, { target: { value: input } });
        
        button.click();
        
        const result = await screen.findByText(/result/i);
        expect(result).toBeInTheDocument();
      }
    });

    it('should validate and display correct result for addition', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '10 + 5' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*15/i);
      expect(result).toBeInTheDocument();
    });

    it('should validate and display correct result for subtraction', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '20 - 5' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*15/i);
      expect(result).toBeInTheDocument();
    });

    it('should validate and display correct result for multiplication', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '5 * 4' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*20/i);
      expect(result).toBeInTheDocument();
    });

    it('should validate and display correct result for division', async () => {
      await render(<App />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      fireEvent.change(textarea, { target: { value: '20 / 4' } });
      button.click();
      const result = await screen.findByText(/result.*5/i);
      expect(result).toBeInTheDocument();
    });

    it('should validate and display correct result for modulo', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '10 % 3' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*1/i);
      expect(result).toBeInTheDocument();
    });

    it('should handle complex expressions with parentheses', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '(10 + 5) * 2' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*30/i);
      expect(result).toBeInTheDocument();
    });

    it('should handle decimal numbers', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '10.5 + 2.5' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*13/i);
      expect(result).toBeInTheDocument();
    });

    it('should handle negative numbers', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '10 + (-5)' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*5/i);
      expect(result).toBeInTheDocument();
    });

    it('should handle division by zero gracefully', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '10 / 0' } });
      
      button.click();
      
      const errorMessage = await screen.findByText(/error/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it('should handle very long expressions', async () => {
      render(<App />);
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /calculate/i });
      
      fireEvent.change(textarea, { target: { value: '1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10' } });
      
      button.click();
      
      const result = await screen.findByText(/result.*55/i);
      expect(result).toBeInTheDocument();
    });
  });
});
