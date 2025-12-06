import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const ScholarshipContext = createContext();

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScholarships = async (query = {}) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/scholarships', { params: query });

      // FIX: Save only the array
      setScholarships(data.scholarships || []);

      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScholarship = async (id) => {
    const { data } = await axiosClient.get(`/scholarships/${id}`);
    return data;
  };

  // Load initial list (page 1)
  useEffect(() => {
    fetchScholarships({ page: 1, limit: 12 });
  }, []);

  return (
    <ScholarshipContext.Provider value={{ scholarships, loading, fetchScholarships, getScholarship }}>
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarships() {
  return useContext(ScholarshipContext);
}
