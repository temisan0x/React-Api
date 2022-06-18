import axios from 'axios'

const API_URL = 'https://stage.api.sloovi.com/login'


// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


const authService = {
    login,
}

export default authService