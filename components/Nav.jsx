"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname()
  let isLoginPage = false;

  if(pathname === '/login'){
    isLoginPage = true;
  }

  const { data: session } = useSession();
  const router = useRouter();
  
  const handleSignInClick = () => {
    router.push(`/login`);
  };

  return (
    
    <nav className='flex-between w-full mb-3'>

            <div className="flex ">
            <Link href='/'>
                <Image src="/assets/logos/logo5.png" alt="Logo" width={100} height={100} className="object-contain"/>
            </Link>
            <Link href='/archive' className="nav-links ml-1" >
                <p>Archive</p>
            </Link>
            <Link href='/archive' className="nav-links" >
                <p>Redeem Rewards</p>
            </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href='/profile'>
                    <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'
                    />
                    </Link>
                </div>
                ) : (
                <>
                  {isLoginPage ? (
                    <div></div>
                  ) : (
                    <button
                        type='button'
                        onClick={handleSignInClick}
                        className='black_btn'>
                        Sign in
                    </button>
                  )}
                    
                    
                </>
                )}
      </div>
    </nav>
  )
}

export default Nav