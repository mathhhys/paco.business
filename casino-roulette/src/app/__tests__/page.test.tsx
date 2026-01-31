import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import { supabase } from '@/lib/supabase';

// Mock Supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

// Mock child components to simplify testing
jest.mock('@/components/SlotMachine', () => {
  return function MockSlotMachine({ firstNames, lastNames }: any) {
    return (
      <div data-testid="slot-machine">
        SlotMachine: {firstNames.length} firsts, {lastNames.length} lasts
      </div>
    );
  };
});

jest.mock('@/components/PlayerResult', () => {
  return function MockPlayerResult() {
    return <div data-testid="player-result">PlayerResult</div>;
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data from paconames and pacosurname tables', async () => {
    // Mock successful response
    const mockFirstNames = [{ id: 1, firstname: 'Paco' }];
    const mockLastNames = [{ id: 1, lastname: 'Mendes', image: 'url' }];

    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'paconames') {
        return {
          select: jest.fn().mockResolvedValue({ data: mockFirstNames, error: null }),
        };
      }
      if (table === 'pacosurname') {
        return {
          select: jest.fn().mockResolvedValue({ data: mockLastNames, error: null }),
        };
      }
      return {
        select: jest.fn().mockResolvedValue({ data: [], error: null }),
      };
    });

    render(<Home />);

    // Should show loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId('slot-machine')).toBeInTheDocument();
    });

    expect(screen.getByText('SlotMachine: 1 firsts, 1 lasts')).toBeInTheDocument();

    // Verify Supabase calls
    expect(supabase.from).toHaveBeenCalledWith('paconames');
    expect(supabase.from).toHaveBeenCalledWith('pacosurname');
  });

  it('handles empty data correctly', async () => {
    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    }));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('No Data Available')).toBeInTheDocument();
    });
  });

  it('handles errors correctly', async () => {
    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({ data: null, error: { message: 'DB Error' } }),
    }));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Connection Error')).toBeInTheDocument();
    });
    expect(screen.getByText('DB Error')).toBeInTheDocument();
  });
});