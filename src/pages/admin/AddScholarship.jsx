import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const initialForm = {
  scholarshipName: "",
  universityName: "",
  universityImage: "",
  universityCountry: "",
  universityCity: "",
  universityWorldRank: "",
  subjectCategory: "",
  scholarshipCategory: "",
  degree: "",
  tuitionFees: "",
  applicationFees: "",
  serviceCharge: "",
  applicationDeadline: "",
  postedUserEmail: "",
};

const AddScholarship = () => {
  const [form, setForm] = useState(initialForm);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/scholarships", form);
      console.log("Scholarship added:", res.data);
      navigate("/dashboard/manage-scholarships");
    } catch (err) {
      console.error("Add scholarship error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add scholarship");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="scholarshipName"
          placeholder="Scholarship Name"
          value={form.scholarshipName}
          onChange={handleChange}
          required
        />
        <input
          name="universityName"
          placeholder="University Name"
          value={form.universityName}
          onChange={handleChange}
          required
        />
        <input
          name="universityImage"
          placeholder="University Image URL"
          value={form.universityImage}
          onChange={handleChange}
        />
        <input
          name="universityCountry"
          placeholder="Country"
          value={form.universityCountry}
          onChange={handleChange}
        />
        <input
          name="universityCity"
          placeholder="City"
          value={form.universityCity}
          onChange={handleChange}
        />
        <input
          name="universityWorldRank"
          placeholder="World Rank"
          type="number"
          value={form.universityWorldRank}
          onChange={handleChange}
        />
        <input
          name="subjectCategory"
          placeholder="Subject Category"
          value={form.subjectCategory}
          onChange={handleChange}
        />

        <select
          name="scholarshipCategory"
          value={form.scholarshipCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Scholarship Category</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        <select
          name="degree"
          value={form.degree}
          onChange={handleChange}
          required
        >
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <input
          name="tuitionFees"
          placeholder="Tuition Fees"
          type="number"
          value={form.tuitionFees}
          onChange={handleChange}
        />
        <input
          name="applicationFees"
          placeholder="Application Fees"
          type="number"
          value={form.applicationFees}
          onChange={handleChange}
        />
        <input
          name="serviceCharge"
          placeholder="Service Charge"
          type="number"
          value={form.serviceCharge}
          onChange={handleChange}
        />
        <input
          name="applicationDeadline"
          type="date"
          value={form.applicationDeadline}
          onChange={handleChange}
          required
        />
        <input
          name="postedUserEmail"
          placeholder="Your Email"
          type="email"
          value={form.postedUserEmail}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="col-span-2 bg-indigo-600 text-white py-2 rounded"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
