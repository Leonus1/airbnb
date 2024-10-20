import { Loader2 } from "lucide-react";

export default function CreationSubmit({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#FF5A5F] hover:bg-[#ff6b6f] font-semibold text-white px-8 py-2 rounded-lg"
    >
      {pending ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </div>
      ) : (
        "Submit"
      )}
    </button>
  );
}
