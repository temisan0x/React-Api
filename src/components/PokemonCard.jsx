import React, { useState, useEffect } from 'react';
import { fetchPokemon } from '../api/api';

const PokemonCard = ({id}) => {
    const [pokemonData, setPokemonData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPokemon(id)
    }, [id]);

    return (
        <div>PokemonCard</div>

    )
}

export default PokemonCard