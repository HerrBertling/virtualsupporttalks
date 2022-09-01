export default function BasicCatchBoundary({
  status,
  statusText,
}: {
  status: number;
  statusText: string;
}) {
  return (
    <div className="mx-auto min-h-[50vh] w-screen max-w-3xl px-4 pt-32 pb-12">
      <div className="prose prose-lg prose-slate lg:prose-xl">
        <h2>Oh no! A {status} error! 🙀</h2>
        {status === 404 && <p>We couldn't find that page! 😬</p>}
        <p>This is what the machines tell us 🤖</p>
        <pre className="bg-slate-700">
          <code>{statusText}</code>
        </pre>
      </div>
    </div>
  );
}
