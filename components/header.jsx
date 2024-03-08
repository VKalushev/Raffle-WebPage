"use client";

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect} from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Header = () => {
    const isUserLoggedIn = true;





  return (
    <header>
        <article className="logo-container">
            <a href="/">
                <Image src="/assets/logos/logo5.png" alt="Logo" width={100} height={100}/>
            </a>
        </article>

        <nav className="nav-container">
            <ul>
                <li className="nav-item">
                    <a className="nav-link" href="/">Raffle</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Events</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">News</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Contacts</a>
                </li>
            </ul>
        </nav>

        <div className="login-nav-item">
            <button className="btn">
                <a id="login-link" href="/login">Login</a>
            </button>
        </div>

    </header>

  )
}

export default Header