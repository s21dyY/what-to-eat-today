import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className={`animate-spin text-orange-500 ${className}`} size={32} />
    </div>
  );
}