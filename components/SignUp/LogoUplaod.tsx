import { useLogoUpload } from "@/lib/hooks/useLogoUpload";
import { useRef } from "react";
import { Input } from "../ui/input";

export default function LogoUpload({
  disabled,
  onChange,
}: {
  disabled: boolean;
  onChange: (file: File | null) => void;
}) {
  const {
    logo,
    logoPreview,
    logoName,
    dragging,
    handleFile,
    onDrop,
    onDragOver,
    onDragLeave,
    removeLogo,
  } = useLogoUpload();

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <label className="block text-xs text-muted-foreground mb-1.5">
        Restaurant Logo <br />
      </label>
      <div
        className={`relative border rounded transition-colors cursor-pointer
                ${dragging ? "border-[] bg-[muted-foreground]/5" : "border-[primary] hover:border-[#f5f0e8] "}
                    ${logo ? "p-4" : "p-8"}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Input
          className="hidden"
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
              onChange(file);
            }
          }}
          disabled={disabled}
        />
        {logo ? (
          <div className="flex items-center gap-4">
            <img
              src={logoPreview ?? " "}
              alt="Logo preview"
              className="w-14 h-14 object-contain rounded bg-[#2e2b25] p-1"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#f5f0e8] text-sm truncate">{logoName}</p>
              <p className="text-[#8b8070] text-xs mt-0.5">Click to replace</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeLogo();
                onChange(null);
              }}
              className="text-[#4a4740] hover:text-[#f5f0e8] transition-colors p-1"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-10 h-10 rounded border border-[#2e2b25] flex items-center justify-center mx-auto mb-3 bg-[#1a1814]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8b8070"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="text-[#f5f0e8] text-sm mb-1">Drop your logo here</p>
            <p className="text-[#8b8070] text-xs">PNG, JPG, SVG — up to 5 MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
