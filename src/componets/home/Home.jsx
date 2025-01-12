import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import defaultProfilePic from '../../assets/profile.png';
import filters from '../../assets/filter.png';
import notfound from '../../assets/notfound.jpg';
import logo from '../../assets/logo.png';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserName(userData.name || 'User');
      setProfilePic(userData.profilePic || defaultProfilePic);
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleSubTaskToggle = (taskId, subTaskIndex, event) => {
    event.stopPropagation();

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubTasks = task.subTasks.map((subTask, index) => {
          if (index === subTaskIndex) {
            return { ...subTask, completed: !subTask.completed };
          }
          return subTask;
        });

        const completedSubTasks = updatedSubTasks.filter((subTask) => subTask.completed).length;
        const progress = Math.round((completedSubTasks / updatedSubTasks.length) * 100);

        return { ...task, subTasks: updatedSubTasks, progress, status: progress === 100 ? 'completed' : 'inProgress' };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const isOverdue = (deadline) => {
    const currentDate = new Date();
    return new Date(deadline) < currentDate;
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.progress === 100;
    if (filter === 'pending') return task.progress < 100 && task.status !== 'completed';
    if (filter === 'overdue') return isOverdue(task.deadline) && task.progress < 100;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedTasks = searchedTasks.filter((task) => task.progress === 100);
  const ongoingTasks = searchedTasks.filter((task) => task.progress < 100);

  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="text-name2">Stay Organized, Achieve More!</h2>
      <header className="header">
        <div>
          <h1 className="text-name">
            Welcome Back, <span className="text-name1">{userName}!</span>
          </h1>
        </div>
        <img
          src={profilePic}
          alt="Profile"
          className="profile-picture"
          onClick={() => navigate('/profile')}
        />
      </header>

      <input
        type="text"
        placeholder="Search tasks by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="filter-dropdown">
        <img src={filters} alt="Filter" className="filter-icon" />
        <select
          id="task-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="overdue">Overdue Tasks</option>
        </select>
      </div>

      <button className="add-task-button" onClick={() => navigate('/add-task')}>
        Add Task  
      </button>

      <div className="tasks-container">
        {completedTasks.length > 0 && (
          <>
            <h2 className="section-heading">Completed Projects</h2>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="task-card completed"
                onClick={() => navigate(`/task-details/${task.id}`)}
              >
                <h3>{task.taskName}</h3>
                <p>{task.description}</p>
                <p>Deadline: {task.deadline}</p>
                <div className="progress-container">
                  <CircularProgressbar
                    value={task.progress}
                    text={`${task.progress}%`}
                    styles={buildStyles({
                      textSize: '14px',
                      textColor: '#000',
                      pathColor: '#4caf50',
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
                <button className="delete-button" onClick={(e) => handleDeleteTask(task.id, e)}>
                  Delete 
                </button>
              </div>
            ))}
          </>
        )}

        {ongoingTasks.length > 0 && (
          <>
            <h2 className="section-heading">Ongoing Projects</h2>
            {ongoingTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${isOverdue(task.deadline) ? 'overdue' : ''}`}
                onClick={() => navigate(`/task-details/${task.id}`)}
              >
                <h3>{task.taskName}</h3>
                <p>{task.description}</p>
                <p>Deadline: {task.deadline}</p>
                <div className="progress-container">
                  <CircularProgressbar
                    value={task.progress}
                    text={`${task.progress}%`}
                    styles={buildStyles({
                      textSize: '14px',
                      textColor: '#000',
                      pathColor: '#4caf50',
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
                <button className="delete-button" onClick={(e) => handleDeleteTask(task.id, e)}>
                  Delete
                </button>
              </div>
            ))}
          </>
        )}

        {completedTasks.length === 0 && ongoingTasks.length === 0 && (
          <img src={notfound} alt="No Tasks Found" className="notfound" />
        )}
      </div>
    </div>
  );
};

export default Home;
