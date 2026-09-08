"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

const animationVariants: Record<AnimationStyle, { initial: any; animate: any; exit: any }> = {
  "from-bottom": { initial: { y: "100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } },
  "from-center": { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } },
  "from-top": { initial: { y: "-100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "-100%", opacity: 0 } },
  "from-left": { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "-100%", opacity: 0 } },
  "from-right": { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  "top-in-bottom-out": { initial: { y: "-100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } },
  "left-in-right-out": { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } },
};

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selected = animationVariants[animationStyle];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Play video"
        className="group relative cursor-pointer border-0 bg-transparent p-0 w-full"
        onClick={() => setIsVideoOpen(true)}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-2xl border shadow-xl transition-all duration-300 ease-out group-hover:brightness-[0.85] group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl transition-all duration-300 ease-out group-hover:scale-110">
          <div className="bg-white/20 flex size-20 items-center justify-center rounded-full backdrop-blur-md ring-1 ring-white/30 shadow-2xl shadow-black/10">
            <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-[#C0845C]/30 to-[#C0845C] shadow-lg">
              <Play className="size-7 fill-white text-white ml-1" />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setIsVideoOpen(false);
            }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl"
          >
            <motion.div
              {...selected}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative mx-4 aspect-video w-full max-w-5xl md:mx-8"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-14 right-0 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
              <div className="relative isolate z-10 size-full overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl shadow-black/30 bg-black">
                <iframe
                  src={videoSrc}
                  title="Hero Video player"
                  className="size-full rounded-3xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
