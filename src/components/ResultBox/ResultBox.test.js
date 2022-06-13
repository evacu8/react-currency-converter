import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />)
    });

    it('should render without crashing, second case', () => {
      render(<ResultBox from="USD" to="PLN" amount={100} />)
    });

    it('should render "Wrong value" when value is < 0', () => {
      // render component
      render(<ResultBox from="PLN" to="USD" amount='-100' />)

      // find “resultBox”
      const resultBoxElement = screen.getByTestId('result-box');

      // check if element presents correct value
      expect(resultBoxElement).toHaveTextContent(`Wrong value...`);
    });

    const testCases = [
      { amount: '100'},
      { amount: '20,8'},
      { amount: '200.2'},
      { amount: '345558.50'},
    ];
    
    for(const testAmount of testCases) {
      it('should render proper info about conversion when PLN -> USD', () => {
        const amount = parseInt(testAmount.amount);
        // render component
        render(<ResultBox from="PLN" to="USD" amount={amount} />)

        // find “resultBox”
        const resultBoxElement = screen.getByTestId('result-box');

        // check if element presents correct value
        const result = (amount/3.5).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const amountWithCommas = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        expect(resultBoxElement).toHaveTextContent(`PLN ${amountWithCommas} = $${result}`);
      });
    }

    for(const testAmount of testCases) {
      it('should render proper info about conversion when USD -> PLN', () => {
        const amount = parseInt(testAmount.amount);
        // render component
        render(<ResultBox from="USD" to="PLN" amount={amount} />)

        // find “resultBox”
        const resultBoxElement = screen.getByTestId('result-box');

        // check if element presents correct value
        const result = (amount*3.5).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const amountWithCommas = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        expect(resultBoxElement).toHaveTextContent(`$${amountWithCommas} = PLN ${result}`);
      });
    }

    for(const testAmount of testCases) {
      it('should render proper info about conversion when PLN -> PLN', () => {
        const amount = parseInt(testAmount.amount);
        // render component
        render(<ResultBox from="PLN" to="PLN" amount={amount} />)

        // find “resultBox”
        const resultBoxElement = screen.getByTestId('result-box');

        // check if element presents correct value
        const amountWithCommas = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        expect(resultBoxElement).toHaveTextContent(`PLN ${amountWithCommas} = PLN ${amountWithCommas}`);
      });
    }

    for(const testAmount of testCases) {
      it('should render proper info about conversion when USD -> USD', () => {
        const amount = parseInt(testAmount.amount);
        // render component
        render(<ResultBox from="USD" to="USD" amount={amount} />)

        // find “resultBox”
        const resultBoxElement = screen.getByTestId('result-box');

        // check if element presents correct value
        const amountWithCommas = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        expect(resultBoxElement).toHaveTextContent(`$${amountWithCommas} = $${amountWithCommas}`);
      });
    }
});