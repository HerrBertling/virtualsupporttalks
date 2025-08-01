import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData } from "react-router";
import { getCoaches } from "~/utils/contentful";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const pw = formData.get("pw");

  console.log({ pw, envPw: process.env.CSV_DOWNLOAD_PW });

  if (pw !== process.env.CSV_DOWNLOAD_PW) {
    return { error: "wrong password", body: null };
  }
  const coaches = await getCoaches();

  const csvHeader = "Name,E-Mail,Webseite,Telefon,Sprachen,Geschlechter,\n";

  const csvBody = coaches
    .map(
      (coach) =>
        `${coach.fields?.name ?? ""},${coach.fields?.email ?? ""},${coach.fields?.url ?? ""},${coach.fields?.phone ?? ""},${coach.fields?.languages?.join("; ") ?? ""},${coach.fields.gender?.join("; ") ?? ""},`,
    )
    .join("\n");

  const csv = `${csvHeader}${csvBody}`;

  return { body: csv, error: null };
}

export default function Component() {
  const actionData = useActionData<typeof action>();

  const error = actionData?.error ?? null;

  const downloadCSV = () => {
    if (!actionData?.body) return;
    const csvData = new Blob([actionData?.body], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `coaches-data.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto max-w-6xl py-40 px-2 md:px-4 lg:px-8">
      <div className="flex flex-col gap-12">
        <h1 className="text-3xl">Daten herunterladen</h1>
        <Form
          reloadDocument
          method="POST"
          className="flex flex-col gap-4 max-w-md"
        >
          <label className="flex flex-col gap-2">
            <span>Download-Passwort</span>
            <input
              className="p-2 rounded-sm border border-slate-400 active:border-vsp-500"
              name="pw"
              type="password"
            />
            {error ? (
              <span className="text-red-600 text-sm">
                Falsches Passwort, sorry!
              </span>
            ) : null}
          </label>
          <button
            type="submit"
            className="font-inherit inline-flex items-center justify-center rounded-md py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg bg-vsp-500"
          >
            Download anfragen
          </button>
        </Form>
        {actionData?.body ? (
          <button
            type="button"
            onClick={() => {
              downloadCSV();
            }}
            className="font-inherit inline-flex items-center justify-center rounded-md py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg bg-vsp-500"
          >
            CSV herunterladen
          </button>
        ) : null}
      </div>
    </div>
  );
}
