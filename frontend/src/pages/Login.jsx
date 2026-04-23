import React, { useState } from 'react';
import { Mic, Mail, Lock, LogIn } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For prototype purposes, accept any login.
    if (email && password) {
      onLogin();
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '50%', display: 'inline-flex', marginBottom: '16px' }}>
            <Mic size={32} color="white" />
          </div>
          <h2 style={{ margin: '0 0 8px 0' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Log in to continue your therapy journey.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
              <Mail size={18} color="var(--text-muted)" style={{ marginRight: '12px' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', width: '100%', outline: 'none' }}
                required
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
              <Lock size={18} color="var(--text-muted)" style={{ marginRight: '12px' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', width: '100%', outline: 'none' }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn" style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}>
            <LogIn size={18} /> Sign In
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
