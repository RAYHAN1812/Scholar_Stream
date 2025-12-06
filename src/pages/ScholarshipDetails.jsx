import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import RecommendedScholarships from '../components/RecommendedScholarships';
import { useAuth } from '../context/AuthContext';

export default function ScholarshipDetails() {
  const { id } = useParams();
  const [sch, setSch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/scholarships/${id}`)
      .then(({ data }) => setSch(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-gray-200"></div></div>;
  if (!sch) return <div className="text-center py-10 text-gray-500">Scholarship not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="md:col-span-2 space-y-6">
        <img src={sch.universityImage} alt={sch.scholarshipName} className="w-full h-64 object-cover rounded-lg shadow-md" />
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">{sch.scholarshipName}</h1>
        <p className="text-gray-600 dark:text-gray-400">{sch.universityName} • {sch.universityCity}, {sch.universityCountry}</p>

        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{sch.description}</p>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Reviews</h3>
          {/* Placeholder for Reviews */}
          <p className="text-gray-500 text-sm">Reviews will appear here once available.</p>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4 p-4 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
        <div className="flex justify-between">
          <div className="text-sm font-medium">Application Fee</div>
          <div className="text-lg font-bold">{sch.applicationFees || 'Free'}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm font-medium">Deadline</div>
          <div className="text-sm">{new Date(sch.applicationDeadline).toDateString()}</div>
        </div>
        <button
          className="w-full bg-primary text-white py-3 rounded-md hover:opacity-90 active:scale-95 transition-all duration-150"
          onClick={() => {
            if (!user) return navigate('/login', { state: { from: `/scholarships/${id}` }});
            navigate(`/checkout/${sch._id}`);
          }}
        >
          Apply for Scholarship
        </button>

        <div className="mt-4">
          <RecommendedScholarships category={sch.subjectCategory || sch.scholarshipCategory} excludeId={sch._id} />
        </div>
      </aside>
    </div>
  );
}
