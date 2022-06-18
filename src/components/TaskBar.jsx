import React, { useState } from 'react';
import "../styles/taskBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/task/taskSlice';
import { getUser } from '../redux/getUsers/assignedUserSlice';
import { createTask } from '../redux/task/taskService';


const TaskBar = () => {
    const { assigneduser } = useSelector((state) => state.assignedUser)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    // this is to open and close the form
    const [open, setOpen] = useState(false)

    const [value, setValue] = useState({
        assigned_user: "user_4ee4cf67ad474a27988bc0afb84cf472",
        task_date: "",
        task_time: "",
        is_completed: "1",
        time_zone: "",
        task_msg: ""
    })


            
    // this it to get the current timezone to seconds
    // javascript method to get the current timezone 
    const myTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // javascript method to get the current date and time equivalence in timezones
    const times = new Date().toLocaleDateString("en-Us", {timeZone: `${myTimeZone}`, timestyle: 'long', hourCycle: 'h24'})
    const date = new Date(times)
    const timezoneSeconds = date.getTime() / 1000 


    const handleSubmit = async () => {
        console.log(value)    
        try {
            const company_id = user.results.company_id
            const token = user.results.token
            const time = value.task_time                 

            const dataValues = {
                ...value,
                task_time: Number(time.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)),
                task_zone: Number(timezoneSeconds),
                is_completed: Number(value.is_completed)
            }

            const resp = await createTask(company_id, token, dataValues)
            console.log(" adding first task resp is", {resp})

            
            // dispatch(addTask(value))
            // localStorage.setItem('task', JSON.stringify(value));
            // setOpen(false)    
        } catch (error) {
            alert(error.message)            
        }
        
    }
    

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const handleAdd = () => {
        setOpen(prev => !prev)
    }

    

    React.useEffect(() => {
        dispatch(getUser())
    }, [])
    



    return (
        <>
            <div className="addTask">
                <div className='tasks'>
                    <p>Tasks  0</p>
                </div>
                <div className="plus" onClick={handleAdd}>
                    <p>{ !open ? "+": "-"}</p>
                </div>
            </div>
            
            <form className={`taskContainer ${ open  ? "open" : "close"}`} onSubmit={(e)=> e.preventDefault()} >
                <div className='taskDescription'>
                    <p>Task Description</p>
                    <div>
                        <input
                            required  
                            onChange={handleChange}    
                            name="task_msg"
                            type="text"
                            value={value.task_msg}
                        />
                        <div className="icon"><FontAwesomeIcon icon={faAddressCard} color="gray" /></div>
                    </div>
                </div>
                    
                <div className='taskDetails'>
                    <div className="details">
                        <p>Date</p>
                        <div className='date' >
                            <div className="icon"><FontAwesomeIcon icon={faCalendarAlt} color="gray" /></div>
                            <input
                                required
                                onChange={handleChange}    
                                name="task_date"
                                type="date"
                                value={value.task_date}
                            />
                            
                        </div>
                    </div>
                    <div className="details">
                        <p>Time</p>
                        <div className='time'>
                            <div className="icon"><FontAwesomeIcon icon={faClock} color="gray" /></div>
                            <input
                                required
                                onChange={handleChange}    
                                name="task_time"
                                type="time"
                                value={value.task_time}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="assignUser">
                    <p>Assign User</p>
                    <select
                        id=""
                        className='select'
                        required    
                        name="assigned_user"
                        value={value.assigned_user}
                        onChange={handleChange}
                    >
                        {
                            assigneduser.results.data.map((set, index) => (
                                <option key={index}>{ set.name }</option>
                            ))
                        }
                    </select>
                </div>

                <div className="taskBtn">
                    <button className="cancelBtn" onClick={()=> setOpen(false)}>
                        Cancel
                    </button>
                    <button className="saveBtn" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}

export default TaskBar