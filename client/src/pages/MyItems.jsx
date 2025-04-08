import React, { useEffect, useState } from "react";
import axios from "axios";

const MyItems = () => {
  const [itemsWithClaims, setItemsWithClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItemsAndClaims = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const itemsRes = await axios.get("http://localhost:9898/api/v1/foundItems/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const myItems = itemsRes.data.data;
      console.log("Fetched items:", myItems);

      const claimsPromises = myItems.map((item) =>
        axios.get(`http://localhost:9898/api/v1/claims/${item._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      const claimsResponses = await Promise.all(claimsPromises);
      console.log("Claims responses:", claimsResponses);

      const mergedData = myItems.map((item, index) => ({
        ...item,
        claims: claimsResponses[index].data.data,
      }));

      console.log("Merged items with claims:", mergedData);
      setItemsWithClaims(mergedData);
    } catch (err) {
      console.error("Error fetching items/claims:", err);
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered: Fetching items and claims...");
    fetchItemsAndClaims();
  }, []);

  

  const handleStatusUpdate = async (claimId, action) => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.post(
        `http://localhost:9898/api/v1/claims/${action}/${claimId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert(`Claim ${action}ed successfully!`);
      fetchItemsAndClaims(); // Refresh data
    } catch (err) {
      console.error(`Error ${action}ing claim:`, err);
      alert(`Failed to ${action} claim.`);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-[#f0f4f8] text-[#1a2a3a]">
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-4">My Listed Items & Claims</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          itemsWithClaims.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-orange-600">{item.itemType}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-400">
                  Posted on: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Incoming Claims</h3>
                {item.claims.length > 0 ? (
                  <table className="w-full text-left border-t">
                    <thead>
                      <tr className="text-sm text-gray-600">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Email</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.claims.map((claim) => (
                        <tr key={claim._id} className="border-t">
                          <td className="py-2 pr-4">{claim.claimantName}</td>
                          <td className="py-2 pr-4">{claim.claimantEmail}</td>
                          <td className="py-2 pr-4 capitalize">{claim.status}</td>
                          <td className="py-2 pr-4 space-x-2">
                            {claim.status === "pending" ? (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(claim._id, "approve")}
                                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(claim._id, "reject")}
                                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="text-sm italic text-gray-500">
                                Already {claim.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-500 italic">No claims for this item yet.</p>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default MyItems;
