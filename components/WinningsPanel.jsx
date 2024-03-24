"use client";

import { useSession } from "next-auth/react";
import { useState } from 'react';

const WinningsPanel = ({ user, fetchUserData }) => {
    const [currentPage, setCurrentPage] = useState('unclaimed');
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClaimReward = async (winning) => {
        try {
            const winnings_response = await fetch(`/api/winnings`, {
                method: "PATCH",
                body: JSON.stringify({
                    userId: user._id,
                    receiptId: winning._id,
                }),
            });

            if(winnings_response.ok){
                try {
                    const response = await fetch(`/api/user/${user._id}/claim_winnings`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            userId: user._id,
                            receiptId: winning._id,
                          }),
                      });
                    if(response.ok){
                        fetchUserData();
                    }
              
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
        

        
    }
  
    return (
        <div className="winnings-panel m-5 border border-gray-300 rounded p-5">
            <div className="py-2 text-2xl font-bold text-center rounded">Winnings Panel</div>
            <div className="flex space-x-4 m-2">
                <button onClick={() => handlePageChange('unclaimed')} className={`py-2 px-4 rounded ${currentPage === 'unclaimed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>Unclaimed</button>
                <button onClick={() => handlePageChange('claimed')} className={`py-2 px-4 rounded ${currentPage === 'claimed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>Claimed</button>
            </div>
            <div>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="panel-header">Index</th>
                            <th className="panel-header">Prize</th>
                            <th className="panel-header">Draw Date</th>
                            <th className="panel-header">Receipt</th>
                            <th className="panel-header">Claim</th>
                        </tr>
                    </thead>
                    <tbody className=" bg-orange-50">
                        {user?.winning_receipts.map((winning, index) => (
                            (currentPage === 'claimed' && winning.is_claimed) || (currentPage === 'unclaimed' && !winning.is_claimed) ? (
                                <tr key={index}>
                                    <td className="panel-body">{index + 1}</td>
                                    <td className="panel-body">{winning.winning_prize}</td>
                                    <td className="panel-body">{new Date(winning.draw_date).toLocaleString()}</td>
                                    <td className="panel-body">{winning._id}</td>
                                    <td className="panel-body">
                                        {currentPage === 'claimed' ? (
                                            <button className="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>Claimed</button>
                                        ) : (
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClaimReward(winning)}>Claim</button>
                                        )}
                                    </td>
                                </tr>
                            ) : null
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WinningsPanel