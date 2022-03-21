import { json, LoaderFunction, useLoaderData } from "remix";

import { useTranslation } from "react-i18next";

export default function SupportMedia() {
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto max-w-6xl">
      <h1>{t("key")}</h1>
    </div>
  );
}
