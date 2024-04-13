import React, { useEffect, useState } from 'react';
import { listActors } from '../services/ActorService';
import "./css/ListActors_Style.css"; // Import your CSS file
import { useNavigate } from 'react-router-dom'; 

const ListActorComponent = () => {
    const [actors, setActors] = useState([]);
    const navigator = useNavigate();
    

    useEffect(() => {
        listActors()
            .then(response => {
                setActors(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function handleActorClick(actorId) {
        navigator(`/movies/actor/${actorId}`);
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Actors</h2>
            <div className="actor-container1">
                {actors.map(actor => (
                    <div key={actor.actorId} className="actor-info1" onClick={() => handleActorClick(actor.actorId)} style={{ cursor: 'pointer' }}>
                        <img src={actor.avatarImageUrl} alt={`${actor.firstName} ${actor.lastName}`} className="actor-image1" />
                        <div className="actor-details1">
                            <p><b>{actor.firstName} {actor.lastName}</b></p>
                            <p><b>Birthdate:</b> {actor.birthDate} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListActorComponent;
