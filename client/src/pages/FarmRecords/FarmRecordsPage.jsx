import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getFarmRecords, addFarmRecord } from "../../services/farmService";

function FarmRecordsPage() {
  const [formData, setFormData] = useState({
    cropName: "",
    landSize: "",
    season: "",
    expense: "",
    expectedYield: "",
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const data = await getFarmRecords();
      setRecords(data);
    }

    loadRecords();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = await addFarmRecord(formData);

    setRecords((prev) => [newRecord, ...prev]);

    setFormData({
      cropName: "",
      landSize: "",
      season: "",
      expense: "",
      expectedYield: "",
    });
  };

  return (
    <div className="farm-records-page">
      <PageHeader
        title="Farm Records"
        subtitle="Save and track your crop and farm details."
      />

      <div className="farm-records-grid">
        <div className="farm-records-card">
          <h2>Add Record</h2>

          <form className="farm-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="cropName"
              placeholder="Crop Name"
              value={formData.cropName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="landSize"
              placeholder="Land Size (e.g. 2 acres)"
              value={formData.landSize}
              onChange={handleChange}
            />

            <input
              type="text"
              name="season"
              placeholder="Season (Rabi/Kharif)"
              value={formData.season}
              onChange={handleChange}
            />

            <input
              type="text"
              name="expense"
              placeholder="Expense"
              value={formData.expense}
              onChange={handleChange}
            />

            <input
              type="text"
              name="expectedYield"
              placeholder="Expected Yield"
              value={formData.expectedYield}
              onChange={handleChange}
            />

            <button type="submit">Save Record</button>
          </form>
        </div>

        <div className="farm-records-card">
          <h2>Saved Records</h2>

          <div className="farm-record-list">
            {records.length > 0 ? (
              records.map((record) => (
                <div key={record.id} className="farm-record-item">
                  <h3>{record.crop_name || record.cropName}</h3>
                  <p><strong>Land:</strong> {record.land_size || record.landSize}</p>
                  <p><strong>Season:</strong> {record.season}</p>
                  <p><strong>Expense:</strong> {record.expense}</p>
                  <p><strong>Expected Yield:</strong> {record.expected_yield || record.expectedYield}</p>
                </div>
              ))
            ) : (
              <p>No farm records added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmRecordsPage;