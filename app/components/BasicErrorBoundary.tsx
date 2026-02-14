import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function BasicErrorBoundary() {
  const { t } = useTranslation("error");
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
        <h2>{t("title", { status })}</h2>
        {status === 404 && <p>{t("notFound")}</p>}
        {status !== 404 && statusText && <p>{t("generic")}</p>}
        {status !== 404 && !statusText && <p>{t("unknown")}</p>}
        {statusText && (
          <>
            <p>{t("machineMessage")}</p>
            <pre className="bg-slate-700">
              <code>{statusText}</code>
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
