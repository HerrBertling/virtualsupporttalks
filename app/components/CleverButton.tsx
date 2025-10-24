import type { ReactNode } from "react";
import CleverLink from "./CleverLink";

type buttonVariant = "primary" | "secondary";

type CleverButtonProps = {
	variant?: buttonVariant;
	children: ReactNode;
	to: string;
};

export default function CleverButton({ children, variant = "primary", to }: CleverButtonProps) {
	const variantClass =
		variant === "primary" ? "bg-vsp-500" : variant === "secondary" ? "bg-slate-400" : "";
	return (
		<CleverLink
			to={to}
			className={`font-inherit inline-flex items-center justify-center rounded-md py-4 px-8 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg ${variantClass}`}
		>
			{children}
		</CleverLink>
	);
}
