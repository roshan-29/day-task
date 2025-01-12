import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './componets/Welcome/Welcome';
import UserForm from './componets/UserForm/UserForm';
import Home from './componets/home/Home';
import AddTask from './componets/addTask/AddTask';
import TaskDetails from './componets/taskDetails/TaskDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/task-details/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
