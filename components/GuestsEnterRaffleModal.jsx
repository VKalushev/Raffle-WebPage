"use client";

import { useState } from 'react';

const GuestsEnterRaffleModal = ({ isOpen, onClose, handleEnterRaffleButton, receipt }) => {
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const createGuestUser = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/user/create", {
            method: "POST",
            body: JSON.stringify({
                email: email,
            }),
          });

        const user = await response.json()

        handleEnterRaffleButton(e, user._id);
    }
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-96 p-6 rounded-lg shadow-lg z-50 relative">
          <button className="close-button absolute top-0 right-0 m-4" onClick={onClose}>X</button>
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Requred Information:</h2>
            <form onSubmit={createGuestUser}>
              <label htmlFor="guestEmail" className="text-lg">Enter your email:</label>
              <input 
                  id="guestEmail" 
                  type="email" 
                  className="w-full bg-gray-100 border border-gray-300 rounded p-2 mt-2" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Check Out as Guest</button>
            </form>
            {receipt && (
                <div>
                  <p className="text-lg mb-4">Your receipt ID is: {receipt._id}</p>
                  <p className="text-sm text-gray-500 mb-4">Please save your receipt id because it is used for claiming rewards</p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
};

export default GuestsEnterRaffleModal;