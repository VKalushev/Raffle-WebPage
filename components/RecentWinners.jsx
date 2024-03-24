"use client";

import React,{ useState, useEffect } from "react";

const RecentWinners = ({ allRaffles, session }) => {
    const [winners, setWinners] = useState([]);

    const handleRecentWinners = () => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);

        const recentWinners = allRaffles.filter(raffle => {
            return new Date(raffle.draw_date) >= sevenDaysAgo && raffle.archived;
        }).map(raffle => {
            return {
                username: formatUsername(raffle.winner),
                host: raffle.ownerName,
                prize: raffle.winning_prize,
                participants: raffle.participants,
                drawDate: formatDate(raffle.draw_date)
            }
        }).sort((a,b) => {
            return new Date(b.drawDate) - new Date(a.drawDate)
        });
        setWinners(recentWinners)
    };
    const formatUsername = (username) => {
        if(session){
            // console.log(`${session.user.name} - ${username} : ${session.user.name === username}`)
            if(session.user.name === username){
                return `${username} (You)`
            }
        }
        return `${username}`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    useEffect(() => {
        if (allRaffles.length > 0) {
          handleRecentWinners();
        }
    }, [allRaffles]);
    

    return (
        <div className=" mx-20">
            {winners.length > 0 &&(
                <div className="leaderboard-image border border-gray-300 rounded p-4 m-10 w-auto overflow-auto max-h-96">
                    <div className="font-bold text-lg mb-3 text-white">Winners From the last 7 days</div>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="bg-gray-400 p-3 rounded-md">Username</div>
                        <div className="bg-gray-400 p-3 rounded-md">Host</div>
                        <div className="bg-gray-400 p-3 rounded-md">Prize</div>
                        <div className="bg-gray-400 p-3 rounded-md">Out of Total Participants</div>
                        <div className="bg-gray-400 p-3 rounded-md">Draw Date</div>
                    {winners.map((winner, index) => (
                        <React.Fragment key={index}>
                        <div className="bg-white p-3 rounded-md">{winner.username}</div>
                        <div className="bg-white p-3 rounded-md">{winner.host}</div>
                        <div className="bg-white p-3 rounded-md">{winner.prize}</div>
                        <div className="bg-white p-3 rounded-md">{winner.participants}</div>
                        <div className="bg-white p-3 rounded-md">{winner.drawDate}</div>
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            )}

    </div>
    );
};

export default RecentWinners;
