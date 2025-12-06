import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ScholarshipCard({ sch }) {
  return (
    <div className="card card-compact bg-base-100 shadow-md">
      <figure><img src={sch.universityImage || '/placeholder.jpg'} alt={sch.scholarshipName} className="h-40 w-full object-cover" /></figure>
      <div className="card-body">
        <h2 className="card-title">{sch.scholarshipName}</h2>
        <p className="text-sm text-gray-600">{sch.universityName} • {sch.universityCity}, {sch.universityCountry}</p>
        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="text-sm">Category: <strong>{sch.scholarshipCategory}</strong></div>
            <div className="text-sm">Application Fee: <strong>{sch.applicationFees || 'Free'}</strong></div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Deadline</div>
            <div className="text-sm">{dayjs(sch.applicationDeadline).format('MMM D, YYYY')}</div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/scholarships/${sch._id}`} className="btn btn-primary btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
}
