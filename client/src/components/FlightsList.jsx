import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllFlights} from '../redux/FlightProductSlice';

const FlightsList = () => {
    const dispatch = useDispatch();
    const { flights, loading, error } = useSelector((state) => state.flights);
   
    
    useEffect(() => {
        const fetchAllFlights = async () => {
            try {
               const response =  await dispatch(getAllFlights()); 
               console.log(response.data);
            } catch (error) {
                console.error("Error fetching flights:",error);
            }
        };

        fetchAllFlights();
    }, [dispatch]);

    


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {flights.length > 0 ? (
                    flights.map(flight => (
                        <li key={flight.id}>{flight.name}</li> 
                    ))
                ) : (
                    <li>No flights available.</li>
                )}
            </ul>
           
        </div>
    );
};

export default FlightsList;