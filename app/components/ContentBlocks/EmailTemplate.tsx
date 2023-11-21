import type { IEmailTemplateFields } from "../../../@types/generated/contentful";

export default function EmailTemplate({
  subject,
  emailTemplate,
}: IEmailTemplateFields) {
  return (
    <section>
      <div>
        <h1>{subject}</h1>
        <p>{emailTemplate}</p>
      </div>
    </section>
  );
}
