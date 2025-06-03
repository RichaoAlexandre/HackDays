import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { ProposalVoteModal } from "../components/ProposalVoteModal";
import { CommentListModal } from "../components/CommentListModal";

type Vote = {
  type: "pro" | "against";
  comment: string;
};

type Proposal = {
  id: number;
  description: string;
  votes: Vote[];
};

const initialProposals: Proposal[] = [
  {
    id: 1,
    description:
      "Option 1",
    votes: [
      { type: "pro", comment: "Great idea!" },
      { type: "pro", comment: "I support this." },
      { type: "against", comment: "Not feasible in our timeline." },
      { type: "pro", comment: "Fits our goals." },
      { type: "pro", comment: "Well thought out." },
      { type: "against", comment: "Too expensive." },
      { type: "pro", comment: "" },
      { type: "pro", comment: "This aligns perfectly with our strategy." },
      { type: "against", comment: "We need more research before proceeding." },
      { type: "pro", comment: "Innovative approach!" },
      { type: "against", comment: "Risks outweigh benefits." },
      { type: "pro", comment: "Clear and concise solution." },
      { type: "against", comment: "Not enough stakeholder buy-in." },
      { type: "pro", comment: "Timely implementation." },
      { type: "pro", comment: "" },
      { type: "pro", comment: "Great idea!" },
      { type: "pro", comment: "I support this." },
      { type: "against", comment: "Not feasible in our timeline." },
      { type: "pro", comment: "Fits our goals." },
      { type: "pro", comment: "Well thought out." },
      { type: "against", comment: "Too expensive." },
      { type: "pro", comment: "" },
      { type: "pro", comment: "This aligns perfectly with our strategy." },
      { type: "against", comment: "We need more research before proceeding." },
      { type: "pro", comment: "Innovative approach!" },
      { type: "against", comment: "Risks outweigh benefits." },
      { type: "pro", comment: "Clear and concise solution." },
      { type: "against", comment: "Not enough stakeholder buy-in." },
      { type: "pro", comment: "Timely implementation." },
      { type: "pro", comment: "" },
    ],
  },
  {
    id: 2,
    description:
      "Option 2",
    votes: [{ type: "pro", comment: "" }],
  },
  {
    id: 3,
    description:
      "Option 3",
    votes: [
      { type: "against", comment: "Doesn't solve the main problem." },
      { type: "against", comment: "" },
      { type: "against", comment: "I have concerns about implementation." },
      { type: "against", comment: "" },
    ],
  },
  {
    id: 4,
    description:
      "Option 4",
    votes: [{ type: "pro", comment: "" }],
  },
];

export const VotingScreen = () => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [votes, setVotes] = useState<{ [proposalId: number]: "pro" | "against" | null }>({
    1: null,
    2: null,
    3: null,
  });

  // For demo, timer is static
  const timer = "05:24:00";

  const handleVote = ( type: "pro" | "against",proposalId: number,comment: string) => {
    // to do api call and update.
    console.log('the vote comment is', comment)
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Proposals voting</h1>
            <div className="flex flex-wrap gap-6 text-sm items-center">
              <LegendItem color="green-500" border="green-500" text="Vote pro" />
              <LegendItem color="red-500" border="red-500" text="Vote against" />
              <LegendItem color="green-100" border="green-500" text="Comment pro" isComment />
              <LegendItem color="red-100" border="red-500" text="Comment against" isComment />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-[#f3f6fa] rounded-lg px-6 py-3 flex flex-col items-center shadow-sm">
              <span className="text-2xl font-bold text-[#000091]">{timer}</span>
              <span className="text-xs text-gray-500 mt-1">Time left to vote proposals</span>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="w-300 rounded-xl shadow bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm">
                  Proposals to be voted <span className="ml-1 align-middle inline-block text-gray-400">ⓘ</span>
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700 text-sm w-32">
                  Vote <span className="ml-1 align-middle inline-block text-gray-400">ⓘ</span>
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700 text-sm w-40">
                  Total points <span className="ml-1 align-middle inline-block text-gray-400">ⓘ</span>
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700 text-sm w-56">
                  Comments <span className="ml-1 align-middle inline-block text-gray-400">ⓘ</span>
                </th>
                <th className="py-4 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => {
                const proCount = proposal.votes.filter((v) => v.type === "pro").length;
                const conCount = proposal.votes.filter((v) => v.type === "against").length;
                const totalPoints = proCount - conCount;

                return (
                  <tr
                    key={proposal.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    {/* Voting radio */}
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-start gap-4">
                        <div>
                          <div className="text-base font-medium text-gray-900 mb-1">
                            {proposal.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <ProposalVoteModal
                        proposalDescription={proposal.description}
                        proposalId={proposal.id}
                        onSubmit={handleVote}
                        trigger={
                          <button
                            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                          >
                            Vote
                          </button>
                        }
                      />
                    </td>
                    {/* Total points */}
                    <td className="py-4 px-4 text-center align-top">
                      <span className="text-lg font-bold text-gray-800">{totalPoints}</span>
                    </td>
                    {/* Comments */}
                    <td className="py-4 px-4 text-center align-top">
                        <CommentCountCell proCount={proCount} conCount={conCount} />
                    </td>
                    {/* Comment icon */}
                    <td className="py-4 px-4 text-center align-top">
                    <CommentListModal
                        proposalDescription={proposal.description}
                        votes={proposal.votes}
                        trigger={
                      <button
                        className="p-2 rounded hover:bg-gray-100 transition"
                        aria-label="Open comments"
                      >
                        <FiMessageSquare className="w-5 h-5 text-gray-500" />
                      </button>
                      }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function LegendItem({
  color,
  border,
  text,
  isComment = false,
}: {
  color: string;
  border: string;
  text: string;
  isComment?: boolean;
}) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`inline-block w-4 h-4 rounded-full ${isComment
          ? `border-2 border-${border} ${color ? `bg-${color}` : ""}`
          : `border-2 border-${border} bg-white`
          }`}
        style={
          isComment
            ? { backgroundColor: color.startsWith("bg-") ? undefined : `var(--tw-${color})` }
            : undefined
        }
      />
      <span
        className={`${isComment
          ? color === "green-100"
            ? "text-green-600"
            : color === "red-100"
              ? "text-red-600"
              : ""
          : color === "green-500"
            ? "text-green-600"
            : color === "red-500"
              ? "text-red-600"
              : ""
          }`}
      >
        {text}
      </span>
    </span>
  );
}

interface CommentCountCellProps {
  proCount?: number;
  conCount?: number;
}

export const CommentCountCell: React.FC<CommentCountCellProps> = ({
  proCount = 0,
  conCount = 0,
}) => {
  // Don't display anything if there are no pros or cons
  if (proCount === 0 && conCount === 0) return null;

  return (
    <div className="flex gap-2 items-center whitespace-nowrap">
      {proCount > 0 && (
        <button
          className="bg-green-500 text-black rounded-full px-3 py-0.5 text-sm leading-none"
          style={{ display: "inline-block" }}
        >
          {proCount} comment{proCount > 1 ? "s" : ""}
        </button>
      )}
      {conCount > 0 && (
        <button
          className="bg-red-500 text-black rounded-full px-3 py-0.5 text-sm leading-none"
          style={{ display: "inline-block" }}
        >
          {conCount} comment{conCount > 1 ? "s" : ""}
        </button>
      )}
      {/* End of Selection */}
      {proCount === 0 && conCount === 0 && (
        <span className="text-gray-400 text-lg">No comments added</span>
      )}
    </div>
  );
};
