'use client';

import { useState, Suspense } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Globe, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/toast";

export default function PublicLoginPage() {
  // Suspense boundary is REQUIRED: useSearchParams() (inside LoginContent)
  // bails out of static prerendering — without it the production build fails
  // with "useSearchParams() should be wrapped in a suspense boundary".
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/account";
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Success", "Welcome to Tanzania Reach!");
      router.push(redirect);
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      toast.error("Auth Error", err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Success", "Signed in successfully!");
      router.push(redirect);
    } catch (err: any) {
      console.error("Email Login Error:", err);
      toast.error("Login Failed", err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full rounded-3xl bg-white dark:bg-kilimanjaro-900/60 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-8 shadow-2xl space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 mb-2">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Access Portal</h2>
          <p className="text-sm text-muted-foreground">Save guides, track requirements, and access briefing reports.</p>
        </div>

        {/* Action Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-tanzania-500 hover:bg-tanzania-600 text-white font-bold transition-all">
            {loading ? "Signing in..." : "Sign In with Email"}
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10"></div>
          <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted-foreground">or continue with</span>
          <div className="flex-grow border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10"></div>
        </div>

        {/* Google SSO */}
        <Button onClick={handleGoogleLogin} disabled={loading} variant="outline" className="w-full h-12 rounded-xl border-kilimanjaro-900/10 dark:border-tanzania-50/10 hover:bg-muted font-bold transition-all">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v2.7h5.38C16.88,15.75,14.76,17,12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5c1.47,0,2.78,0.61,3.75,1.58l2.06-2.06C16.27,4.98,14.28,4,12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8c4.15,0,7.6-3.08,7.95-7H21.35z" fill="#4285F4" />
            </g>
          </svg>
          Google Account
        </Button>

        {/* Security / Terms disclaimer */}
        <div className="pt-4 border-t border-kilimanjaro-900/5 dark:border-tanzania-50/5 flex gap-2 items-start text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-tanzania-500 shrink-0 mt-0.5" />
          <p>
            Secure access is managed through Firebase Authentication. By signing in, you agree to our <Link href="/terms" className="text-tanzania-500 underline">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
