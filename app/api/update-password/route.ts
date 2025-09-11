/* eslint-disable import/no-unused-modules */
import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../utils/emailUtils";

export async function POST(req: NextRequest) {
  try {
    const { email, resetLink } = await req.json();

    const html = formatEmail(email, resetLink);
    await sendEmail(email, "Password Reset Request", html, [email]);

    return NextResponse.json({
      message: "Successfully sent password reset email",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
