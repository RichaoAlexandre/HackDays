interface SpecCardProps {
    decisionTitle: string;
    decisionContext: string;
    duration: {
        hours: number;
        minutes: number;
    };
    participants: number;
    displayButtons?: boolean
}

export const SpecCard = ({ decisionTitle, decisionContext, duration, participants, displayButtons=true }: SpecCardProps) => {

    return (<div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                Decision making workshop preview
            </h1>
            <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Massa venenatis fermentum orci eget tempus lacus maecenas.
            </p>
        </div>

        <div className="space-y-6">
            <div>
                <h2 className="text-sm font-medium text-gray-900 mb-2">Decision title</h2>
                <p className="text-gray-600">{decisionTitle}</p>
            </div>

            <div>
                <h2 className="text-sm font-medium text-gray-900 mb-2">Decision context</h2>
                <p className="text-gray-600">{decisionContext}</p>
            </div>

            <div>
                <h2 className="text-sm font-medium text-gray-900 mb-2">Workshop duration</h2>
                <p className="text-gray-600">
                    {duration.hours} {duration.hours === 1 ? 'hour' : 'hours'}
                    {duration.minutes > 0 && ` and ${duration.minutes} ${duration.minutes === 1 ? 'minute' : 'minutes'}`}
                </p>
            </div>

            <div>
                <h2 className="text-sm font-medium text-gray-900 mb-2">Number of participants</h2>
                <p className="text-gray-600">{participants}</p>
            </div>

            {displayButtons && <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    className="flex-1 px-8 py-3 border border-black rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    Go back
                </button>
                <button
                    type="button"
                    color="black"
                    className="text-white bg-black flex-1 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                    Generate workshop link
                </button>
            </div>}
        </div>
    </div>)
}