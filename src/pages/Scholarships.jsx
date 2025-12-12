import React, { useEffect, useState } from 'react';
import { useScholarships } from '../context/ScholarshipContext';
import ScholarshipCard from '../components/ScholarshipCard';

export default function Scholarships() {
  const { fetchScholarships, scholarships, loading, totalPages } = useScholarships();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ degree: '', scholarshipCategory: '' });
  const [page, setPage] = useState(1);

  const loadScholarships = async () => {
    await fetchScholarships({
      q: query || undefined,
      degree: filters.degree || undefined,
      scholarshipCategory: filters.scholarshipCategory || undefined,
      page,
      limit: 12,
    });
  };

  useEffect(() => {
    loadScholarships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  const handleSearch = () => {
    setPage(1);
    loadScholarships();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search */}
      <div className="flex gap-4 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search scholarships or universities..."
          className="border p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary px-4">Search</button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select value={filters.degree} onChange={e => handleFilterChange('degree', e.target.value)}>
          <option value="">All Degrees</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <select value={filters.scholarshipCategory} onChange={e => handleFilterChange('scholarshipCategory', e.target.value)}>
          <option value="">All Categories</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>
      </div>

      {/* Scholarships Grid */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : scholarships.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No scholarships found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scholarships.map(sch => <ScholarshipCard key={sch._id} sch={sch} />)}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
