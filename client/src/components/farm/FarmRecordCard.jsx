import React from 'react';

function FarmRecordCard({ record, handleEdit, handleDelete }) {
  return (
    <div className="farm-record-item">
      <h3>{record.crop_name || record.cropName}</h3>

      <p>
        <strong>Land:</strong> {record.land_size || record.landSize}
      </p>

      <p>
        <strong>Season:</strong> {record.season}
      </p>

      <p>
        <strong>Expense:</strong> {record.expense}
      </p>

      <p>
        <strong>Expected Yield:</strong> {record.expected_yield || record.expectedYield}
      </p>

      {/* Buttons correctly placed inside the farm-actions div */}
      <div className="farm-actions">
        <button 
          type="button" 
          onClick={() => handleEdit(record)}
        >
          Edit
        </button>

        <button 
          type="button" 
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FarmRecordCard;