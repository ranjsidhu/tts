import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../../utils/emailUtils";

export async function POST(req: NextRequest) {
  try {
    const {
      studentName,
      parentName,
      parentPhone,
      parentEmail,
      subjects,
      currentSchool,
      yearGroup,
      tutoringPreference,
      availability,
      message,
    } = await req.json();

    const html = formatEmail(
      studentName,
      parentName,
      parentPhone,
      parentEmail,
      subjects,
      currentSchool,
      yearGroup,
      tutoringPreference,
      availability,
      message
    );
    await sendEmail(parentEmail, "New Contact Form Submission", html);

    return NextResponse.json({ message: "Successfully sent enquiry" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
