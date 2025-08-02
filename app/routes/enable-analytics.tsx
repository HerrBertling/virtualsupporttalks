import type { ActionFunction } from "react-router";
import { data } from "react-router";
import { gdprConsent } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  if (formData.get("accept-gdpr") === "true") {
    return data(
      { success: true },
      {
        headers: {
          "Set-Cookie": await gdprConsent.serialize({ gdprConsent: true }),
        },
      },
    );
  }
};
