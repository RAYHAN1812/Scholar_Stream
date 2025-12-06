import React, { useEffect, useState } from 'react';
import { useScholarships } from '../context/ScholarshipContext';
import ScholarshipCard from '../components/ScholarshipCard';

export default function Scholarships() {
  const { scholarships, fetchScholarships, loading } = useScholarships();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ country: '', category: '', subject: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async () => {
    const params = {
      q: query || undefined,
      country: filters.country || undefined,
      scholarshipCategory: filters.category || undefined,
      subjectCategory: filters.subject || undefined,
      page,
      limit: 12,
      sortBy: 'scholarshipPostDate',
      sortOrder: 'desc',
    };

    const data = await fetchScholarships(params);

    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  };

  // reload when page changes
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="container mx-auto p-4">

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="relative flex-1 w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by scholarship, university, degree"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark"
          />
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
            search
          </span>
        </div>
        <button onClick={load} className="btn btn-primary px-6 py-3">
          Search
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary font-semibold border border-primary/20">
          <span className="material-icons text-lg">filter_list</span>
          Filters
        </button>
        <button className="flex-shrink-0 px-4 py-2 rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark font-medium text-text-secondary-light dark:text-text-secondary-dark">
          Degree
        </button>
        <button className="flex-shrink-0 px-4 py-2 rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark font-medium text-text-secondary-light dark:text-text-secondary-dark">
          Country
        </button>
        <button className="flex-shrink-0 px-4 py-2 rounded-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark font-medium text-text-secondary-light dark:text-text-secondary-dark">
          Category
        </button>
      </div>

      {/* Scholarships Grid */}
      {loading ? (
        // Skeleton loading UI
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-card-light dark:bg-card-dark rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-40 w-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="p-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Loaded UI
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {scholarships.map((sch) => (
            <ScholarshipCard key={sch._id} sch={sch} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="btn btn-ghost"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <div className="text-sm font-medium">
          Page {page} of {totalPages}
        </div>

        <button
          className="btn btn-ghost"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
