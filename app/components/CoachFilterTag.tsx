import type { ReactNode } from "react";

type CoachFilterTagProps = {
  key: string;
  value: string;
  defaultValue: boolean;
  children: ReactNode;
  type: "radio" | "checkbox";
};

export default function CoachFilterTag({
  key,
  value,
  defaultValue,
  children,
  type,
}: CoachFilterTagProps) {
  return (
    <label className="min-h-4 mr-1 mb-1 inline-block" key={key}>
      <input
        className="peer sr-only"
        type={type}
        name="lang"
        value={value}
        defaultChecked={defaultValue}
      />
      <span className="inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 peer-checked:bg-gray-500 peer-checked:text-white">
        <span>{children}</span>
      </span>
    </label>
  );
}
