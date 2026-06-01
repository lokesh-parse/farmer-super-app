import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getProfile, saveProfile } from "../../services/profileService";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    landSize: "",
    mainCrop: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile();

      setProfile({
        name: data.name || "",
        phone: data.phone || "",
        village: data.village || "",
        district: data.district || "",
        state: data.state || "",
        landSize: data.land_size || "",
        mainCrop: data.main_crop || "",
      });
    }

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await saveProfile(profile);
    setMessage("Profile saved successfully");
  };

  return (
    <div className="profile-page">
      <PageHeader
        title="Farmer Profile"
        subtitle="Manage farmer and farm details."
      />

      <div className="profile-card">
        <form className="profile-form" onSubmit={handleSave}>
          <input name="name" placeholder="Farmer Name" value={profile.name} onChange={handleChange} />

          <input name="phone" placeholder="Phone Number" value={profile.phone} onChange={handleChange} />

          <input name="village" placeholder="Village" value={profile.village} onChange={handleChange} />

          <input name="district" placeholder="District" value={profile.district} onChange={handleChange} />

          <input name="state" placeholder="State" value={profile.state} onChange={handleChange} />

          <input name="landSize" placeholder="Land Size" value={profile.landSize} onChange={handleChange} />

          <input name="mainCrop" placeholder="Main Crop" value={profile.mainCrop} onChange={handleChange} />

          <button type="submit">Save Profile</button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;