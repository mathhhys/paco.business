import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SlotMachine from '../SlotMachine';
import { FirstName, LastName } from '@/lib/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
  div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  button: ({ children, onClick, disabled, whileHover, whileTap, ...props }: any) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
},
  useAnimation: () => ({
    start: jest.fn(),
    set: jest.fn(),
  }),
}));

describe('SlotMachine', () => {
  const mockFirstNames: FirstName[] = [
    { id: 1, name: 'Paco' },
    { id: 2, name: 'Pepe' },
  ];
  const mockLastNames: LastName[] = [
    { id: 1, name: 'Mendes', image_url: null },
    { id: 2, name: 'Garcia', image_url: null },
  ];
  const mockOnSpinComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <SlotMachine
        firstNames={mockFirstNames}
        lastNames={mockLastNames}
        onSpinComplete={mockOnSpinComplete}
      />
    );
    expect(screen.getByText('PACO SPIN')).toBeInTheDocument();
    expect(screen.getAllByText('Paco').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mendes').length).toBeGreaterThan(0);
  });

  it('calls onSpinComplete with random indices after spinning', async () => {
    // Mock Math.random to return specific values
    // First call for first name (0.1 * 2 = 0.2 -> 0)
    // Second call for last name (0.6 * 2 = 1.2 -> 1)
    jest.spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.6);

    render(
      <SlotMachine
        firstNames={mockFirstNames}
        lastNames={mockLastNames}
        onSpinComplete={mockOnSpinComplete}
      />
    );

    const spinButton = screen.getByText('PACO SPIN');
    fireEvent.click(spinButton);

    // Wait for the spin to complete (it has a timeout/animation)
    // Since we mocked useAnimation, the promise in spin() might resolve immediately or we need to wait.
    // The spin function awaits controls.start(). Since we mocked it to return a promise (or just void), 
    // we need to make sure our mock returns a promise if the code awaits it.
    // In the mock above, start returns undefined, which is awaited as Promise.resolve(undefined).
    
    await waitFor(() => {
      expect(mockOnSpinComplete).toHaveBeenCalledWith(0, 1);
    });

    expect(Math.random).toHaveBeenCalledTimes(2);
  });
});