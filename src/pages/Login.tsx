import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Radio, Shield, Wrench, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('admin@polartwin.demo');
  const [password, setPassword] = useState<string>('demo1234');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your authorization email.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await login(email);
      navigate('/dashboard');
    } catch {
      setError('Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoUser = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
  };

  return (
    <div className="min-h-screen bg-[#080D12] flex items-center justify-center p-4 relative select-none page-fade">
      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 bg-[#101820] rounded-[10px] p-8 border border-[rgba(190,205,215,0.12)] shadow-2xl">
        {/* Logo & Heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-lg bg-[#0C1218] border border-[rgba(190,205,215,0.12)] flex items-center justify-center text-[#7895A8] mb-3 shadow-subtle">
            <Radio className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold font-mono text-[#E4E8EB] tracking-wider">
            POLAR TWIN
          </h1>
          <p className="text-[11px] font-mono text-[#9AA7B1] uppercase tracking-widest mt-1">
            Antarctic Operations Digital Twin
          </p>
        </div>

        {/* Demo Preset Roles */}
        <div className="mb-6 space-y-2">
          <label className="text-[11px] font-sans text-[#9AA7B1] block tracking-wider uppercase">
            Select Role Account:
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs font-sans">
            <button
              type="button"
              onClick={() => setDemoUser('admin@polartwin.demo')}
              className={`p-2.5 rounded-md border flex flex-col items-center text-center transition-all duration-180 ${
                email === 'admin@polartwin.demo'
                  ? 'bg-[#7895A8]/20 border-[#7895A8] text-[#E4E8EB] font-medium shadow-subtle'
                  : 'bg-[#0C1218] border-[rgba(190,205,215,0.10)] text-[#9AA7B1] hover:text-[#E4E8EB]'
              }`}
            >
              <Shield className="w-4 h-4 mb-1 text-[#7895A8]" />
              <span className="text-[10px]">Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setDemoUser('operator@polartwin.demo')}
              className={`p-2.5 rounded-md border flex flex-col items-center text-center transition-all duration-180 ${
                email === 'operator@polartwin.demo'
                  ? 'bg-[#7895A8]/20 border-[#7895A8] text-[#E4E8EB] font-medium shadow-subtle'
                  : 'bg-[#0C1218] border-[rgba(190,205,215,0.10)] text-[#9AA7B1] hover:text-[#E4E8EB]'
              }`}
            >
              <Compass className="w-4 h-4 mb-1 text-[#7F9FA5]" />
              <span className="text-[10px]">Operator</span>
            </button>

            <button
              type="button"
              onClick={() => setDemoUser('engineer@polartwin.demo')}
              className={`p-2.5 rounded-md border flex flex-col items-center text-center transition-all duration-180 ${
                email === 'engineer@polartwin.demo'
                  ? 'bg-[#7895A8]/20 border-[#7895A8] text-[#E4E8EB] font-medium shadow-subtle'
                  : 'bg-[#0C1218] border-[rgba(190,205,215,0.10)] text-[#9AA7B1] hover:text-[#E4E8EB]'
              }`}
            >
              <Wrench className="w-4 h-4 mb-1 text-[#B29A6A]" />
              <span className="text-[10px]">Engineer</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="text-[#9AA7B1] block mb-1">Authorized Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] font-mono focus:outline-none focus:border-[#7895A8]"
              placeholder="operator@polartwin.demo"
            />
          </div>

          <div>
            <label className="text-[#9AA7B1] block mb-1">Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] font-mono focus:outline-none focus:border-[#7895A8]"
            />
          </div>

          {error && (
            <p className="text-xs font-mono text-[#A87575] bg-[#A87575]/10 p-2.5 rounded border border-[#A87575]/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold py-2.5 rounded-md flex items-center justify-center space-x-2 transition-all duration-180 mt-2 shadow-subtle"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>ACCESS COMMAND CENTRE</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Footer */}
        <div className="mt-6 pt-4 border-t border-[rgba(190,205,215,0.10)] text-[11px] font-sans text-[#687681] space-y-1">
          <div className="flex items-center gap-1.5 text-[#7D9B83]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>NCPOR Telemetry Protocol Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
