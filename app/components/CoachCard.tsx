import type { Asset } from "contentful";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { ReactCountryFlag } from "react-country-flag";
import { useTranslation } from "react-i18next";
import GlobeIcon from "~/components/icons/GlobeIcon";
import MailIcon from "~/components/icons/MailIcon";
import PhoneIcon from "~/components/icons/PhoneIcon";
import getFlagCode from "~/utils/getFlagCodes";
import { trackCoachClick } from "~/utils/gtag.client";

// Context to share coach name across subcomponents
type CoachCardContextType = {
	coachName?: string;
};

const CoachCardContext = createContext<CoachCardContextType>({});

// Root component
type CoachCardRootProps = {
	children: ReactNode;
	emergency?: boolean;
	coachName?: string;
};

function CoachCardRoot({ children, emergency, coachName }: CoachCardRootProps) {
	const { t } = useTranslation("searchingCoach");

	return (
		<CoachCardContext.Provider value={{ coachName }}>
			<article className="mb-3 break-inside-avoid relative grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 overflow-hidden rounded-md bg-white px-3 py-3 shadow-lg">
				{children}
				{emergency && (
					<span className="absolute right-4 top-0 w-48 translate-x-16 translate-y-8 rotate-45 transform bg-orange-300 py-1 text-center text-xs text-orange-900 shadow-md">
						{t("emergency")}
					</span>
				)}
			</article>
		</CoachCardContext.Provider>
	);
}

// Avatar component
type AvatarProps = {
	image?: Asset;
	name?: string;
};

function Avatar({ image, name }: AvatarProps) {
	const imagePath = image?.fields?.file?.url;

	if (!imagePath) {
		return (
			<div className="shadow-inset-md col-start-1 row-start-1 h-16 w-16 overflow-hidden rounded-full bg-slate-200" />
		);
	}

	return (
		<div className="shadow-inset-md col-start-1 row-start-1 h-16 w-16 overflow-hidden rounded-full">
			<picture>
				<source
					srcSet={`${imagePath}?w=120&h=120&fm=avif&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=avif&f=face&fit=thumb 2x`}
					type="image/avif"
				/>
				<source
					srcSet={`${imagePath}?w=120&h=120&fm=webp&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=webp&f=face&fit=thumb 2x`}
					type="image/webp"
				/>
				<source
					srcSet={`${imagePath}?w=120&h=120&fm=jpeg&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=jpeg&f=face&fit=thumb 2x`}
					type="image/jpeg"
				/>
				<img
					src={`${imagePath}?w=120&h=120&f=face&fit=thumb`}
					alt={name}
					className="h-full w-full object-cover"
					width="80"
					height="80"
					loading="lazy"
				/>
			</picture>
		</div>
	);
}

// Header component
type HeaderProps = {
	children: ReactNode;
};

function Header({ children }: HeaderProps) {
	return <header className="col-start-2 row-start-1 self-center">{children}</header>;
}

// Name component
type NameProps = {
	children: ReactNode;
};

function Name({ children }: NameProps) {
	return <h3 className="text-xl font-bold text-slate-500">{children}</h3>;
}

// Meta section (for languages and badges)
type MetaProps = {
	children: ReactNode;
};

function Meta({ children }: MetaProps) {
	return (
		<section className="inline-flex items-center justify-center gap-2 px-1">{children}</section>
	);
}

// Languages component
type LanguagesProps = {
	languages?: string[];
};

function Languages({ languages }: LanguagesProps) {
	const { t } = useTranslation("searchingCoach");
	const flagCodes = getFlagCode(languages);

	if (!languages || languages.length === 0) return null;

	return (
		<p className="text-sm font-extralight text-slate-500">
			{t("languages")}
			{flagCodes.map((lang, index) => (
				<ReactCountryFlag
					key={index}
					className="px-1"
					style={{
						fontSize: "1.2em",
					}}
					countryCode={lang}
				/>
			))}
		</p>
	);
}

