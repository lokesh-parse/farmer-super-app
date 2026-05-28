function FarmForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  editingId,
  message,
}) {
  return (
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

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editingId ? "Update Record" : "Save Record"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default FarmForm;