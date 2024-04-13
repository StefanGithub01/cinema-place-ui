import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listReviews } from '../../services/ReviewService';
import { Button } from 'primereact/button';
import EditReviewForm from './EditReviews';
import  '../css/AdminPanel.css';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await listReviews();
      setReviews(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const updateReviews = async () => {
    try {
      setLoading(true);
      const response = await listReviews();
      setReviews(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleEdit = (reviewId) => {
    const selectedReview = reviews.find(review => review.reviewId === reviewId);
    setSelectedReview(selectedReview);
    console.log("selectedReview", selectedReview.reviewId);
  };

  const editButtonTemplate = (rowData) => {
    return (
      <Button label="Edit" className="buttonAdmin" onClick={() => handleEdit(rowData.reviewId)} />
    );
  };

  const cancelEdit = () => {
    setSelectedReview(null);
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <h2 className="text-white" style={{textAlign: 'center'}}>View Reviews</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!selectedReview ? (
        <div className="p-datatable-custom">
          <DataTable value={reviews} sortMode="multiple" className="p-datatable-striped">
            <Column field="reviewId" header="ID" className="text-white" sortable style={{ width: '10%' }} />
            <Column field="user.username" header="User" className="text-white" sortable />
            <Column field="movie.title" header="Movie" className="text-white" sortable />
            <Column field="ratingScore" header="Rating" className="text-white" sortable />
            <Column field="title" header="Title" className="text-white" sortable />
            <Column field="comment" header="Comment" className="text-white" sortable />
            <Column field="date" header="Date" className="text-white" sortable body={(rowData) => formatDate(rowData.date)} />
            <Column field="agreeCount" header="Agree" className="text-white" sortable />
            <Column field="disagreeCount" header="Disagree" className="text-white" sortable />
            <Column header="Actions" body={editButtonTemplate} style={{ textAlign: 'center', width: '10%' }} />
          </DataTable>
        </div>
      ) : (
        <EditReviewForm reviewId={selectedReview.reviewId} cancelEdit={cancelEdit} updateReviews={updateReviews} />
      )}
    </div>
  );
};

export default ViewReviews;
