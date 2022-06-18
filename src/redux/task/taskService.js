import axios from "axios"


// for creating a new task, we pass in company_id, token, task_id and the
// dataValues from the form data
export const createTask = async (company_id, token, dataValues) => {
    const URL = "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=" + company_id
    const config = {
        headers: {
        
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        }
    }

    if (!dataValues) {
        alert("Please enter complete fields")    
    }

    const addTaskData = JSON.stringify(dataValues)

    const response = await axios.post(URL, addTaskData, config)
    
    console.log(response.data.results)

    if (response.data) {
        localStorage.setItem('assigneduser', JSON.stringify(response.data))
    }

    return response.data
}


// for delete task endpoint cal, we pass in company_id, token, task_id 
export const deleteTask = async (company_id, token, task_id, ) => {
    
    if (task_id) {
        alert("Please enter a valid id")    
    }
    
    const URL = "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/" + task_id + "?company_id=" + company_id
    
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        }
    }


    const response = await axios.delete(URL, config)
    
    console.log(response.data.results)

    if (response.data) {
        localStorage.setItem('assigneduser', JSON.stringify(response.data))
    }

    return response.data
}


// for updating task, we pass in company_id, token, task_id and the
// updatedValues from the form data
export const updateTask = async (company_id, token, task_id, updatedValues ) => {
    
    if (!task_id) {
        alert("Please enter a valid id")    
    }
    
    const URL = "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/" + task_id + "?company_id=" + company_id
    
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        }
    }

    const editedTaskData = JSON.stringify(updatedValues)

    const response = await axios.put(URL, editedTaskData, config)
    
    console.log(response.data.results)

    if (response.data) {
        localStorage.setItem('assigneduser', JSON.stringify(response.data))
    }

    return response.data
}
