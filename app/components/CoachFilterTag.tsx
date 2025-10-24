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
	isHighlighted: boolean;
};

export default function CoachFilterTag({
	value,
	name,
	defaultValue,
	disabled,
	children,
	type,
	isHighlighted,
}: CoachFilterTagProps) {
	return (
		<label className="min-h-4">
			<input
				className="peer sr-only"
				type={type}
				name={name}
				value={value}
				defaultChecked={defaultValue}
				disabled={disabled}
				onClick={() =>
					trackFilterClick({
						category:
							name === "lang" ? "coachLanguage" : name === "gender" ? "coachGender" : "coachTag",
						type:
							type === "radio"
								? "select"
								: type === "checkbox"
									? "checked"
									: defaultValue
										? "unselect"
										: "select",

						label: children as string,
					})
				}
			/>

			<span
				className={`${
					isHighlighted ? "text-orange-800" : "text-vsp-900"
				} inline-flex cursor-pointer items-center rounded-full bg-vsp-200 px-4 py-1 text-[1rem] hover:bg-vsp-400 peer-checked:bg-vsp-700 peer-checked:text-white peer-disabled:pointer-events-none peer-disabled:cursor-default peer-disabled:opacity-40`}
			>
				{isHighlighted && <Lifebuoy classNames="h-4 w-4 mr-2" />}
				<span>{children}</span>
			</span>
		</label>
	);
}
