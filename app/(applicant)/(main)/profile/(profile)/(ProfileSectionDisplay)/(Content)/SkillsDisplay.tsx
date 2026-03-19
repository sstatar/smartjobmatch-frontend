import InfoTag from "@/components/ui/InfoTag";

interface SkillsProps {
    skills: string[];
}

export default function SkillsDisplay({ skills }: SkillsProps) {
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-2">
            {skills.map((skill, index) => (
                <InfoTag 
                    key={index} 
                    text={skill} 
                />
            ))}
        </div>
    );
}