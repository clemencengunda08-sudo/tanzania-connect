import { UploadZone } from "@/components/admin/upload-zone";
import { MediaGallery } from "@/components/admin/media-gallery";

export default function MediaPage() {
  return (
    <div className="container mx-auto p-6 md:p-10 max-w-7xl space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tighter uppercase">
          📸 Media <span className="gradient-tanzania-text">Intelligence</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-2xl">
          Centralized asset management system for Tanzania Reach. Upload, organize, and integrate media without the Firebase Console.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-primary rounded-full" />
          <h2 className="text-xl font-headline font-bold uppercase tracking-tight">Upload New Assets</h2>
        </div>
        <UploadZone category="general" />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-secondary rounded-full" />
          <h2 className="text-xl font-headline font-bold uppercase tracking-tight">Media Library</h2>
        </div>
        <MediaGallery />
      </section>
    </div>
  );
}
