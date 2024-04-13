import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listUsers } from '../../services/UserService';
import { Button } from 'primereact/button';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await listUsers();
      setUsers(response.data);
      console.log("Users:", response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editButtonTemplate = (rowData) => {
    return (
      <Button label="Edit" className="p-button-primary buttonAdminNoMargin" onClick={() => handleEdit(rowData.reviewId)} />
    );
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <h2 className="text-white" style={{textAlign: 'center'}}>View Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="p-datatable-custom">
        <DataTable value={users} sortMode="multiple" className="p-datatable-striped">
          <Column field="userId" header="ID" className="text-white" sortable style={{ width: '10%' }} />
          <Column field="username" header="Username" className="text-white" sortable />
          <Column field="email" header="Email" className="text-white" sortable />
          <Column field="isAdmin" header="Admin" className="text-white" sortable />
          {/*<Column header="Actions" body={editButtonTemplate} style={{ textAlign: 'center', width: '10%' }} /> */}
        </DataTable>
      </div>
    </div>
  );
};

export default ViewUsers;
