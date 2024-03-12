'use client'
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if(session){
    redirect('/')
  }


  const handleCredentialsLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false, // Prevent automatic redirection
      });
      
      if (!response.ok) {
        setError('Invalid email or password');
      }
    } catch (error) {
      
      console.error('Error logging in:', error);
      setError('An error occurred during login');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
      router.push('/');
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleCredentialsLogin} className="mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" required onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center">
            <p className="text-sm text-gray-600 mr-2">Don't have an account yet?</p>
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login with Credentials</button>
      </form>
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Login with Google</button>
      {/* <button onClick={handleGuestLogin} className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Continue as Guest</button> */}
    </div>
  );
};

export default LoginPage;