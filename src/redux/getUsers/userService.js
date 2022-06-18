import axios from 'axios'
// This is the endpoint for getting assigned users for the dropdown
// it will receive company_id from logged in user and access token
// to enable it get the required data
const getAssignedUser = async (company_id, token) => {
    
    const URL = "https://stage.api.sloovi.com/team?product=outreach&company_id=" + company_id
    
    const config = {
        headers: {
        
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        }
    }

    const response = await axios.get(URL, config)
    
    console.log(response.data.results)

    if (response.data) {
        localStorage.setItem('assigneduser', JSON.stringify(response.data))
    }

    return response.data
}


const assignedUserService = {
    getAssignedUser,
}

export default assignedUserService