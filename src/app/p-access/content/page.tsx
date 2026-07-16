
'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSectors, useSiteSettings } from '@/firebase/firestore/use-site-data';
import { 
  FileText, Edit3, Sparkles, 
  Loader2, Plus, Trash2,
  Wand2, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSectorManual } from '@/ai/flows/generate-sector-manual';
import type { SectorPageDoc } from '@/types';

export default function AdminContentPage() {
  const { sectors, addSector, updateSector, deleteSector, loading: sectorsLoading } = useSectors();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<SectorPageDoc>>({});
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const handleStartEdit = (item: SectorPageDoc) => {
    if (!item.id) return;
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditForm({ title: '', description: '' });
  };

  const handleSave = async () => {
    if (!editForm.title || !editForm.description) {
      toast({ variant: "destructive", title: "Incomplete", description: "Title and description are mandatory." });
      return;
    }
    try {
      if (isAdding) {
        await addSector(editForm as Omit<SectorPageDoc, 'id'>);
        setIsAdding(false);
      } else {
        await updateSector(editingId!, editForm);
        setEditingId(null);
      }
      toast({ title: "Portal Updated", description: "Sector content is now live on tanzaniareach.com" });
    } catch {
      toast({ variant: "destructive", title: "Save Error", description: "Check your Firestore rules." });
    }
  };

  const handleAiGenerate = async () => {
    if (!editForm.title) {
      toast({ variant: "destructive", title: "Provide Title", description: "Enter a sector name (e.g. Mining) first." });
      return;
    }
    setAiLoading(true);
    try {
      const result = await generateSectorManual({ sectorName: editForm.title });
      setEditForm({ ...editForm, description: result.description });
      toast({ title: "AI Generation Complete", description: "Professional manual drafted successfully." });
    } catch {
      toast({ variant: "destructive", title: "AI Failed", description: "Check your GenAI API key in .env" });
    } finally {
      setAiLoading(false);
    }
  };

  if (sectorsLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Connecting to Repository...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-headline font-black tracking-tight text-white uppercase tracking-tighter">Content Intelligence</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Manage Expert Manuals for tanzaniareach.com</p>
          </div>
          <Button onClick={handleStartAdd} className="gradient-tanzania rounded-xl font-black gap-2 px-6 h-12 shadow-xl shadow-primary/20">
            <Plus className="w-4 h-4" /> New Sector
          </Button>
        </header>

        <div className="p-10 space-y-12 max-w-5xl mx-auto">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-lg font-headline font-bold text-white uppercase tracking-tight">
                <Sparkles className="w-5 h-5 text-purple-400" /> Sector Repository
              </h2>
              {settings?.n8nWebhookUrl && (
                <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 font-black text-[9px] uppercase tracking-widest">
                   N8N Automation Ready
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {isAdding && (
                <Card className="bg-primary/5 border-primary/30 rounded-[2.5rem] overflow-hidden animate-in slide-in-from-top-4 duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-white uppercase tracking-tighter">Drafting New Manual</h3>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)} className="rounded-xl h-10"><X className="w-4 h-4 mr-2"/> Cancel</Button>
                        <Button size="sm" onClick={handleSave} className="gradient-tanzania px-6 rounded-xl font-bold h-10">Publish to Web</Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Input 
                          placeholder="Sector Name (e.g. Energy)" 
                          className="bg-white/5 border-white/10 rounded-2xl h-12 flex-1 text-white font-bold"
                          value={editForm.title || ''}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        />
                        <Button 
                          onClick={handleAiGenerate} 
                          disabled={aiLoading}
                          className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl gap-2 px-8 shadow-lg shadow-purple-500/20"
                        >
                          {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                          AI Auto-Draft
                        </Button>
                      </div>
                      <Textarea 
                        placeholder="Provide detailed professional guidance for this sector..." 
                        className="bg-white/5 border-white/10 rounded-[2rem] min-h-[300px] p-8 text-white leading-relaxed"
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {sectors.map((sector) => (
                <Card key={sector.id} className="bg-slate-900/40 border-white/5 rounded-[2.5rem] overflow-hidden group border hover:border-primary/20 transition-all">
                  <CardContent className="p-8">
                    {editingId === sector.id ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-primary flex items-center gap-2 uppercase tracking-widest text-xs">
                            <Edit3 className="w-4 h-4" /> Editing: {sector.title}
                          </h3>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs rounded-xl h-10" onClick={() => setEditingId(null)}>Discard</Button>
                            <Button size="sm" onClick={handleSave} className="gradient-tanzania rounded-xl px-8 font-bold h-10">Update live</Button>
                          </div>
                        </div>
                        <Textarea 
                          value={editForm.description || ''} 
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                          className="bg-white/5 border-white/10 rounded-2xl min-h-[200px] p-6 text-white text-sm leading-relaxed"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                            <FileText className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="font-black text-white text-xl uppercase tracking-tighter">{sector.title}</h3>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-1 max-w-lg font-medium leading-relaxed">{sector.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleStartEdit(sector)}
                            className="rounded-2xl h-12 w-12 text-slate-500 hover:text-white hover:bg-white/5"
                          >
                            <Edit3 className="w-5 h-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => { if(confirm('Permanently delete this manual from tanzaniareach.com?')) deleteSector(sector.id!); }}
                            className="rounded-2xl h-12 w-12 text-slate-500 hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
