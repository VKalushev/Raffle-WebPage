"use client"

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, redirect } from 'next/navigation';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  if(session){
    redirect('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    } else if (formData.username.length < 4 ){
      setError('The username should be at least 4 characters long')
      return;
    } else {
      try { 
        const response = await fetch("/api/user/create", {
          method: "POST",
          body: JSON.stringify({
              email: formData.email,
              username: formData.username,
              password: formData.password,
          }),
        });
        
        if (response.ok) {
            router.push("/login");
        } else {
          const message = await response.json()
          setError(message)
        }
      } catch (error) {
          console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-3xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="username" id="username" name="username" value={formData.username} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register</button>
      </form>
      <div className="flex items-center">
        <p className="text-sm text-gray-600 mr-2">Already have an account?</p>
        <Link href="/login" className='text-blue-500 hover:underline'>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
