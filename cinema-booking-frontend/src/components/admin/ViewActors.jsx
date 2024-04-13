import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listActors } from '../../services/ActorService';
import "../css/AdminPanel.css"; // Import your CSS file
import { Button } from 'primereact/button';
import EditActorForm from './EditActor';

const ViewActors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    fetchActors();
  }, []);


  const imageTemplate = (rowData) => {
    return (
      <img src={rowData.avatarImageUrl} alt={rowData.avatarImageUrl} style={{ width: '120px', height: '150px' }} />
    );
  };
  const editButtonTemplate = (rowData) => {
    return (
      <Button label="Edit" className="p-button-primary buttonAdmin" onClick={() => handleEdit(rowData.actorId)} />
    );
  };
  // Handle actor update
  const handleActorUpdated = () => {
    fetchActors(); // Refetch actors data
  };

  const fetchActors = async () => {
    try {
      setLoading(true);
      const response = await listActors();
      setActors(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (actorId) => {
    const selectedActor = actors.find(actor => actor.actorId === actorId);
    setSelectedActor(selectedActor);
    console.log("selectedActor", selectedActor );
  };

  const cancelEdit = () => {
    setSelectedActor(null);
  };
  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <h2 className="text-white" style={{textAlign: 'center'}}>View Actors</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!selectedActor ? (
      <div className="p-datatable-custom">
        <DataTable value={actors} sortMode="multiple" className="p-datatable-striped">
          <Column field="actorId" header="ID" className="text-white" sortable style={{ width: '2%' }} />
          <Column field="AvatarImageUrl" header="Poster" body={imageTemplate} style={{ textAlign: 'center' }} />
          <Column field="firstName" header="First Name" className="text-white" sortable style={{ width: '25%' }}/>
          <Column field="lastName" header="Last Name" className="text-white" sortable style={{ width: '25%' }} />
          <Column field="birthDate" header="Date of Birth" className="text-white" sortable style={{ width: '25%' }} />
          <Column header="Actions" body={editButtonTemplate} style={{ textAlign: 'center', width: '10%' }} />
          </DataTable>
        </div>
      ) : (
        <EditActorForm actor={selectedActor} onActorUpdated={handleActorUpdated} cancelEdit={cancelEdit} />
        
      )}
    </div>
  );
};

export default ViewActors;
