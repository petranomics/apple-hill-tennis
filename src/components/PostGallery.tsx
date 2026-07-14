"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryPhoto = { url: string; caption: string };

/**
 * A run of photos in a post body. Club posts are often mostly pictures — a
 * round robin, an opening day — so consecutive photos are laid out as a gallery
 * instead of a full-width stack, and tapping one opens it full size.
 */
export default function PostGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? null : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // Don't let the page scroll behind the lightbox.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const single = photos.length === 1;

  return (
    <>
      <div
        className={
          single
            ? "my-10"
            : "my-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        }
      >
        {photos.map((photo, i) => (
          <figure key={photo.url + i} className={single ? "" : "m-0"}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={photo.caption || "View photo full size"}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-sage/10"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className={
                  single
                    ? // A single photo is shown whole, but capped so a tall phone
                      // photo can't swallow the entire screen.
                      "mx-auto max-h-[70vh] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                    : // In a grid, crop to a consistent shape so mixed portrait and
                      // landscape shots line up instead of stair-stepping.
                      "h-64 md:h-80 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                }
              />
            </button>
            {photo.caption && (
              <figcaption className="mt-3 text-center text-sm text-bark-light italic">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl leading-none"
          >
            &times;
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous photo"
                className="absolute left-3 md:left-6 text-white/70 hover:text-white text-5xl leading-none px-3"
              >
                &#8249;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next photo"
                className="absolute right-3 md:right-6 text-white/70 hover:text-white text-5xl leading-none px-3"
              >
                &#8250;
              </button>
            </>
          )}

          <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[open].url}
              alt={photos[open].caption}
              className="max-h-[82vh] max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {photos[open].caption}
              {photos.length > 1 && (
                <span className="ml-3 text-white/50">
                  {open + 1} / {photos.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
