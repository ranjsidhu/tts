"use server";

import type { FormData } from "@/app/types";

const SEND_EMAIL_ROUTE = `${process.env.NEXT_PUBLIC_SITE_URL}/api/enquiry`;

const sendEmail = async (formData: FormData) => {
  await fetch(SEND_EMAIL_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export { sendEmail };
