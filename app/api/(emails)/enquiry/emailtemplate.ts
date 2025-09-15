export const formatEmail = (
  studentName: string,
  parentName: string,
  parentPhone: string,
  parentEmail: string,
  subjects: string,
  currentSchool: string,
  yearGroup: string,
  tutoringPreference: string,
  availability: string,
  message: string
) => {
  return `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Tuition Enquiry</title>
              </head>
              <body style="margin: 0; padding: 20px; background-color: #f6f6f6; font-family: Arial, sans-serif;">
                <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #000000; padding: 30px 40px; text-align: center;">
                      <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">New Student Enquiry</h1>
                      <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                        Received on ${new Date().toLocaleString("en-UK", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}
                      </p>
                    </td>
                  </tr>
    
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <!-- Student Information -->
                      <div style="margin-bottom: 30px;">
                        <h2 style="color: #000000; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
                          Student Information
                        </h2>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Student Name:</strong> 
                          <span style="color: #000000;">${studentName}</span>
                        </p>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Current School:</strong> 
                          <span style="color: #000000;">${
                            currentSchool ?? "Not provided"
                          }</span>
                        </p>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Year Group:</strong> 
                          <span style="color: #000000;">${
                            yearGroup ?? "Not provided"
                          }</span>
                        </p>
                      </div>
    
                      <!-- Parent Information -->
                      <div style="margin-bottom: 30px;">
                        <h2 style="color: #000000; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
                          Parent Information
                        </h2>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Parent Name:</strong> 
                          <span style="color: #000000;">${parentName}</span>
                        </p>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Contact Number:</strong> 
                          <span style="color: #000000;">${
                            parentPhone ?? "Not provided"
                          }</span>
                        </p>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Email:</strong> 
                          <span style="color: #000000;">${
                            parentEmail ?? "Not provided"
                          }</span>
                        </p>
                      </div>

                      <!-- Tutoring Details -->
                      <div style="margin-bottom: 30px;">
                        <h2 style="color: #000000; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
                          Tutoring Details
                        </h2>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Subjects:</strong> 
                          <span style="color: #000000;">${
                            subjects ?? "Not provided"
                          }</span>
                        </p>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Tutoring Preference:</strong> 
                          <span style="color: #000000;">${
                            tutoringPreference ?? "Not provided"
                          }</span>
                        </p>
                        <p style="margin: 0 0 10px 0; font-size: 16px;">
                          <strong style="color: #666666;">Availability:</strong> 
                          <span style="color: #000000;">${
                            availability ?? "Not provided"
                          }</span>
                        </p>
                      </div>
    
                      <!-- Message -->
                      <div style="margin-bottom: 30px;">
                        <h2 style="color: #000000; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
                          Enquiry Message
                        </h2>
                        <p style="margin: 0; font-size: 16px; color: #000000; line-height: 1.5;">
                          ${message}
                        </p>
                      </div>
                    </td>
                  </tr>
    
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f8f8; padding: 20px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                      <p style="margin: 0; color: #666666; font-size: 14px;">
                        This is an automated message from your website's enquiry form.
                      </p>
                      <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px;">
                        Please respond to this enquiry within 24 hours.
                      </p>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
      `;
};
