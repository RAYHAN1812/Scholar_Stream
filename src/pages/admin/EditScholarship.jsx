// src/pages/admin/EditScholarship.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";

const EditScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosSecure.get(`/scholarships/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/scholarships/${id}`, form);
      navigate("/admin/manage-scholarships");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Edit Scholarship</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <input name="name" value={form.name || ""} onChange={handleChange} />
        <input name="university" value={form.university || ""} onChange={handleChange} />
        {/* include the rest of fields similarly */}
        <div className="col-span-2">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditScholarship;
