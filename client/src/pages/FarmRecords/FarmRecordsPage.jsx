import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import FarmForm from "../../components/farm/FarmForm";
import FarmRecordCard from "../../components/farm/FarmRecordCard";
import FarmSearch from "../../components/farm/FarmSearch";
import FarmStats from "../../components/dashboard/FarmStats";
import {
  getFarmRecords,
  addFarmRecord,
  deleteFarmRecord,
  updateFarmRecord,
} from "../../services/farmService";

function FarmRecordsPage() {
  const [formData, setFormData] = useState({
    cropName: "",
    landSize: "",
    season: "",
    expense: "",
    expectedYield: "",
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Search and season filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("All");

  // Step 1: Loading aur message states add kiye gaye hain
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleEdit = (record) => {
    setEditingId(record.id);

    setFormData({
      cropName: record.crop_name || record.cropName,
      landSize: record.land_size || record.landSize,
      season: record.season,
      expense: record.expense,
      expectedYield: record.expected_yield || record.expectedYield,
    });
    
    // Edit click hone par previous message clear kar dete hain
    setMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 2: Form validation check
    if (!formData.cropName || !formData.landSize || !formData.season) {
      setMessage("Please fill crop name, land size, and season.");
      return;
    }

    // Processing shuru
    setLoading(true);
    setMessage("");

    if (editingId) {
      const updatedRecord = await updateFarmRecord(editingId, formData);

      setRecords((prev) =>
        prev.map((record) =>
          record.id === editingId ? updatedRecord : record
        )
      );

      setEditingId(null);
    } else {
      const newRecord = await addFarmRecord(formData);
      setRecords((prev) => [newRecord, ...prev]);
    }

    setFormData({
      cropName: "",
      landSize: "",
      season: "",
      expense: "",
      expectedYield: "",
    });

    // Step 2: Success hone par loading off aur message set
    setLoading(false);
    setMessage("Record saved successfully.");
  };

  const handleDelete = async (id) => {
    // Step 5: Delete karne se pehle confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    await deleteFarmRecord(id);
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  // Filter logic
  const filteredRecords = records.filter((record) => {
    const cropName = record.crop_name || record.cropName || "";
    const season = record.season || "";

    const matchesSearch = cropName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesSeason =
      seasonFilter === "All" || season.toLowerCase() === seasonFilter.toLowerCase();

    return matchesSearch && matchesSeason;
  });

  return (
    <div className="farm-records-page">
      <PageHeader
        title="Farm Records"
        subtitle="Save and track your crop and farm details."
      />

      <div className="farm-records-grid">
        <div className="farm-records-card">
          <h2>{editingId ? "Edit Record" : "Add Record"}</h2>

          <FarmForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            editingId={editingId}
            message={message}
          />
        </div>
         
        <div className="farm-records-card">
          <FarmStats records={records} />
          <h2>Saved Records</h2>
          
          <FarmSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="farm-record-list">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <FarmRecordCard
                  key={record.id}
                  record={record}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p>No farm records found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmRecordsPage;