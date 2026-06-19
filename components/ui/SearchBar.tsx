"use client";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}
export default function SearchBar({ value, onChange, onSearch } : SearchBarProps) {
  return (
    <div className="flex gap-2 w-full max-w-md">

      {/* 1. ช่องกรอกคําค้นหา */}
      <input
        type="text"
        placeholder="ค้นหาชื่องาน, ตำแหน่ง..."
        className="border-2 border-gray-300 rounded-md px-4 py-2 w-full" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      />

      {/* 2. ปุ่มกดค้นหา */}
      <button
        onClick={onSearch}
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 cursor-pointer"
      >
        Search
      </button>

    </div>
  );
}