import axios from "axios";

export const fetchMovies = async () => {
    
    return axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=5e4c07624522912d94cb03b275b6b416")
        .then(({ data }) => {
            return JSON.stringify(data);
        })
        .catch(error => { 
            console.error(error);
        })
}