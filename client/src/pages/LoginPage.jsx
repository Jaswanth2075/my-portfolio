import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Terminal, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@jaswanthnaidu.dev');
  const [password, setPassword] = useState('AdminSecurePassword123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axiosClient.post('/auth/login', { email, password });
      if (res && res.token) {
        login(res.token, res.admin);
        navigate('/admin');
        return;
      }
    } catch (err) {
      // In offline / standalone development mode fallback
      if (email === 'admin@jaswanthnaidu.dev' && password === 'AdminSecurePassword123!') {
        const mockAdmin = {
          id: 'admin-01',
          name: 'Jaswanth Naidu',
          email: 'admin@jaswanthnaidu.dev',
          role: 'administrator'
        };
        login('mock_jwt_token_for_preview_mode', mockAdmin);
        navigate('/admin');
        return;
      }
      setError(err.message || 'Invalid credentials or authorization failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center p-4 font-mono relative overflow-hidden bg-dev-grid">
      {/* Return to Portfolio button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs text-gray-400 hover:text-[#39FF88] transition-colors p-2 rounded-lg border border-[#1E292F] bg-[#101517]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>return to portfolio</span>
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-[#1E292F] bg-[#101517] overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B0F10] border-b border-[#1E292F] select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C5C]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB84C]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF88]/80 inline-block"></span>
            <span className="ml-2 text-xs text-[#00D9FF]">auth_gateway.sh</span>
          </div>
          <span className="text-[10px] text-gray-500">JWT / SHA-256</span>
        </div>

        {/* Login Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#141B1E] border border-[#1E292F] text-[#39FF88] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Administrative Terminal
            </h2>
            <p className="text-xs text-gray-400 font-sans">
              Authenticate with security credentials to access the portfolio control center.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg border border-[#FF5C5C]/40 bg-[#FF5C5C]/10 text-[#FF5C5C] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-gray-400 block font-medium">
                admin_identity (email)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jaswanthnaidu.dev"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF88] transition-colors"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-gray-400 block font-medium">
                security_passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF88] transition-colors"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Default credentials tip */}
            <div className="p-3 rounded-lg bg-[#0E1315] border border-[#1E292F] text-[11px] text-gray-400 space-y-1 font-mono">
              <div className="text-[#39FF88] font-semibold">// DEFAULT SEED ACCESS</div>
              <div>user: <span className="text-gray-200">admin@jaswanthnaidu.dev</span></div>
              <div>pass: <span className="text-gray-200">AdminSecurePassword123!</span></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#39FF88] text-black font-semibold hover:bg-[#27D66F] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#39FF88]/20 disabled:opacity-50"
            >
              <Terminal className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Authenticate Admin Session'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
