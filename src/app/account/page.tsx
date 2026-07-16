'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Globe, User as UserIcon, LogOut, Loader2, BookOpen, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast";

export default function AccountPage() {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedGuides, setSavedGuides] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // Not authenticated -> redirect to login
        router.push("/login?redirect=/account");
        return;
      }
      setUser(currentUser);

      // Fetch or initialize user profile document in Firestore
      try {
        const userDocRef = doc(db!, "users", currentUser.uid);
        const snap = await getDoc(userDocRef);

        if (snap.exists()) {
          setSavedGuides(snap.data().savedGuides ?? []);
        } else {
          // Initialize document
          await setDoc(userDocRef, {
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            savedGuides: [],
            createdAt: new Date(),
          });
        }
      } catch (err) {
        console.error("Firestore user init error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth!);
      toast.success("Signed out", "You have been signed out successfully.");
      router.push("/login");
    } catch (err: any) {
      toast.error("Logout Error", err.message || "Failed to sign out.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-tanzania-500" />
        <p className="text-sm font-mono">Initializing session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50 pt-28 md:pt-32 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto pb-24">
      {/* Profile Header */}
      <div className="rounded-3xl bg-white dark:bg-kilimanjaro-900/60 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-8 shadow-xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 flex items-center justify-center shadow-inner">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt={user.displayName || "Avatar"} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <UserIcon className="w-8 h-8" />
            )}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-display font-bold leading-none">{user?.displayName || "Tanzania Explorer"}</h2>
            <p className="text-sm text-muted-foreground font-mono">{user?.email}</p>
          </div>
        </div>

        <Button onClick={handleLogout} variant="outline" className="rounded-xl gap-2 font-bold h-12">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Saved Guides */}
        <div className="md:col-span-8 space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-tanzania-500" /> Saved briefings
          </h3>

          {savedGuides.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-12 text-center space-y-4">
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You haven't saved any sector guides yet. Browse the guides directory to bookmark folders for offline access.
              </p>
              <Button asChild className="bg-tanzania-500 hover:bg-tanzania-600 text-white rounded-xl font-bold h-11 px-6">
                <a href="/guides">Browse Guides</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedGuides.map((guideSlug) => (
                <div key={guideSlug} className="p-6 rounded-2xl bg-white dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10">
                  <h4 className="font-bold capitalize">{guideSlug}</h4>
                  <a href={`/guides/${guideSlug}`} className="text-xs text-tanzania-500 underline mt-2 block">Read Briefing</a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-tanzania-500" /> Security
          </h3>
          <div className="rounded-3xl bg-white dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-6 space-y-4 text-xs leading-relaxed text-muted-foreground">
            <p>
              Account data and saved settings are stored securely inside your personal Firebase profile container.
            </p>
            <p>
              To request full profile deletion or data removal, contact developer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
