import { data } from "react-router";
import { gdprConsent } from "~/cookies";
import type { Route } from "./+types/enable-analytics";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  if (formData.get("accept-gdpr") === "true") {
    return data(
      { success: true },
      {
        headers: {
          "Set-Cookie": await gdprConsent.serialize({
            gdprConsent: true,
          }),
        },
      }
    );
  }
}
