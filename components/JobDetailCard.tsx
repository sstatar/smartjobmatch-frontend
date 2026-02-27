import ReactMarkdown from "react-markdown";

export default function JobDetailCard({ content }: { content: string }) {
    return (
        <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
            <h1 className="text-heading-3 font-semibold">Job details</h1>
            <div className="markdown">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
