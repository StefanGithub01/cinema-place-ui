import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listAllCinemas } from '../../services/CinemaService';
import '../css/AdminPanel.css';
import { Button } from 'primereact/button';
import EditCinemaForm from './EditCinema';

const ViewCinemas = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);


  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const response = await listAllCinemas();
      setCinemas(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const editButtonTemplate = (rowData) => {
    return (
      <Button label="Edit" className="p-button-primary buttonAdmin" onClick={() => handleEdit(rowData.cinemaId)} />
    );
  };

  const cancelEdit = () => {
    setSelectedCinema(null);
  };

  const handleCinemaUpdated = () => {
    fetchCinemas(); // Refetch actors data
  };

  const handleEdit = (cinemaId) => {
    const selectedCinema = cinemas.find(cinema => cinema.cinemaId === cinemaId);
    setSelectedCinema(selectedCinema);
    console.log("selectedCinema", selectedCinema);
  };
  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <h2 className="text-white" style={{textAlign: 'center'}}>View Cinemas</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!selectedCinema ? (
      <div className="p-datatable-custom">
        <DataTable value={cinemas} sortMode="multiple" className="p-datatable-striped">
          <Column field="cinemaId" header="ID" className="text-white" sortable style={{ width: '10%' }} />
          <Column field="name" header="Name" className="text-white" sortable style={{ width: '30%' }} />
          <Column field="location" header="Location" className="text-white" sortable style={{ width: '30%' }} />
          <Column field="capacity" header="Capacity" className="text-white" sortable style={{ width: '20%' }} />
          <Column header="Actions" body={editButtonTemplate} style={{ textAlign: 'center', width: '10%' }} />

        </DataTable>

      </div>
      ) : (
        <EditCinemaForm cinema={selectedCinema} onCinemaUpdated={handleCinemaUpdated} cancelEdit={cancelEdit } />
        
      )}
    </div>
  );
};

export default ViewCinemas;
