"use client";

import { useState } from 'react';

const RefundReceiptsPage = () => {
  const [receiptId, setReceiptId] = useState('');
  const [refundAmount, setRefundAmount] = useState(1);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [showRefundInput, setShowRefundInput] = useState(false);
  const [receiptLength, setReceiptLength] = useState(0);
  const [user, setUser] = useState(null);

  const handleRefundAmountChange = (e) => {
    const amount = parseInt(e.target.value);
    if (!isNaN(amount) && amount >= 1 && amount <= receiptLength) {
      setRefundAmount(amount);
    }
  }
  

  const handleRefundReceipt = async () => {
    try {
      const receipt_response = await fetch(`/api/receipt/${receiptId}`, {
        method: "GET",
      });

      if(receipt_response.ok){
        const response_user = await receipt_response.json();
        setUser(response_user);

        if(response_user.username != "guest") {
          setMessage("Please log into your account in order to refund this receipt");
          setMessageColor('text-red-600');
        } else {
          setReceiptLength(response_user.receipts[0].tickets.length);
          setShowRefundInput(true);
          setMessage('');
          setMessageColor('');
        }
      } else {
        setMessage("An error occurred. Please try again later.");
        setMessageColor('text-red-600');
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleRefundTickets = async () => {
    try {
      const response = await fetch(`/api/user/${user._id}/refund_tickets`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: user._id,
          receiptId: receiptId,
          amountToRefund: refundAmount,
        }),
      });

      if(response.ok){
        const tickets = await response.json();
        const raffle_response = await fetch(`/api/raffles/${user.receipts[0].raffleId}/remove_tickets`, {
          method: "PATCH",
          body: JSON.stringify({
            userId: user._id,
            raffleId: user.receipts[0].raffleId,
            tickets: tickets,
          }),
        });

        if(raffle_response.ok){
          setReceiptLength(receiptLength - refundAmount)
          setMessage("Tickets refunded successfully.");
          setMessageColor('text-green-600');
        } else {
          setMessage("Failed to refund tickets.");
          setMessageColor('text-red-600');
        }
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again later.");
      setMessageColor('text-red-600');
    }
  }

  return (
    <div>
      <section className="bg-orange-600 flex-center flex-col w-screen p-8">
        <h1 className="text-white head_text text-center py-4">Welcome to your Refund Receipt Page</h1>
        <p className="desc text-center">This page allows guest users to refund their tickets or some amount of them by using their receipt id.</p>
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
            onClick={handleRefundReceipt}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refund
          </button>

          {showRefundInput && (
            <div>
              <p className="text-lg mt-4">Number of Tickets in Receipt: {receiptLength}</p>
              <label className="block text-sm font-semibold mt-2">Enter Number of Tickets to Refund:</label>
              <input
                type="number"
                value={refundAmount}
                min="1"
                max={receiptLength}
                onChange={(e) => handleRefundAmountChange(e)}
                className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleRefundTickets}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Refund Tickets
              </button>
            </div>
          )}
          {message && (
            <p className={`mt-4 text-sm ${messageColor}`}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefundReceiptsPage;
