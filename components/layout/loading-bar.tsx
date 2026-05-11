"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoadingBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the path or search params change, it means the navigation is complete
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (
        anchor &&
        anchor instanceof HTMLAnchorElement &&
        anchor.href &&
        anchor.target !== "_blank" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        !event.altKey &&
        anchor.href.startsWith(window.location.origin) &&
        anchor.href !== window.location.href
      ) {
        setLoading(true);
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-0.5 overflow-hidden bg-zinc-100/20">
      <div className="h-full w-full bg-primary origin-left animate-[loading-bar_2s_infinite_linear]" />
      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-30%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

export function LoadingBar() {
  return (
    <Suspense fallback={null}>
      <LoadingBarContent />
    </Suspense>
  );
}
