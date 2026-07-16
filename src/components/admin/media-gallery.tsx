"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMediaListAction, deleteMediaAction } from "@/actions/media";
import type { MediaFile, MediaCategory } from "@/types";
import { Spinner } from "@/components/spinner";
import { useToast } from "@/hooks/use-toast";

const CATEGORY_LABELS: Record<MediaCategory, string> = {
  sectors: "🏢 Sectors",
  guides: "📚 Guides",
  downloads: "📥 Downloads",
  branding: "🎨 Branding",
  general: "📁 General",
};

export function MediaGallery() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<MediaCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, [filter]);

  const loadMedia = async (): Promise<void> => {
    setLoading(true);
    const data = await getMediaListAction(filter === "all" ? undefined : filter);
    setMedia(data);
    setLoading(false);
  };

  const filteredMedia = media.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.filename.toLowerCase().includes(q) ||
      m.alt.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleCopyUrl = (url: string): void => {
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Media URL copied to clipboard." });
  };

  const handleDelete = async (item: MediaFile): Promise<void> => {
    if (!confirm(`Delete ${item.filename}?`)) return;

    const result = await deleteMediaAction(item.id, item.storagePath);

    if (result.success) {
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
      setSelected(null);
      toast({ title: "Deleted", description: "Media file removed successfully." });
    } else {
      toast({ variant: "destructive", title: "Failed", description: result.error || "Could not delete file." });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="🔍 Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl bg-muted/30 border border-border focus:border-primary focus:outline-none"
        />

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all" ? "gradient-tanzania text-white" : "bg-muted/50 hover:bg-muted"
            }`}
          >
            All ({media.length})
          </button>

          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key as MediaCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === key ? "gradient-tanzania text-white" : "bg-muted/50 hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-3xl">
          <div className="text-6xl mb-3">📭</div>
          <p className="text-muted-foreground">No media found</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <AnimatePresence>
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                onClick={() => setSelected(item)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                {item.type === "image" ? (
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-muted">
                    {item.type === "document" ? "📄" : item.type === "video" ? "🎥" : "📁"}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                  Click to view
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {selected.type === "image" && <img src={selected.url} alt={selected.alt} className="w-full rounded-2xl mb-4" />}

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Filename</label>
                  <p className="font-mono text-xs break-all">{selected.filename}</p>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Public URL</label>
                  <div className="flex gap-2 mt-1">
                    <input readOnly value={selected.url} className="flex-1 px-3 py-2 rounded-xl bg-muted text-xs font-mono border" />
                    <button onClick={() => handleCopyUrl(selected.url)} className="px-4 py-2 gradient-tanzania text-white rounded-xl text-xs font-bold">
                      Copy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">File Size</label>
                    <p className="text-sm font-bold">{(selected.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Dimensions</label>
                    <p className="text-sm font-bold">{selected.width && selected.height ? `${selected.width} × ${selected.height}` : "—"}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <button onClick={() => setSelected(null)} className="flex-1 h-12 rounded-xl border font-bold hover:bg-muted transition-colors">
                    Close
                  </button>
                  <button onClick={() => handleDelete(selected)} className="flex-1 h-12 rounded-xl bg-destructive text-white font-bold hover:bg-destructive/90 transition-colors">
                    Delete Asset
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
