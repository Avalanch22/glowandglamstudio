
import { useGalleryImages } from "@/lib/useGalleryImages";
import { Masonry } from "@/components/ui/masonry";

interface GallerySectionProps {
  category: string;
  title?: string;
  description?: string;
}

export function GallerySection({ category, title, description }: GallerySectionProps) {
  const images = useGalleryImages(category);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && <h2 className="font-display text-3xl font-light tracking-wide text-primary mb-4">{title}</h2>}
            {description && <p className="font-sans text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </div>
        )}

        {images.length > 0 ? (
          <Masonry images={images} />
        ) : (
          <div className="w-full h-64 rounded-sm border border-border bg-gradient-to-br from-muted/30 to-muted/10 flex flex-col items-center justify-center p-8 text-center">
            <span className="font-display uppercase tracking-widest text-sm text-muted-foreground mb-2">
              Gallery Coming Soon
            </span>
            <p className="font-sans text-xs text-muted-foreground/70">
              Photos for {category} are being curated.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
