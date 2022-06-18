import React from 'react'
import "../styles/taskList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/task/taskSlice';

const TaskList = () => {
    const { user } = useSelector((state) => state.auth)
    const { task } = useSelector((state) => state.task)
    const dispatch = useDispatch()


    const handleDelete = (id) => {
        console.log("id is", id)
        dispatch(deleteTask(id))
    }

    const handleEdit = () => {

    }


    return (
        <li className='taskResults'>  
            {
                task.map((item, id) => (
                    <div key={id} className="tasksSection">
                        {/* image avatar is rendered here from the dispatch login action */}
                        <img src={`${user.results.icon}`} alt="img" className='img' />
                        
                        <div className="taskDetail">
                            <p>{item.task_msg}</p>
                            <p>{item.assigned_user} on <span> {item.task_time}</span></p>
                        </div>
                        
                        <div className="btn">
                            <button
                                onClick={handleEdit}
                                className="edit"
                            >
                                <FontAwesomeIcon icon={faPen} color="gray" />
                            </button>
                            <button
                                onClick={()=> handleDelete(id)}
                                className="trash">
                                <FontAwesomeIcon icon={faTrash} color="gray" />
                            </button>
                        </div>
                    </div >
                ))
            }
           
        </li>
    )
}

export default TaskList