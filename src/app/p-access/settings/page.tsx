'use client';

import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Save, Bell, Shield, Database, Cpu, Zap, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useSiteSettings } from '@/firebase/firestore/use-site-data';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const { settings, updateSettings, loading } = useSiteSettings();
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(formData);
      toast({ title: "Settings Updated", description: "Global configuration is now synchronized." });
    } catch (e) {
      toast({ variant: "destructive", title: "Update Failed", description: "Could not save settings to Firestore." });
    } finally {
      setSaving(false);
    }
  };

  const testN8N = async () => {
    if (!formData.n8nWebhookUrl) {
      toast({ variant: "destructive", title: "Missing URL", description: "Please provide an N8N Webhook URL first." });
      return;
    }
    try {
      const res = await fetch(formData.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'ping', source: 'Tanzania Reach Portal', timestamp: new Date().toISOString() })
      });
      if (res.ok) {
        toast({ title: "N8N Connection OK", description: "Webhook successfully received the test payload." });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({ variant: "destructive", title: "N8N Error", description: "Failed to reach Webhook. Check your N8N instance." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-headline font-black tracking-tight text-white uppercase tracking-tighter">System Settings</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Global Configuration & Automation</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gradient-tanzania rounded-xl font-bold gap-2 px-8">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </header>

        <div className="p-10 space-y-10 max-w-4xl mx-auto">
          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-lg font-headline font-bold text-white uppercase tracking-tight">
              <Zap className="w-5 h-5 text-amber-400" /> N8N Hyper-Automation
            </h2>
            <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-bold text-sm uppercase tracking-widest">Webhook URL</Label>
                    <button onClick={testN8N} className="text-[10px] font-black text-amber-400 hover:text-white transition-colors uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">Test Connection</button>
                  </div>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      value={formData.n8nWebhookUrl || ''} 
                      onChange={(e) => setFormData({...formData, n8nWebhookUrl: e.target.value})}
                      placeholder="https://n8n.your-domain.com/webhook/..." 
                      className="bg-white/5 border-white/10 rounded-2xl h-14 pl-12 text-sm text-white"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 italic ml-1">Payload includes: sectorTitle, description, and eventSource.</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <Label className="text-white font-bold">Auto-Sync on Update</Label>
                    <p className="text-xs text-slate-500">Automatically trigger N8N when content is modified.</p>
                  </div>
                  <Switch 
                    checked={formData.autoSyncN8N || false} 
                    onCheckedChange={(val) => setFormData({...formData, autoSyncN8N: val})} 
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-lg font-headline font-bold text-white uppercase tracking-tight">
              <Cpu className="w-5 h-5 text-primary" /> Assistant Intelligence
            </h2>
            <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem]">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white font-bold">Query Logging</Label>
                    <p className="text-xs text-slate-500">Record natural language queries for analytics.</p>
                  </div>
                  <Switch 
                    checked={formData.queryLogging !== false} 
                    onCheckedChange={(val) => setFormData({...formData, queryLogging: val})} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white font-bold">High Precision Mode</Label>
                    <p className="text-xs text-slate-500">Enforce stricter confidence thresholds for AI answers.</p>
                  </div>
                  <Switch 
                    checked={formData.highPrecisionMode || false} 
                    onCheckedChange={(val) => setFormData({...formData, highPrecisionMode: val})} 
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-lg font-headline font-bold text-white uppercase tracking-tight">
              <Database className="w-5 h-5 text-purple-400" /> Infrastructure Metadata
            </h2>
            <Card className="bg-slate-900/40 border-white/5 rounded-[2.5rem]">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Firestore Identity</Label>
                  <Input readOnly value="studio-1122358101-f5340" className="bg-white/5 border-white/10 rounded-xl h-12 text-slate-400 font-mono" />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
