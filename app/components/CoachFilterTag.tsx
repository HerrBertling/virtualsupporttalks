import type { ReactNode } from "react";
import { trackFilterClick } from "~/utils/gtag.client";

type CoachFilterTagProps = {
  value: string;
  name: string;
  defaultValue: boolean;
  disabled: boolean;
  children: ReactNode;
  type: "radio" | "checkbox";
};

export default function CoachFilterTag({
  value,
  name,
  defaultValue,
  disabled,
  children,
  type,
}: CoachFilterTagProps) {
  return (
    <label className="min-h-4 mr-1 mb-1 inline-block">
      <input
        className="peer sr-only"
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultValue}
        disabled={disabled}
        onClick={() =>
          trackFilterClick({
            category: type === "radio" ? "coachLanguage" : "coachTag",
            type:
              type === "radio"
                ? "select"
                : defaultValue
                ? "unselect"
                : "select",
            label: children as string,
          })
        }
      />
      <span className="inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 peer-checked:bg-slate-500 peer-checked:text-white peer-disabled:pointer-events-none peer-disabled:cursor-default peer-disabled:opacity-40">
        <span>{children}</span>
      </span>
    </label>
  );
}
