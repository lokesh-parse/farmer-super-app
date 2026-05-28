function FarmSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <input
      type="text"
      placeholder="Search crop..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="search-input"
    />
  );
}

export default FarmSearch;