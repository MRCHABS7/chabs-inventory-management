import { useState } from 'react';
import { login } from '../lib/auth-simple';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'sales' | 'warehouse'>('sales');
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password, role);
    if (!ok) return alert('Invalid credentials');
    router.push('/dashboard');
  };

  return (
    <form onSubmit={submit} className="card space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            className="input" 
            type="email"
            placeholder="Enter your email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            className="input" 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select className="input" value={role} onChange={e => setRole(e.target.value as any)}>
            <option value="sales">👤 Sales Representative</option>
            <option value="warehouse">📦 Warehouse Manager</option>
          </select>
        </div>
      </div>
      
      <button className="btn w-full text-lg py-4" type="submit">
        🚀 Sign In
      </button>
      
      <div className="text-center text-sm text-gray-500">
        <p className="mb-2">Demo System - Use any credentials:</p>
        <p className="text-xs">
          📧 Email: admin@chabs.com<br/>
          🔑 Password: admin123
        </p>
      </div>
    </form>
  );
}

