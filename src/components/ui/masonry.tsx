import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface MediaProps {
  src: string;
  path?: string;
  alt?: string;
  className?: string;
}

interface MasonryProps {
  images: MediaProps[];
  className?: string;
}

export function Masonry({ images, className }: MasonryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaProps | null>(null);

  const checkIsVideo = (src: string, path?: string) => {
    const target = path || src;
    return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(target);
  };

  // Close on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className={cn("columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4", className)}>
        {images.map((item, idx) => {
          const isVideo = checkIsVideo(item.src, item.path);

          return (
            <div 
              key={idx} 
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-md group relative border border-border/20 bg-muted/10"
              onClick={() => setSelectedMedia(item)}
            >
              {isVideo ? (
                <div className="relative w-full overflow-hidden">
                  <video 
                    src={item.src} 
                    muted 
                    loop 
                    autoPlay 
                    playsInline 
                    className={cn("w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105", item.className)}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] uppercase font-sans tracking-wider flex items-center gap-1 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Video
                  </div>
                </div>
              ) : (
                <img 
                  src={item.src} 
                  alt={item.alt || `Gallery image ${idx + 1}`} 
                  className={cn("w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105", item.className)}
                  loading="lazy"
                />
              )}
              {/* Soft overlay on hover for premium feel */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-5xl w-full max-h-screen flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {checkIsVideo(selectedMedia.src, selectedMedia.path) ? (
              <video 
                src={selectedMedia.src} 
                controls 
                autoPlay 
                playsInline
                className="max-w-full max-h-[90vh] rounded-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img 
                src={selectedMedia.src} 
                alt={selectedMedia.alt} 
                className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
