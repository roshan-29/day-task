import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [subTasks, setSubTasks] = useState([{ name: '', completed: false }]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, { name: '', completed: false }]);
  };

  const handleSubTaskChange = (index, value) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].name = value;
    setSubTasks(updatedSubTasks);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!taskName.trim()) newErrors.taskName = 'Task Name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!deadline.trim()) newErrors.deadline = 'Deadline is required';
    if (subTasks.some((subTask) => !subTask.name.trim()))
      newErrors.subTasks = 'All subtask names are required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const newTask = {
        id: Date.now(),
        taskName,
        description,
        deadline,
        status: 'new',
        subTasks,
        progress: 0,
      };
      localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
      navigate('/home');
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add New Task</h1>
      <form onSubmit={handleAddTask} className="add-task-form">
        <label>
          Task Name:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {errors.taskName && <span className="error-message">{errors.taskName}</span>}
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </label>

        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          {errors.deadline && <span className="error-message">{errors.deadline}</span>}
        </label>

        <div className="subtasks-container">
          <h3>Subtasks:</h3>
          {subTasks.map((subTask, index) => (
            <div key={index} className="subtask-item">
              <input
                type="text"
                placeholder={`Subtask ${index + 1}`}
                value={subTask.name}
                onChange={(e) => handleSubTaskChange(index, e.target.value)}
              />
            </div>
          ))}
          {errors.subTasks && <span className="error-message">{errors.subTasks}</span>}
          <button type="button" onClick={handleAddSubTask} id='subtask' className="add-subtask-button">
            Add Subtask
          </button>
        </div>

        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
