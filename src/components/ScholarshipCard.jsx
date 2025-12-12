import React from 'react';
import { Link } from 'react-router-dom';

export default function ScholarshipCard({ sch }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <img
        src={sch.universityImage}
        alt={sch.universityName}
        className="w-full h-36 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{sch.scholarshipName}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-1">
        {sch.universityName}, {sch.universityCity}, {sch.universityCountry}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-300 mb-1">
        Degree: {sch.degree} | Category: {sch.scholarshipCategory}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-300 mb-4">
        Deadline: {new Date(sch.applicationDeadline).toLocaleDateString()}
      </p>
      <Link
        to={`/scholarship/${sch._id}`}
        className="inline-block bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
