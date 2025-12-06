import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import ScholarshipCard from '../components/ScholarshipCard';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/users/wishlist'); // expected endpoint
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadWishlist(); }, []);

  if (loading) return <div className="flex justify-center"><div className="spinner" /></div>;
  if (!items.length) return <div>No saved scholarships yet.</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(s => <ScholarshipCard key={s._id} sch={s} />)}
      </div>
    </div>
  );
}
