"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    // ปิดด้วย ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // บล็อกไม่ให้พื้นหลังเลื่อนเวลาเปิด Modal
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // 1. ถ้ายังไม่ได้เปิด Modal ก็ return null ไปเลย
    if (!isOpen) return null;

    // 2. ป้องกัน Error จาก Next.js ฝั่ง Server (ถ้ายก Modal มาตอนกำลัง Render บน Server ให้ข้ามไปก่อน)
    if (typeof document === "undefined") return null;

    // ร่ายเวทมนตร์ createPortal โยนไปที่ document.body
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal content */}
            <div className="relative bg-white rounded-2xl shadow-xl p-6 w-auto max-w-[90vw] max-h-[90vh] overflow-auto z-10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-50 text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 hover:bg-gray-200"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>,
        document.body,
    );
}
