import React, { useEffect, useState } from "react";
import axios from "axios";

const MyItems = () => {
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalClaims: 0,
    pendingClaims: 0,
    approvedClaims: 0,
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [claimsRes, statsRes] = await Promise.all([
        axios.get("http://localhost:9898/api/v1/claims", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:9898/api/v1/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setClaims(claimsRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleStatusUpdate = async (claimId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:9898/api/v1/claims/${claimId}/update`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchData();
    } catch (err) {
      console.error("Error updating claim status:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f0f4f8] text-[#1a2a3a]">
      {/* Sidebar */}
     

      {/* Main */}
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-4">My Items</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Items</h3>
            <p className="text-3xl text-orange-500 font-bold">{stats.totalItems}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Claims</h3>
            <p className="text-3xl text-orange-500 font-bold">{stats.totalClaims}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Pending</h3>
            <p className="text-3xl text-orange-500 font-bold">{stats.pendingClaims}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Approved</h3>
            <p className="text-3xl text-orange-500 font-bold">{stats.approvedClaims}</p>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Incoming Claims</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="py-2 pr-4">Item</th>
                <th className="py-2 pr-4">Claimant Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="border-b">
                  <td className="py-2 pr-4">{claim.itemId?.itemType || "N/A"}</td>
                  <td className="py-2 pr-4">{claim.claimantName}</td>
                  <td className="py-2 pr-4">{claim.claimantEmail}</td>
                  <td className="py-2 pr-4 capitalize">{claim.status}</td>
                  <td className="py-2 pr-4 space-x-2">
                    {claim.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(claim._id, "approved")}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(claim._id, "rejected")}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm italic text-gray-500">Already {claim.status}</span>
                    )}
                  </td>
                </tr>
              ))}
              {claims.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400">
                    No claims submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyItems;
