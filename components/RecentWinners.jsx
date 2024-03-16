"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RaffleCard from "./RaffleCard";
import CreateRaffle from "./CreateRaffle";

const RecentWinners = () => {
    const [allRaffles, setAllRaffles] = useState([]);
    const { data: session } = useSession();
  return (
    <div>RecentWinners</div>
  )
}

export default RecentWinners