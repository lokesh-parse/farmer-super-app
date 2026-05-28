function FarmStats({ records }) {
  const totalRecords = records.length;

  const totalExpense = records.reduce(
    (sum, record) =>
      sum + Number(record.expense || 0),
    0
  );

  const crops = records.map(
    (record) =>
      record.crop_name || record.cropName
  );

  const mostUsedCrop =
    crops.length > 0
      ? crops.sort(
          (a, b) =>
            crops.filter((v) => v === a).length -
            crops.filter((v) => v === b).length
        ).pop()
      : "N/A";

  return (
    <div className="farm-stats-grid">

      <div className="farm-stat-card">
        <h3>Total Records</h3>
        <p>{totalRecords}</p>
      </div>

      <div className="farm-stat-card">
        <h3>Total Expense</h3>
        <p>₹ {totalExpense}</p>
      </div>

      <div className="farm-stat-card">
        <h3>Top Crop</h3>
        <p>{mostUsedCrop}</p>
      </div>

    </div>
  );
}

export default FarmStats;