import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import { cn } from "../utils";

type Vote = {
  proposal_id: number,
  type: "P" | "C";
  comment: string;
  proposal_score: number
};

interface CommentListModalProps {
  proposalDescription: string;
  votes: Vote[];
  trigger: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const CommentListModal: React.FC<CommentListModalProps> = ({
  proposalDescription,
  votes,
  trigger,
  onOpenChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"P" | "C">("P");

  React.useEffect(() => {
    if (!open) {
      setTab("P");
    }
  }, [open]);

  const proComments = votes.filter(
    (v) => v.type === "P" && v.comment.trim() !== ""
  );
  const againstComments = votes.filter(
    (v) => v.type === "C" && v.comment.trim() !== ""
  );

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); onOpenChange?.(o); }}>
      <DialogTrigger  asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white p-0">
        <DialogHeader className="px-8 pt-8 pb-0">
          <DialogTitle className="text-2xl font-bold mb-2">Comments list</DialogTitle>
        </DialogHeader>
        <div className="px-8 pt-2 pb-0">
          <div className="font-semibold mb-1">Proposal</div>
          <div className="text-gray-700 mb-4">{proposalDescription}</div>
          {/* Tabs */}
          <div className="flex mb-4 bg-gray-100 rounded-lg overflow-hidden w-full">
            <button
              className={cn(
                "flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition",
                tab === "P"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:bg-gray-200"
              )}
              onClick={() => setTab("P")}
              type="button"
            >
              <span className="inline-block w-3 h-3 rounded-full bg-green-400 border-2 border-green-500 mr-2" />
              Comments pro
            </button>
            <button
              className={cn(
                "flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition",
                tab === "C"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:bg-gray-200"
              )}
              onClick={() => setTab("C")}
              type="button"
            >
              <span className="inline-block w-3 h-3 rounded-full bg-red-300 border-2 border-red-500 mr-2" />
              Comments against
            </button>
          </div>
          {/* Comments List */}
          <div className="max-h-[300px] overflow-y-auto mb-6">
            <ul>
              {(tab === "P" ? proComments : againstComments).length === 0 ? (
                <li className="text-gray-400 italic py-2">No comments.</li>
              ) : (
                (tab === "P" ? proComments : againstComments).map((vote, idx) => (
                  <li key={idx} className="mb-3 flex items-start">
                    <span className="mt-1 mr-2 text-lg text-gray-400">•</span>
                    <span className="text-black">{vote.comment}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-end px-8 pb-8">
          <DialogClose asChild>
            <button
              type="button"
              className="px-8 py-2 rounded-lg bg-[#000091] text-white font-medium hover:bg-[#2323b0] transition-colors"
            >
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
