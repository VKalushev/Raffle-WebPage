"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({  }) => {
    const { data: session } = useSession();

    return (
        <div className="prompt_card">
            <header className="raffle-header">
                <span className="reward-box">
                    Prize: Electronics Bundle
                </span>
                <h3 className="p-14 text-center text-xl">
                    Draw Date: March 10, 2024
                </h3>
            </header>

            <article className="text-sm text-center border-b-2 border-b-black ml-5 mr-5 p-2">
                <span className="p-2">
                    Tickets: 800
                </span>
                <span className="p-2">
                    Participants: 400
                </span>
            </article>
            <footer>
                <article>
                    <p>$15 per ticket</p>
                </article>
                <article>
                    <button>Enter Raffle</button>
                </article>
            </footer>
        </div>
    )
};

export default PromptCard;
