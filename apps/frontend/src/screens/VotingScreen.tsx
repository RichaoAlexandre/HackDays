import { useEffect, useRef, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { ProposalVoteModal } from "../components/ProposalVoteModal";
import { CommentListModal } from "../components/CommentListModal";
import { useParams } from "react-router";

type Vote = {
  type: "pro" | "against";
  comment: string;
};

type Proposal = {
  id: number;
  description: string;
  votes: Vote[];
};


const BACKEND_URL = 'http://localhost:8000'

export const VotingScreen = () => {
  const params = useParams()
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [scores, setScores] = useState({})
  const [votes, setVotes] = useState({});
  const wsRef = useRef(null);

  // For demo, timer is static
  const timer = "05:24:00";

  useEffect(() => {
    if (params.uuid) {
      // url of websocket: <url>/ws/decision/<decision_id>/current_step/
      const wsUrl = `ws://localhost:8000/ws/decision/${params.uuid}/votes/`;
  
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
  
      ws.onopen = () => {
        console.log("WebSocket connecté pour process", 1);
      };
  
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "vote.update") {
            setScores(prev => ({
              ...prev,
              [data.vote.proposal_id]: data.vote.proposal_score
            }))
            setVotes(prev => {
              const newVote = data.vote
              const oldVotes = prev[data.vote.proposal_id] || [];
              const newVotes = [...oldVotes, newVote];
              return {
                ...prev,
                [data.vote.proposal_id]: newVotes
              };
            })
          }
          if (data.type === "vote.list") {
            const grouped = {};
            data.votes.forEach(item => {
              const key = item.proposal_id;
              if (!grouped[key]) {
                grouped[key] = [];
              }
              grouped[key].push(item);
            });
            setVotes(grouped)
          }
          if (data.type === "proposal.score") {
            const initialScores = {}
            for(const score of data.proposal_scores){
              initialScores[score.proposal_id] = score.score
            }
            setScores(initialScores)
          }
        } catch (err) {
          console.error("Erreur lors du parsing du JSON WebSocket :", err);
        }
      };
  
      ws.onerror = (error) => {
        console.error("WebSocket error :", error);
      };
  
      ws.onclose = (e) => {
        console.log("WebSocket fermé :", e);
        // Si nécessaire, tenter une reconnexion ici
      };
  
      return () => {
        if (wsRef.current) wsRef.current.close();
      };

    }
  }, [params.uuid]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/decision/${params.uuid}/proposals/`, {
          method: 'GET',
        });
        const data = await response.json();
        setProposals(data)
        setScores(
          data.map(
            p => {
              return {[p["id"]]: 0}
            }
          )
        )
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (params.uuid) {
      fetchProposals()
    }
  }, [params.uuid])

  const handleVote = async ( type: "P" | "C",proposalId: number,comment: string) => {
    try {
      const vote = {
        type: type,
        proposal_id: proposalId,
        comment: comment,
      }
      const response = await fetch( `${BACKEND_URL}/api/vote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote)
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const getTypeVoteCount = (proposalId, voteType) => {
    if (votes[proposalId]) {
      return votes[proposalId].filter((v) => v.type === voteType).length
    }
    return 0
  }

  const getVoteForProposal = proposalId => {
    return votes[proposalId] ? votes[proposalId] : []
  }

  const getComponentListModal = (proposalId, proposalDescription) => {
    return (
      <CommentListModal
        proposalDescription={proposalDescription}
        votes={getVoteForProposal(proposalId)}
        trigger={
      <button
        className="p-2 rounded hover:bg-gray-100 transition"
        aria-label="Open comments"
      >
        <FiMessageSquare className="w-5 h-5 text-gray-500" />
      </button>
      }
      />
    )
  }

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
                let proCount = getTypeVoteCount(proposal.id, "P")
                let conCount = getTypeVoteCount(proposal.id, "C")

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
                      <span className="text-lg font-bold text-gray-800">{scores[proposal.id]}</span>
                    </td>
                    {/* Comments */}
                    <td className="py-4 px-4 text-center align-top">
                        <CommentCountCell 
                          proCount={getTypeVoteCount(proposal.id, "P")}
                          conCount={getTypeVoteCount(proposal.id, "C")}
                        />
                    </td>
                    {/* Comment icon */}
                    <td className="py-4 px-4 text-center align-top">
                    {getComponentListModal(proposal.id, proposal.description)}
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
