'use client';

import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { ShieldAlert, X, Copy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/toast';

export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);
  const toast = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handlePermissionError = (err: FirestorePermissionError) => {
      // Only show for significant admin paths to avoid bothering regular users
      if (err.context.path.includes('admin_users') || err.context.path.includes('settings')) {
        setError(err);
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => errorEmitter.off('permission-error', handlePermissionError);
  }, []);

  if (!mounted || !error) return null;

  const copyContext = () => {
    navigator.clipboard.writeText(JSON.stringify(error.context, null, 2));
    toast.info("Copied!", "Error context copied for debugging.");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300">
      <div className="max-w-xl w-full bg-slate-900 border border-destructive/30 rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <button onClick={() => setError(null)} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h3 className="text-2xl font-headline font-black text-white tracking-tighter uppercase">Security Block</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Insufficient permissions at <span className="font-mono text-destructive bg-destructive/5 px-1.5 py-0.5 rounded">{error.context.path}</span>.
            </p>
          </div>

          <div className="bg-black/20 rounded-2xl p-5 border border-white/5 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Details</span>
              <button onClick={copyContext} className="flex items-center gap-2 text-[10px] font-bold text-primary hover:underline">
                <Copy className="w-3 h-3" /> Copy Context
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500 mb-1 font-bold">Operation</p>
                <p className="text-white font-mono uppercase">{error.context.operation}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1 font-bold">Status</p>
                <p className="text-amber-400">Blocked by Rules</p>
              </div>
            </div>
          </div>

          <Button onClick={() => setError(null)} className="w-full h-14 rounded-2xl bg-white text-slate-900 font-black text-lg">
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