// Badge component (for MHFA training)
type BadgeProps = {
	image?: Asset;
	label?: string;
};

function Badge({ image, label }: BadgeProps) {
	const imagePath = image?.fields?.file?.url;

	if (!imagePath || typeof imagePath !== "string") return null;

	return (
		<>
			|
			<div className="inline-flex items-center">
				<picture>
					<source
						srcSet={`${imagePath}?w=25&h=25&fm=png, ${imagePath}?w=240&h=240&fm=png&f=face&fit=thumb 2x`}
						type="image/png"
					/>
					<img
						src={imagePath}
						alt={label}
						className="ml-1 p-1 w-6 h-6 object-contain"
						loading="lazy"
					/>
				</picture>
				{label && (
					<span className="absolute pl-10 text-center text-sm text-slate-500 opacity-0 duration-300 hover:opacity-100">
						{label}
					</span>
				)}
			</div>
		</>
	);
}

// Description component
type DescriptionProps = {
	children: ReactNode;
};

function Description({ children }: DescriptionProps) {
	return <div className="prose prose-sm prose-slate col-span-full row-start-2">{children}</div>;
}

// Contacts container
type ContactsProps = {
	children: ReactNode;
};

function Contacts({ children }: ContactsProps) {
	return (
		<div className="col-span-2 col-start-1 flex flex-row justify-between gap-2">{children}</div>
	);
}

// Contact button components
type ContactButtonProps = {
	href: string;
	type: "email" | "phone" | "website";
	label?: string;
};

function ContactButton({ href, type, label }: ContactButtonProps) {
	const { t } = useTranslation("searchingCoach");
	const { coachName } = useContext(CoachCardContext);

	const icons = {
		email: <MailIcon classNames="h6 mr-1 w-6" />,
		phone: <PhoneIcon classNames="h6 mr-1 w-6" />,
		website: <GlobeIcon classNames="h6 mr-1 w-6" />,
	};

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex w-full flex-grow items-center justify-center rounded-md border border-vsp-400 py-2 text-sm text-slate-600 no-underline transition-colors duration-200 hover:border-vsp-700 hover:bg-vsp-100 hover:text-vsp-900 focus:border-vsp-700 focus:bg-vsp-100 focus:text-vsp-900 active:border-vsp-700 active:bg-vsp-100 active:text-vsp-900"
			onClick={() => trackCoachClick({ type, coachName: coachName || "Unknown" })}
		>
			{icons[type]}
			<span>{label || t(type)}</span>
		</a>
	);
}

// Specialized contact components
type EmailProps = {
	email: string;
	subject?: string;
	body?: string;
	label?: string;
};

function Email({ email, subject = "Ich brauche Redezeit!", body, label }: EmailProps) {
	const defaultBody = encodeURI(
		"Hallo, ich würde gerne kostenfreie REDEZEIT in Anspruch nehmen und bitte um einen Termin.\n\nSie können mich unter dieser Email-Adresse oder unter folgender Telefonnummer erreichen:\n\nXXXXX XXXXX XXXX\n\nDanke für dieses wertvolle Angebot.\n\nNAME"
	);

	const href = `mailto:${email}?subject=${subject}&body=${body || defaultBody}`;

	return <ContactButton href={href} type="email" label={label} />;
}

type PhoneProps = {
	phone: string;
	label?: string;
};

function Phone({ phone, label }: PhoneProps) {
	return <ContactButton href={`tel:${phone}`} type="phone" label={label} />;
}

type WebsiteProps = {
	url: string;
	label?: string;
};

function Website({ url, label }: WebsiteProps) {
	return <ContactButton href={url} type="website" label={label} />;
}

// Export compound component
export const CoachCard = Object.assign(CoachCardRoot, {
	Avatar,
	Header,
	Name,
	Meta,
	Languages,
	Badge,
	Description,
	Contacts,
	Email,
	Phone,
	Website,
});

export default CoachCard;
