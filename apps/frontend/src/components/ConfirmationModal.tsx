interface ConfirmationModalProps {
  onCancel: () => void;
  onCopyUrl: () => void;
}

export const ConfirmationModal = ({ onCancel, onCopyUrl }: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-center text-lg font-medium text-gray-900 mb-6">
          Workshop URL successfully created!
        </h2>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <button
            onClick={onCopyUrl}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
          >
            Copy URL
          </button>
        </div>
      </div>
    </div>
  );
};
