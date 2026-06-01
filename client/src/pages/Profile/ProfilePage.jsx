import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    phone: "",
    landSize: "",
    mainCrop: "",
    soilType: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("farmerProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("farmerProfile", JSON.stringify(profile));
    alert("Profile saved successfully");
  };

  return (
    <div className="profile-page">
      <PageHeader
        title="Farmer Profile"
        subtitle="Manage farmer and farm details."
      />

      <div className="profile-card">
        <form className="profile-form" onSubmit={handleSave}>
          <input
            name="name"
            placeholder="Farmer Name"
            value={profile.name}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location / Village"
            value={profile.location}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
          />

          <input
            name="landSize"
            placeholder="Land Size"
            value={profile.landSize}
            onChange={handleChange}
          />

          <input
            name="mainCrop"
            placeholder="Main Crop"
            value={profile.mainCrop}
            onChange={handleChange}
          />

          <input
            name="soilType"
            placeholder="Soil Type"
            value={profile.soilType}
            onChange={handleChange}
          />

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;