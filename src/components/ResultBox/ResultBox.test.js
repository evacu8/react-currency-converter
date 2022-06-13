import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />)
    });

    const testCases = [
      { amount: '100'},
      { amount: '20,8'},
      { amount: '200.2'},
      { amount: '345.50'},
    ];
    
    for(const testAmount of testCases) {
      it('should render proper info about conversion when PLN -> USD', () => {
        const amount = parseInt(testAmount.amount);
        // render component
        render(<ResultBox from="PLN" to="USD" amount={amount} />)
  
          // find “resultBox”
          const resultBoxElement = screen.getByTestId('result-box');
  
          // check if element presents correct value
          const result = (amount/3.5).toFixed(2);
          expect(resultBoxElement).toHaveTextContent(`PLN ${amount.toFixed(2)} = $${result}`);
      });
    }
});