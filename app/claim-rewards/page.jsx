"use client";

import { useState } from 'react';

const ClaimRewardsPage = () => {
  const [receiptId, setReceiptId] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleClaim = async () => {
    try {
      const response = await fetch('/api/winnings', {
        method: 'PATCH',
        body: JSON.stringify({ receiptId }),
      });
      const {message, userId} = await response.json();
      console.log(message)
      if (response.ok) {
        setMessage(message);
        setMessageColor('text-green-600');

        if(userId){
          const delete_guest_response = await fetch(`/api/user/${userId}`, {
            method: "DELETE",
            body: JSON.stringify({
              userId: userId,
            }),
          });

          if(delete_guest_response.ok){
            console.log("Done");
          }
        }
      } else {
        setMessage(message);
        setMessageColor('text-red-600');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <section className="bg-orange-600 flex-center flex-col w-screen p-8">
        <h1 className="text-white head_text text-center py-4">Welcome to your Profile Page</h1>
        <p className="desc text-center">This page is so that Guest user's can claim their rewards by providing their receipt that was provided on the purchase of their tickets</p>
      </section>

      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <label className="block text-sm font-semibold mb-2">Enter Receipt ID:</label>
          <input
            type="text"
            value={receiptId}
            onChange={(e) => setReceiptId(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleClaim}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Claim
          </button>
          {message && (
            <p className={`mt-4 text-sm ${messageColor}`}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimRewardsPage;
