'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabase = createClient(
  'https://abonejclsaikufiekkdp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFib25lamNsc2Fpa3VmaWVra2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDI0NTgsImV4cCI6MjA2OTI3ODQ1OH0.7oTTC4rkO1etCm0FvWzWkIY6il9gYjLyk7LAMwp-80o'
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: 'https://receipe-generator-web-app-fhnr.vercel.app/dashboard',
  },
});


    if (error) {

      setMessage('❌ Error: ' + error.message);
    } else {
      setMessage(
        '✅ Magic Link sent! Check your email. When you click the link, you\'ll be securely logged in and redirected to your dashboard.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f2c] flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to ChefBotics</h1>
        {/* Subtext */}
        <p className="text-lg text-white/70 text-center mb-6">
          Enter your email to get a magic link and start your app
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Send Magic Link
          </button>
        </form>
        {message && (
          <p className="text-sm text-white/70 mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
