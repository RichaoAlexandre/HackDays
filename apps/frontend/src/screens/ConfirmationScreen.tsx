import { SpecCard } from "../components/SpecCard";

interface ConfirmationScreenProps {
  decisionTitle: string;
  decisionContext: string;
  duration: {
    hours: number;
    minutes: number;
  };
  participants: number;
}

export const ConfirmationScreen = ({ decisionTitle, decisionContext, duration, participants }: ConfirmationScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <SpecCard
        decisionTitle={decisionTitle}
        decisionContext={decisionContext}
        duration={duration}
        participants={participants}
        />
    </div>
  )
}
