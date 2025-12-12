// src/context/ScholarshipContext.jsx
import React, { createContext, useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ScholarshipContext = createContext();

export const ScholarshipProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch scholarships with filters and pagination
  const fetchScholarships = async ({ q, degree, scholarshipCategory, page = 1, limit = 12 }) => {
    setLoading(true);
    setError(null);

    try {
      const params = { page, limit };
      if (q) params.q = q;
      if (degree) params.degree = degree;
      if (scholarshipCategory) params.scholarshipCategory = scholarshipCategory;

      const res = await axiosSecure.get("/scholarships", { params }); // <- Corrected API path
      setScholarships(res.data.scholarships || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch scholarships:", err);
      setError(err);
      setScholarships([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single scholarship by ID
  const fetchScholarshipById = async (id) => {
    try {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch scholarship by ID:", err);
      throw err;
    }
  };

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        loading,
        error,
        totalPages,
        fetchScholarships,
        fetchScholarshipById,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarships = () => useContext(ScholarshipContext);
