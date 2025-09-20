interface LoaderRowProps {
    text: string
}

const LoaderRow: React.FC<LoaderRowProps> = ({ text }) => {
    return (
        <tr>
            <td colSpan={3} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 text-lg">{text}</p>
                </div>
            </td>
        </tr>
    );
};

export default LoaderRow;