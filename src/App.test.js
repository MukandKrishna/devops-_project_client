// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockTasks = [
  {
    title: 'Test Task',
    author: 'Test Author',
    timestamp: '2023-01-01',
    description: 'This is a test task description.',
    link: 'http://test-link.com',
  },
];

describe('App Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTasks });
    render(<App />);
  });

  it('renders App component with tasks', async () => {
    // Wait for tasks to be loaded
    const taskTitleElement = await screen.findByText('Test Task');
    expect(taskTitleElement).toBeInTheDocument();
  });

  it('displays task details correctly', async () => {
    // Wait for tasks to be loaded
    const taskTitleElement = await screen.findByText('Test Task');

    expect(screen.getByText('short by Test Author / 2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('This is a test task description.')).toBeInTheDocument();
    expect(screen.getByText('read more at')).toHaveAttribute('href', 'http://test-link.com');
  });

  it('handles task link click', async () => {
    // Wait for tasks to be loaded
    const taskTitleElement = await screen.findByText('Test Task');

    const linkElement = screen.getByText('read more at');
    expect(linkElement).toHaveAttribute('href', 'http://test-link.com');

    userEvent.click(linkElement);

    // Your additional assertions for what should happen when the link is clicked
  });

  it('handles axios error during data fetching', async () => {
    axios.get.mockRejectedValue(new Error('Test error'));
    render(<App />);

    const errorElement = await screen.findByText('Error fetching tasks');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    // Simple render test to check if the component renders without crashing
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });
});
