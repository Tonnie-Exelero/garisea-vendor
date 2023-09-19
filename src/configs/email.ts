import { render } from "@react-email/render";

export const sendEmail = async (props: any) => {
  const { name, to, subject, template } = props;
  const payload = {
    name,
    to,
    subject,
    html: render(template),
  };

  await fetch(`/api/emails/send`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
