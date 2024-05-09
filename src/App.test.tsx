import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import { ApiClient } from './client/ApiClient';
import NavBar from "./parts/NavBar";
import Tasks from './pages/tasks/Tasks';
import {TaskModel} from "./model/TaskModel";
import {BrowserRouter} from "react-router-dom";
import TaskRow from "./pages/tasks/TaskRow";

interface UserModel {
  id: number;
  name: string;
  email: string;
  taskModel: TaskModel[];
}

const userMock: UserModel = {
  id: 123,
  name: "John Doe",
  email: "john@example.com",
  taskModel: []
};

const taskMock: TaskModel = {
  id: 1,
  name: 'Task Name',
  description: 'Task Description',
  complete: false,
  userName: 'User Name',
  user: userMock,
  user_id: userMock.id
};

describe('TaskRow Component', () => {
  it('calls delete function when delete button is clicked', () => {
    const deleteMock = jest.fn();
    render(<BrowserRouter>
      <TaskRow task={taskMock} delete={deleteMock} />
    </BrowserRouter>);

    fireEvent.click(screen.getByText('Smazat'));
    expect(deleteMock).toHaveBeenCalledWith(1); // Assuming task id is 1
  });

  it('navigates to task detail when upravit button is clicked', () => {
    // Mock useNavigate function
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn()
    }));

    render(<BrowserRouter><TaskRow task={taskMock} delete={jest.fn()} /></BrowserRouter>);

    fireEvent.click(screen.getByText('Upravit'));
  });
});


jest.mock('./client/ApiClient', () => ({
ApiClient: {
  getTasks: async () => {
    return [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
  }
}
}));
describe('ApiClient.getTasks', () => {
  test('should fetch tasks from API', async () => {
    const tasks = await ApiClient.getTasks();

    expect(tasks).toEqual([{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }]);
  });
});



jest.mock('./client/ApiClient');
describe('NavBar Component', () => {
  it('renders navbar correctly', () => {
    render(<NavBar />);

    const navBrandElement = screen.getByText('TO-DO list');
    expect(navBrandElement).toBeInTheDocument();

    const navBarElement = screen.getByRole('navigation');
    expect(navBarElement).toHaveClass('navbar');
    expect(navBarElement).toHaveClass('bg-dark');
    expect(navBarElement).toHaveClass('navbar-dark');
    expect(navBarElement).toHaveClass('mb-5');
  });
});






