import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black/75">
      <Loader2 size={42} className="animate-spin text-white" />
    </div>
  )
}