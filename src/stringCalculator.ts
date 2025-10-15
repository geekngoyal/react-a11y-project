export const calculate = (expression: string): number | string => {
  try {
    const cleanExpression = expression.replace(/\s+/g, '');
    
    if (!cleanExpression) {
      return 'Error: Please enter an expression';
    }
    
    if (!/^[\d+\-*/%().]+$/.test(cleanExpression)) {
      return 'Error: Invalid characters in expression';
    }

    const result = evaluateExpression(cleanExpression);
    
    return result;
  } catch (error) {
    console.log(error);
    return 'Error: Invalid expression';
  }
};

export const evaluateExpression = (expr: string): number => {
  while (expr.includes('(')) {
    expr = expr.replace(/\(([^()]+)\)/g, (match, inner) => {
      return String(evaluateExpression(inner));
    });
  }
  
  expr = processOperators(expr, ['*', '/', '%']);
  
  expr = processOperators(expr, ['+', '-']);
  
  return parseFloat(expr);
};

const processOperators = (expr: string, operators: string[]): string => {
  const regex = new RegExp(`(-?\\d+\\.?\\d*)([${operators.map(op => '\\' + op).join('')}])(-?\\d+\\.?\\d*)`);
  
  while (regex.test(expr)) {
    expr = expr.replace(regex, (match, num1, operator, num2) => {
      const n1 = parseFloat(num1);
      const n2 = parseFloat(num2);
      let result: number;
      
      switch (operator) {
        case '+':
          result = n1 + n2;
          break;
        case '-':
          result = n1 - n2;
          break;
        case '*':
          result = n1 * n2;
          break;
        case '/':
          if (n2 === 0) throw new Error('Division by zero');
          result = n1 / n2;
          break;
        case '%':
          result = n1 % n2;
          break;
        default:
          throw new Error('Unknown operator');
      }
      
      return String(result);
    });
  }
  
  return expr;
};