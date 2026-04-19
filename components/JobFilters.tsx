"use client";

import type { Category } from "@/lib/api/endpoints/enumsApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const WORKPLACE_OPTIONS = [
    { value: "", label: "Any" },
    { value: "ON_SITE", label: "On-Site" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "REMOTE", label: "Remote" },
] as const;

const EMPLOYMENT_OPTIONS = [
    { value: "", label: "Any" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
] as const;

type JobFiltersProps = {
    categories: Category[];
};

export default function JobFilters({ categories }: JobFiltersProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const applyParams = useCallback(
        (mutator: (params: URLSearchParams) => void) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", "1");
            mutator(params);
            replace(`${pathname}?${params.toString()}`);
        },
        [searchParams, pathname, replace],
    );

    const workplace = searchParams.get("workplaceType") ?? "";
    const employment = searchParams.get("employmentType") ?? "";
    const category = searchParams.get("category") ?? "";

    /** Remount salary inputs when URL salary params change (back/forward, cleared, etc.). */
    const salaryFieldsKey = `${searchParams.get("salaryMin") ?? ""}\u0000${searchParams.get("salaryMax") ?? ""}`;

    const commitSalary = useDebouncedCallback(
        (key: "salaryMin" | "salaryMax", raw: string) => {
            const params = new URLSearchParams(window.location.search);
            params.set("page", "1");
            const trimmed = raw.trim();
            if (!trimmed) {
                params.delete(key);
            } else {
                const n = Number(trimmed);
                if (!Number.isFinite(n) || n < 0) {
                    params.delete(key);
                } else {
                    params.set(key, String(Math.floor(n)));
                }
            }
            replace(`${pathname}?${params.toString()}`);
        },
        400,
        { leading: false, trailing: true },
    );

    const pillBase =
        "px-3 py-1.5 rounded-xl text-sm font-medium transition border";
    const pillInactive =
        "border-gray-200 bg-white text-gray-800 hover:bg-gray-50";
    const pillActive = "border-accent bg-accent text-secondary";

    const selectClass =
        "min-w-[12rem] h-10 px-3 rounded-xl border border-gray-200 bg-accent-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-accent";

    return (
        <div className="flex flex-col gap-2 w-full max-w-5xl mx-auto">
            <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="flex items-center justify-between gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition"
                aria-expanded={filtersOpen}
            >
                <span>Job filters</span>
                <span
                    className={`text-gray-500 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                    aria-hidden
                >
                    ▼
                </span>
            </button>

            {filtersOpen && (
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600 w-full sm:w-auto sm:min-w-[7rem]">
                            Category
                        </span>
                        <select
                            value={category}
                            onChange={(e) =>
                                applyParams((params) => {
                                    const v = e.target.value;
                                    if (!v) params.delete("category");
                                    else params.set("category", v);
                                })
                            }
                            className={selectClass}
                        >
                            <option value="">Any</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600 w-full sm:w-auto sm:min-w-[7rem]">
                            Workplace
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {WORKPLACE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value || "any-w"}
                                    type="button"
                                    className={`${pillBase} ${
                                        workplace === opt.value
                                            ? pillActive
                                            : pillInactive
                                    }`}
                                    onClick={() =>
                                        applyParams((params) => {
                                            if (!opt.value)
                                                params.delete(
                                                    "workplaceType",
                                                );
                                            else
                                                params.set(
                                                    "workplaceType",
                                                    opt.value,
                                                );
                                        })
                                    }
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600 w-full sm:w-auto sm:min-w-[7rem]">
                            Employment
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {EMPLOYMENT_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value || "any-e"}
                                    type="button"
                                    className={`${pillBase} ${
                                        employment === opt.value
                                            ? pillActive
                                            : pillInactive
                                    }`}
                                    onClick={() =>
                                        applyParams((params) => {
                                            if (!opt.value)
                                                params.delete(
                                                    "employmentType",
                                                );
                                            else
                                                params.set(
                                                    "employmentType",
                                                    opt.value,
                                                );
                                        })
                                    }
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-end gap-4">
                        <span className="text-sm text-gray-600 w-full sm:w-auto sm:min-w-[7rem] sm:pt-2">
                            Salary
                        </span>
                        <div
                            key={salaryFieldsKey}
                            className="flex flex-wrap gap-3 items-center"
                        >
                            <label className="flex flex-col gap-1 text-xs text-gray-500">
                                Min
                                <input
                                    type="number"
                                    min={0}
                                    inputMode="numeric"
                                    placeholder="Min"
                                    defaultValue={
                                        searchParams.get("salaryMin") ?? ""
                                    }
                                    onChange={(e) =>
                                        commitSalary(
                                            "salaryMin",
                                            e.target.value,
                                        )
                                    }
                                    className="w-36 h-10 px-3 rounded-xl border border-gray-200 bg-accent-2 focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-xs text-gray-500">
                                Max
                                <input
                                    type="number"
                                    min={0}
                                    inputMode="numeric"
                                    placeholder="Max"
                                    defaultValue={
                                        searchParams.get("salaryMax") ?? ""
                                    }
                                    onChange={(e) =>
                                        commitSalary(
                                            "salaryMax",
                                            e.target.value,
                                        )
                                    }
                                    className="w-36 h-10 px-3 rounded-xl border border-gray-200 bg-accent-2 focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
