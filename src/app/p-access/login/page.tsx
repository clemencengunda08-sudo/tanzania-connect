
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createSessionAction } from '@/actions/auth';
import { Eye, EyeOff, LogIn, AlertCircle, ArrowLeft, CheckCircle2, Copy, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth, db } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    if (auth && db) {
      setIsFirebaseReady(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth!, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const result = await createSessionAction(idToken);
      if (result.success) {
        router.replace('/p-access/dashboard');
      } else {
        setError(result.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a0f1e]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary to-secondary text-4xl shadow-2xl shadow-primary/30 text-white font-black">
            TR
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-black tracking-tighter text-white uppercase text-center">Secure Access</h1>
            <p className="text-slate-400 font-medium">Control Portal &mdash; Est. 2026</p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/5 w-fit mx-auto">
              {isFirebaseReady ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SYSTEM READY</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">CONNECTING...</span>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="flex flex-col gap-3 p-4 rounded-2xl border text-xs animate-in fade-in zoom-in-95 bg-destructive/10 border-destructive/20 text-destructive-foreground mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="leading-tight font-medium">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Admin ID</label>
              <Input
                type="email"
                placeholder="admin@tanzaniareach.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!isFirebaseReady || loading}
                className="h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Passphrase</label>
              <div className="relative">
                <Input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={!isFirebaseReady || loading}
                  className="h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-slate-700 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !isFirebaseReady}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
            >
              {loading ? "Authenticating..." : "Sign In to Control"}
            </Button>
          </form>
        </div>

        <Link href="/" className="flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors py-4 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Exit to Public Site</span>
        </Link>
      </div>
    </div>
  );
}
