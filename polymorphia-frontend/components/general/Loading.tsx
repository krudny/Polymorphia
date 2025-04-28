"use client"

export default function Loading() {
  return (
      <div className="fixed inset-0 flex items-center justify-center  z-[1000]">
        <div className="w-12 h-12 border-4 border-t-4 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"></div>
      </div>
  );
}