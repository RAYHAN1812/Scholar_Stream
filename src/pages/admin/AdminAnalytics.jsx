import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Analytics() {
  const axiosSecure = useAxiosSecure();
  const [analytics, setAnalytics] = useState({ users: [], scholarships: [], totals: {} });
  const { users, scholarships, totals } = analytics;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosSecure.get('/analytics');
        setAnalytics(res.data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700">Admin Analytics</h2>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-700">{totals.totalUsers || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Scholarships</h3>
          <p className="text-2xl font-bold text-indigo-700">{totals.totalScholarships || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Fees Collected</h3>
          <p className="text-2xl font-bold text-indigo-700">${totals.totalFeesCollected || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Roles Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">User Roles Distribution</h3>
          {users.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={users} dataKey="count" nameKey="role" cx="50%" cy="50%" outerRadius={100} label>
                  {users.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No user data available.</p>}
        </div>

        {/* Scholarship Categories Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Scholarship Categories</h3>
          {scholarships.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scholarships}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No scholarship data available.</p>}
        </div>
      </div>
    </div>
  );
}
