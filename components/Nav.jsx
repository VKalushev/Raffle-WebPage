"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true;
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);

  return (
    
    <nav className='flex-between w-full mb-3'>

            <Link href='/' className="">
                <Image src="/assets/logos/logo5.png" alt="Logo" width={100} height={100} className="object-contain"/>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href='/login'>
                    <Image
                        // src={session?.user.image}
                        src="/assets/logos/logo5.png"
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'
                    />
                    </Link>
                </div>
                ) : (
                <>
                    {providers &&
                    Object.values(providers).map((provider) => (
                        <button
                        type='button'
                        key={provider.name}
                        onClick={() => {
                            signIn(provider.id);
                        }}
                        className='black_btn'
                        >
                        Sign in
                        </button>
                    ))}
                </>
                )}
      </div>
    </nav>
  )
}

export default Nav