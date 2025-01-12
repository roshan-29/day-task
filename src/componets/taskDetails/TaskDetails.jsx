import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskDetails.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const currentTask = tasks.find((t) => t.id === parseInt(id, 10));
    setTask(currentTask);
    if (currentTask) {
      setNewTitle(currentTask.taskName);
      setNewDescription(currentTask.description);
    }
  }, [id]);

  const handleSubTaskToggle = (index) => {
    if (task) {
      const updatedSubTasks = task.subTasks.map((subTask, i) => {
        if (i === index) {
          return { ...subTask, completed: !subTask.completed };
        }
        return subTask;
      });

      const completedSubTasks = updatedSubTasks.filter((subTask) => subTask.completed).length;
      const progress = Math.round((completedSubTasks / updatedSubTasks.length) * 100);

      const updatedTask = { ...task, subTasks: updatedSubTasks, progress };
      setTask(updatedTask);
      saveTask(updatedTask);
    }
  };

  const handleDeadlineChange = (newDeadline) => {
    if (task) {
      const updatedTask = { ...task, deadline: newDeadline };
      setTask(updatedTask);
      saveTask(updatedTask);
    }
  };

  const handleTitleChange = () => {
    if (task) {
      const updatedTask = { ...task, taskName: newTitle };
      setTask(updatedTask);
      saveTask(updatedTask);
      setIsEditingTitle(false);
    }
  };

  const handleDescriptionChange = () => {
    if (task) {
      const updatedTask = { ...task, description: newDescription };
      setTask(updatedTask);
      saveTask(updatedTask);
      setIsEditingDescription(false);
    }
  };

  const saveTask = (updatedTask) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="task-details-container">
      <div className="task-name-container">
        <label htmlFor="task-name">Task Name:</label>
        {isEditingTitle ? (
          <input
            id="task-name"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleChange}
          />
        ) : (
          <span className='span1' onClick={() => setIsEditingTitle(true)}>{task.taskName}</span>
        )}
      </div>

      <div className="task-description-container">
        <label htmlFor="task-description" className='label'>Task Description:</label>
        {isEditingDescription ? (
          <textarea
            id="task-description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={handleDescriptionChange}
          />
        ) : (
          <span className='span2' onClick={() => setIsEditingDescription(true)}>{task.description}</span>
        )}
      </div>

      <div className="deadline-container">
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={task.deadline}
          onChange={(e) => handleDeadlineChange(e.target.value)}
        />
      </div>

      <h3>Subtasks:</h3>
      <ul className="subtasks-list">
        {task.subTasks.map((subTask, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => handleSubTaskToggle(index)}
            />
            {subTask.name}
          </li>
        ))}
      </ul>

      <div className="progress-container">
        <CircularProgressbar value={task.progress} text={`${task.progress}%`} />
      </div>

      <button className='save' onClick={() => navigate('/home')}>SAVE</button>
    </div>
  );
};

export default TaskDetails;
