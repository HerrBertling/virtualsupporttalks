export default function GlobeAltIcon({ classNames = "h-6 w-6" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classNames}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
			aria-label="Globe"
			role="img"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
			/>
		</svg>
	);
}
