import React from 'react';

type InfoTagProps = {
    text: string;
    icon?: React.ElementType;
};

export default function InfoTag({ text, icon: Icon }: InfoTagProps) {
    return (
        <div className="
            flex items-center gap-2 
            px-4 py-2 
            bg-accent-2
            rounded-full 
            w-fit 
            max-w-[223px]
            max-h-[35px]
        ">
            {Icon && <Icon className="w-5 h-5 flex-shrink-0 text-black" />}
            
            <span className="text-sm font-medium text-black truncate">
                {text}
            </span>
        </div>
    );
}