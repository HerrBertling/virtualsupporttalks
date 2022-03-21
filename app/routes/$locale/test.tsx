import { useTranslation } from "react-i18next";

export default function test() {
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto max-w-6xl">
      <h1>{t("key")}</h1>
    </div>
  );
}
