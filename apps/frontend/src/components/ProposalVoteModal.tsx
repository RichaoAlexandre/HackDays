import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../components/ui/dialog";
import { cn } from "../utils";

interface ProposalVoteModalProps {
    onOpenChange?: (open: boolean) => void;
    proposalDescription: string;
    proposalId: number;
    onSubmit: (vote: "P" | "C", proposalId: number, comment: string) => void;
    loading?: boolean;
    trigger: React.ReactNode
}

export const ProposalVoteModal: React.FC<ProposalVoteModalProps> = ({
    proposalDescription,
    onSubmit,
    proposalId, 
    loading = false,
    trigger
}) => {
    const [vote, setVote] = React.useState<"P" | "C" | null>(null);
    const [comment, setComment] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (vote) {
            onSubmit(vote, proposalId, comment);
            setOpen(false);
        }
    };

    React.useEffect(() => {
        if (!open) {
            setVote(null);
            setComment("");
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white p-0">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="px-8 pt-8 pb-0">
                        <DialogTitle className="text-2xl font-bold mb-2">Vote selected proposal</DialogTitle>
                    </DialogHeader>
                    <div className="px-8 pt-2 pb-0">
                        <div className="font-semibold mb-1">Proposal</div>
                        <div className="text-gray-700 mb-4">{proposalDescription}</div>
                        <div className="flex items-center gap-8 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="vote"
                                    value="P"
                                    checked={vote === "P"}
                                    onChange={() => setVote("P")}
                                    className="accent-green-500 w-5 h-5"
                                />
                                <span className="text-black">Vote for</span>
                                <span className="inline-block w-3 h-3 rounded-full border-2 border-green-500 bg-white ml-1" />
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="vote"
                                    value="C"
                                    checked={vote === "C"}
                                    onChange={() => setVote("C")}
                                    className="accent-red-500 w-5 h-5"
                                />
                                <span className="text-black">Vote against</span>
                                <span className="inline-block w-3 h-3 rounded-full border-2 border-red-500 bg-white ml-1" />
                            </label>
                        </div>
                        <div className="font-semibold mb-1">Argument your vote</div>
                        <textarea
                            className="w-full border border-gray-200 rounded-lg p-2 mb-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                            rows={3}
                            placeholder="Describe the reasons of your vote"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <div className="font-light text-black/45 mb-1">Enter your comment</div>
                    </div>
                    <div className="flex gap-2 px-8 pb-8">
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="flex-1 px-8 py-3 border border-black rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </DialogClose>
                        <button
                            type="submit"
                            className={cn(
                                "flex-1 px-8 py-3 rounded-lg font-medium transition-colors",
                                vote
                                    ? "bg-[#000091] text-white hover:bg-[#a5b0f5]"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            )}
                            disabled={!vote}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}