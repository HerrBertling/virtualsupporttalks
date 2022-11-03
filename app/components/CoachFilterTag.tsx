import type { ReactNode } from "react";
import { trackFilterClick } from "~/utils/gtag.client";
import Lifebuoy from "./icons/Lifebuoy";

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
  const isDeepCrisisTag = (): boolean | undefined => {
    return children?.toString().includes("1.");
  };
  return (
    <label className={`min-h-4 mr-1 mb-1 ${isDeepCrisisTag() && " block"}`}>
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
      <span
        className={`${
          isDeepCrisisTag() ? "mb-4 text-orange-800" : "m-1 text-vsp-900"
        } " inline-flex cursor-pointer rounded-full bg-vsp-200 px-4 py-1 text-[1rem] hover:bg-vsp-300 peer-checked:bg-vsp-700 peer-checked:text-white peer-disabled:pointer-events-none peer-disabled:cursor-default peer-disabled:opacity-40`}
      >
        {isDeepCrisisTag() && <Lifebuoy />}
        <span>{children}</span>
      </span>
    </label>
  );
}
