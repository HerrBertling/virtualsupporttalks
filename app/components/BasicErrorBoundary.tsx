import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function BasicErrorBoundary() {
	// @ts-expect-error
	const error: { status: number; statusText: string } = useRouteError();
	const status = isRouteErrorResponse(error) ? error.status : 500;
	const statusText = isRouteErrorResponse(error)
		? error.statusText
		: error instanceof Error
			? error.message
			: "Unknown Error";
	return (
		<div className="mx-auto min-h-[50vh] w-screen max-w-3xl px-4 pt-32 pb-12">
			<div className="prose prose-lg prose-slate lg:prose-xl">
				<h2>Oh no! A {status} error! 🙀</h2>
				{status === 404 && <p>We couldn't find that page! 😬</p>}
				{status !== 404 && statusText && <p>Some error happened! 😬</p>}
				{status !== 404 && !statusText && <p>Some unkown error happened! 😬</p>}
				{statusText && (
					<>
						<p>This is what the machines tell us 🤖</p>
						<pre className="bg-slate-700">
							<code>{statusText}</code>
						</pre>
					</>
				)}
			</div>
		</div>
	);
}
