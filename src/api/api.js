import axios from "axios";

export const fetchPokemon = async (id) => {
    
    return axios.get(`https://pokeapi.co/api/v2/berry/${id}`)
        .then(({ data }) => {
            return JSON.stringify(data);
        })
        .catch(error => { 
            console.error(error);
        })
}