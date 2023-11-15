import { render, screen, fireEvent} from '@testing-library/react';
import Players from '../Players';

test('should render Name text', () => {
    render(<Players/>);
    const textElement = screen.getByTestId('player-text');
    expect(textElement).toBeInTheDocument();
   
})

test('should render input text name', () => {
    render(<Players/>);
    const inputElement = screen.getByTestId('input');
    expect(inputElement).toBeInTheDocument();
})

test('should render season text', () => {
    render(<Players/>);
    const textElement = screen.getByTestId('season-text');
    expect(textElement).toBeInTheDocument();
   
})

test('should render input text season', () => {
    render(<Players/>);
    const inputElement = screen.getByTestId('season-input');
    expect(inputElement).toBeInTheDocument();
})

test('should render submit button', () => {
    render(<Players/>);
    const submitElement = screen.getByTestId('submit-btn');
    expect (submitElement).toBeInTheDocument();
})

