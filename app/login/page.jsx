'use client'
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const LoginPage = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  console.log('Privders', providers)

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profile', // Redirect URL after successful login
      });
    } catch (error) {
      console.error('Error logging in with credentials:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google');
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
          <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login with Credentials</button>
      </form>
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Login with Google</button>
    </div>
  );
};

export default LoginPage;
