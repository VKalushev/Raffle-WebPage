"use client";

import CreateRaffle from "@components/CreateRaffle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

const page = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const raffleParam = searchParams.get("raffle");
  const raffle = JSON.parse(raffleParam);
  console.log(raffle)

  const router = useRouter();

  const extractIdFromURL = () => {
    const parts = pathName.split('/');
    return parts[parts.length - 2];
  };
  return (
    <div>PAGE FOR ROULETTE?</div>
  )
}

export default page