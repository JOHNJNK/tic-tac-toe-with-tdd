import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game, { calculateWinner } from './App.js';

describe('calculateWinner function', () => {
  test('returns the correct winner', () => {
    const squares1 = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(calculateWinner(squares1)).toBe('X');

    const squares2 = ['O', 'O', 'O', null, 'X', null, 'X', null, null];
    expect(calculateWinner(squares2)).toBe('O');

    const squares3 = ['X', 'O', 'X', 'O', 'O', 'X', null, null, 'X'];
    expect(calculateWinner(squares3)).toBe('X');

    const squares4 = [null, null, null, null, null, null, null, null, null];
    expect(calculateWinner(squares4)).toBeNull();
  });
});

describe('Game component', () => {
  test('renders without errors', () => {
    render(<Game />);
  });

  test('clicking on squares updates the board and status correctly', () => {
    const { container, getByText } = render(<Game />);

    const squares = container.querySelectorAll('.square');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[4]); // X
    fireEvent.click(squares[5]); // O
    fireEvent.click(squares[8]); // X

    expect(squares[0].textContent).toBe('X');
    expect(squares[1].textContent).toBe('O');
    expect(squares[4].textContent).toBe('X');
    expect(squares[5].textContent).toBe('O');
    expect(squares[8].textContent).toBe('X');

    const status = getByText('Winner: X');
    expect(status).toBeInTheDocument();
  });

  test('clicking on the "Go to move" buttons updates the current move', () => {
    const { container, getByText } = render(<Game />);

    // Click on squares
    const squares = container.querySelectorAll('.square');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[4]); // X

    const move1Button = getByText('Go to move #1');
    const move2Button = getByText('Go to move #2');
    fireEvent.click(move1Button);
    fireEvent.click(move2Button);

    const status = getByText('Next player: X');
    expect(status).toBeInTheDocument();
  });
});
