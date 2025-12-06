import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import ScholarshipCard from './ScholarshipCard';

export default function RecommendedScholarships({ category, excludeId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    axiosClient.get('/scholarships', { params: { category, limit: 4 } })
      .then(({ data }) => {
        const filtered = data.filter(s => s._id !== excludeId).slice(0, 4);
        setItems(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, excludeId]);

  if (loading) return <div className="py-4"><div className="spinner" /></div>;
  if (!items.length) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">You may also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(s => <ScholarshipCard key={s._id} sch={s} />)}
      </div>
    </div>
  );
}
