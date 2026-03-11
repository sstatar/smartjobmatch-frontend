import ReactMarkdown from "react-markdown";

interface JobDetailCardProps {
    content: string;
}

export default function JobDetailCard({ content }: JobDetailCardProps) {
    return (
        <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
            <h1 className="text-heading-3 font-semibold">Job details</h1>
            <div className="markdown">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
