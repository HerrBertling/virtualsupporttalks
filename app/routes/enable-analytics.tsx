import type { ActionFunction } from "react-router";
import { json } from "react-router";
import { gdprConsent } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  if (formData.get("accept-gdpr") === "true") {
    return json(
      { success: true },
      {
        headers: {
          "Set-Cookie": await gdprConsent.serialize({
            gdprConsent: true,
          }),
        },
      },
    );
  }
};
