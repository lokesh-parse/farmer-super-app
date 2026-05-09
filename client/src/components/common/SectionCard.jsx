function SectionCard({ title, children, action }) {
  return (
    <div className="card">
      <div className="section-card-header">
        <h3>{title}</h3>
        {action ? <div>{action}</div> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default SectionCard;