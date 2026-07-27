import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      onLoginSuccess({
        name: email ? email.split('@')[0] : 'User',
        email: email || 'user@example.com',
        role: 'Super Admin'
      });
      return;
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-container {
          display: flex;
          height: 100vh;
          width: 100%;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          /* Bright, premium background with very subtle dimming on edges */
          background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url("/premium_world_map_bg.png") center/cover no-repeat;
          position: relative;
        }

        .auth-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center right, transparent 40%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }

        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 5%;
          z-index: 2;
        }

        .hero-text {
          font-size: 56px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -1px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
          margin-bottom: 24px;
        }

        .hero-subtext {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          max-width: 500px;
          line-height: 1.5;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .login-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 5%;
          z-index: 2;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 48px 40px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          display: flex;
          flex-direction: column;
        }

        .login-card h2 {
          font-size: 24px;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 6px;
          text-align: center;
        }

        .login-card p.subtitle {
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 32px;
          text-align: center;
        }

        .input-wrap {
          position: relative;
          margin-bottom: 16px;
          width: 100%;
        }

        .input-wrap svg.icon-left {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #94a3b8;
          transition: color 0.3s;
        }

        .input-wrap input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 12px;
          outline: none;
          color: #1e293b;
          background: #ffffff;
          border: 1px solid transparent;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transition: all 0.2s ease;
        }

        .input-wrap input::placeholder {
          color: #94a3b8;
        }

        .input-wrap input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .input-wrap:focus-within svg.icon-left {
          color: #3b82f6;
        }

        .eye-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: #64748b; }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          margin-top: 8px;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          color: #3b82f6;
        }
        .checkbox-container input {
          width: 16px; height: 16px;
          accent-color: #3b82f6;
          cursor: pointer;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
        }

        .forgot-link {
          color: #3b82f6;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: #2563eb; }

        .submit-btn {
          width: 100%;
          background: linear-gradient(90deg, #4474ff 0%, #6248ff 100%);
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(68, 116, 255, 0.4);
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(68, 116, 255, 0.5);
        }

        .divider {
          display: flex; align-items: center; gap: 12px; margin: 24px 0;
        }
        .divider div { flex: 1; height: 1px; background: rgba(0, 0, 0, 0.1); }
        .divider span { font-size: 12px; color: #64748b; font-weight: 500; }

        .google-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 14px;
          background: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px; font-weight: 700; color: #1e293b;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .google-btn:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .bottom-text {
          margin-top: 24px;
          font-size: 13px;
          color: #64748b;
          text-align: center;
          font-weight: 500;
        }

        .bottom-text span {
          color: #3b82f6;
          font-weight: 700;
          cursor: pointer;
          margin-left: 4px;
        }
      `}</style>

      <div className="auth-container">
        
        {/* LEFT SIDE: Hero Section */}
        <div className="hero-section">
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="14" r="5" fill="#14b8a6" />
              <circle cx="14" cy="24" r="4.5" fill="#14b8a6" />
              <circle cx="50" cy="24" r="4.5" fill="#14b8a6" />
              <path d="M25 40 C 25 24, 39 24, 39 40 C 44 42, 40 44, 32 44 C 24 44, 20 42, 25 40 Z" fill="#14b8a6" />
              <path d="M8 32 C 8 56, 56 56, 56 32 C 56 26, 46 26, 46 32 C 46 46, 18 46, 18 32 C 18 26, 8 26, 8 32 Z" fill="#0f172a" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.05' }}>
              <span style={{ fontSize: '38px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.5px' }}>PEOPLE</span>
              <span style={{ fontSize: '38px', fontWeight: '900', color: '#14b8a6', letterSpacing: '0.5px' }}>CONNECT</span>
            </div>
          </div>

          <div style={{ width: '48px', height: '4px', background: 'linear-gradient(90deg, #0f172a 0%, #14b8a6 100%)', borderRadius: '2px', marginBottom: '24px' }}></div>
          
          <h1 className="hero-text">
            From Citizen Voice to<br/>Leadership Action
          </h1>
          <p className="hero-subtext">
            Empowering citizens to drive meaningful change, improve governance, and connect directly with leadership through data-driven advocacy.
          </p>

        </div>

        {/* RIGHT SIDE: Login Section */}
        <div className="login-section">
          <div className="login-card">

            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="subtitle">
              {isLogin ? 'Sign in to your Venum account' : 'Please register to get started'}
            </p>

          {error && (
            <div style={{ width: '100%', background: '#fee2e2', borderLeft: '4px solid #ef4444', padding: '10px 14px', marginBottom: '20px', borderRadius: '8px' }}>
              <span style={{ color: '#b91c1c', fontSize: '13px', fontWeight: '600' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {!isLogin && (
              <div className="input-wrap">
                <svg className="icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <input type="text" placeholder="Full Name" />
              </div>
            )}

            <div className="input-wrap">
              <svg className="icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input type="text" placeholder="Email or Username" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="input-wrap">
              <svg className="icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                     <>
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                     </>
                  )}
                </svg>
              </button>
            </div>

            <div className="form-actions">
              <label className="checkbox-container">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Sign Up'}
              {isLogin && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </form>

          <div className="divider">
            <div></div>
            <span>or</span>
            <div></div>
          </div>

          <button className="google-btn" type="button">
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="bottom-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </p>

        </div>
        </div>
      </div>
    </>
  );
}