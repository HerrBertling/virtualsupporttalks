import { useState } from "react";

type ToggleInputProps = {
  name: string;
  checked: boolean;
};

export default function ToggleInput({ name, checked }: ToggleInputProps) {
  return (
    <label htmlFor={name} className="flex cursor-pointer items-center">
      <div className="relative">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="peer sr-only"
          defaultChecked={checked}
        />
        <div className="h-8 w-14 rounded-full bg-gray-600 peer-checked:bg-vsp-500" />
        <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-full" />
      </div>
      <div className="ml-3 font-medium text-gray-700">
        <span>{checked ? "cookie.deactivate" : "cookie.activate"}</span>
      </div>
    </label>
  );
}
