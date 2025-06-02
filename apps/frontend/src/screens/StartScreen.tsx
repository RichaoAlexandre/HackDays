import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";

export const StartScreen = () => {
  // For demo, hardcode joined/total participants
  const joined = 3;
  const total = 10;

  const location = useLocation();
  const isOwner = location.state?.isOwner || "";
  const uuid = useParams()
  const shareLink = location.state?.shareLink || "";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        setCopied(false);
      }
    }
  };

  const navigate = useNavigate(); // workaround for context

  const handleJoinWorkshop = () => {
    navigate("/wait");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Workshop Start Screen Title
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Magna tellus dictumst amet eu auctor tempor magna arcu magna. Ultrices velit egestas augue iaculis sit scelerisque. Curabitur augue nisl adipiscing sit.
        </p>
        {shareLink && (
          <div className="mb-6 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <a
                href={shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {shareLink}
              </a>
              <button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              Share this link with participants to join the workshop
            </span>
          </div>
        )}
        {isOwner ? (
          <button
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start workshop
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            onClick={handleJoinWorkshop}
          >
            Join workshop 
          </button>
        )}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-900 font-semibold text-sm">
            {joined}
          </span>
          <span className="text-sm text-gray-500">
            out of {total} participants joined the workshop
          </span>
        </div>
      </div>
    </div>
  );
}
