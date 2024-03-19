"use client";

import { useSession } from "next-auth/react";
import { useState,useEffect } from 'react';

const ReceiptsPanel = ({user}) => {
  const [refundAmounts, setRefundAmounts] = useState(user?.receipts.map(() => 1));

  const handleRefundAmountChange = (e, index) => {
        const amount = parseInt(e.target.value);
        if (!isNaN(amount) && amount >= 1 && amount <= user.receipts[index].tickets.length) {
            const newRefundAmounts = [...refundAmounts];
            newRefundAmounts[index] = amount;
            setRefundAmounts(newRefundAmounts);
        }
  }

  const handleRefundReceipt = async (receipt,index) => {
      try {
        const response = await fetch(`/api/user/${user._id}/refund_tickets`, {
            method: "PATCH",
            body: JSON.stringify({
                userId: user._id,
                receiptId: receipt._id,
                amountToRefund: refundAmounts[index],
              }),
          });
        
        if(response.ok){
          const tickets = await response.json();
          const raffle_response = await fetch(`/api/raffles/${receipt.raffleId}/remove_tickets`, {
            method: "PATCH",
            body: JSON.stringify({
                userId: user._id,
                raffleId: receipt.raffleId,
                tickets: tickets,
              }),
          });
          if(raffle_response.ok){
            console.log("Fine")
          }
        }

        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="winnings-panel m-5 border border-gray-300 rounded p-5 mb-20">
        <div className="py-2 text-2xl font-bold text-center rounded">Active Receipts Panel</div>
        <div className="flex space-x-4 m-2">
            {/* <button onClick={() => handlePageChange('unclaimed')} className={`py-2 px-4 rounded ${currentPage === 'unclaimed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>Unclaimed</button> */}
            {/* <button onClick={() => handlePageChange('claimed')} className={`py-2 px-4 rounded ${currentPage === 'claimed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>Claimed</button> */}
        </div>
        <div>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="panel-header">Index</th>
                        <th className="panel-header">Prize</th>
                        <th className="panel-header">Draw Date</th>
                        <th className="panel-header">Receipt</th>
                        <th className="panel-header">Tickets Type</th>
                        <th className="panel-header">Amount of Tickets</th>
                        <th className="panel-header">Refund amount</th>
                        <th className="panel-header">Refund</th>
                    </tr>
                </thead>
                <tbody className=" bg-orange-50">
                  {user?.receipts.map((receipt, index) => (
                    receipt.tickets && receipt.tickets.length > 0 && (
                      <tr key={index}>
                          <td className="panel-body">{index + 1}</td>
                          <td className="panel-body">{receipt.winning_prize}</td>
                          <td className="panel-body">{new Date(receipt.draw_date).toLocaleString()}</td>
                          <td className="panel-body">{receipt._id}</td>
                          <td className="panel-body">
                              {receipt.tickets[0]?.luckyNumber === undefined ? (
                                  <span>Random Tickets</span>
                              ) : (
                                  <span>Random Tickets</span>
                              )}
                          </td>
                          <td className="panel-body">{receipt.tickets.length}</td>
                          <td className="panel-body">
                              {receipt?.tickets[0]?.luckyNumber === undefined ? (
                                  <input 
                                      type="number" 
                                      value={refundAmounts[index]} 
                                      onChange={(e) => handleRefundAmountChange(e, index)} 
                                      className="border border-gray-400 rounded p-1 focus:outline-none focus:border-blue-500"
                                      min="1"
                                      max={receipt.tickets.length}
                                  />
                              ) : (
                                  <input 
                                      type="number" 
                                      value={refundAmounts[index]} 
                                      className="border border-gray-400 rounded p-1 focus:outline-none focus:border-blue-500"
                                      disabled
                                  />
                              )}
                          </td>
                          <td className="panel-body">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRefundReceipt(receipt,index)}>Claim</button>
                          </td>
                      </tr>
                    )
                  ))}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default ReceiptsPanel