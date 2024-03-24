"use client";

import WinningsPanel from "@components/WinningsPanel";
import ReceiptsPanel from "@components/ReceiptsPanel";
import { useRouter, redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const [user, setUser] = useState(null)
  const { data: session } = useSession();
  const router = useRouter();
  if(session){
    redirect('/')
  }
  
  const fetchUserData = async () => {
    if (session && session.user && session.user.id) {
      const response = await fetch(`/api/user/${session?.user.id}`);
      const data = await response.json();
      setUser(data);
    }
  };

  

  useEffect(() => {
    fetchUserData();
    }, [session]); 

  return (
    <div>
    <section className="bg-orange-600 flex-center flex-col w-screen p-8">
    <h1 className=" text-white head_text text-center py-4 ">Welcome to your Profile Page</h1>
    <p className="desc text-center">On this page every user can find and claim all their rewards from raffles that they have won, additionally they are able to see their receipts/tickets and do adjustments</p>
    </section>

    {user != null &&(
      <div>
        <WinningsPanel user={user} fetchUserData={fetchUserData}/>
        <ReceiptsPanel user={user} fetchUserData={fetchUserData}/>
      </div>
    )}

    </div>
  )
}

export default MyProfile