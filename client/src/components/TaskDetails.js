import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskDetails, getUserById } from '../api'; // Import your API functions

const TaskDetails = () => {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTask = await getTaskDetails(taskId);
            if (fetchedTask.assignedTo) {
                const fetchedUser = await getUserById(fetchedTask.assignedTo);  
                fetchedTask.assignedTo = fetchedUser.name;  
            }
            setTask(fetchedTask);
        };
        fetchData();
    }, [taskId]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };
    const handleEdit = () => {
        navigate(`/dashboard/tasks/taskform`, { state: { initialTask: task } });
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Task Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">{task.title}</h4>
                                <button className="btn btn-secondary" onClick={handleEdit}>Edit this task</button>
                            </div>
                            {['title', 'description', 'deadline', 'status', 'priority', 'assignedTo'].map((field, index) => (
                                <div className={`mt-3 d-flex justify-content-between align-items-center ${index !== 0 ? 'border-top pt-3' : ''}`} key={field}>
                                    <strong>{`${field.charAt(0).toUpperCase() + field.slice(1)}: `}</strong>
                                    <span>
                                        {field === 'deadline'
                                            ? formatDate(task[field])
                                            : field === 'assignedTo'
                                                ? task[field]
                                                : task[field]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
