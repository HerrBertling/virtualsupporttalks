// This component is not being used at the moment

import { useState } from "react";

export default function ArrowFilterIcon() {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="mx-4 hover:text-vsp-500">
			<div className="accordion-item">
				<button
					type="button"
					className="accordion-title"
					onClick={() => setIsActive(!isActive)}
					aria-expanded={isActive}
					aria-label="Toggle filter"
				>
					<div>
						{isActive ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6 "
								aria-label="Collapse"
								role="img"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
								aria-label="Expand"
								role="img"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
							</svg>
						)}
					</div>
				</button>
			</div>
		</div>
	);
}
