export const formatEmail = (email: string, resetLink: string) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset Request</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #f6f6f6; font-family: Arial, sans-serif;">
            <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #000; padding: 30px 40px; text-align: center;">
                  <h1 style="color: #DAA520; margin: 0; font-size: 24px;">Password Reset Request</h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                    Requested on ${new Date().toLocaleString("en-UK", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </td>
              </tr>
    
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <div style="margin-bottom: 30px;">
  
                    <p style="margin: 0 0 10px 0; font-size: 16px; color: #000000;">
                      We received a request to reset the password for your account (<strong>${email}</strong>).
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 16px; color: #000000;">
                      Click the button below to set a new password. If you did not request this, you can safely ignore this email.
                    </p>
                  </div>
    
                  <!-- Reset Button -->
                  <div style="margin-bottom: 30px; text-align: center;">
                    <a href="${resetLink}" style="display: inline-block; background-color: #DAA520; color: #00150f; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: bold; font-size: 16px;">
                      Reset Password
                    </a>
                  </div>
    
                  <p style="font-size: 14px; color: #666666; text-align: center;">
                    If the button above does not work, copy and paste the following link into your browser:<br>
                    <a href="${resetLink}" style="color: #00150f; word-break: break-all;">${resetLink}</a>
                  </p>
                </td>
              </tr>
    
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f8f8; padding: 20px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0; color: #666666; font-size: 14px;">
                    This is an automated message regarding your password reset request.
                  </p>
                  <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px;">
                    If you did not request a password reset, please ignore this email.
                  </p>
                  <div style="margin-top: 20px;">
                    <span style="display: inline-block; width: 30px; height: 4px; background-color: #DAA520; border-radius: 2px; margin: 0 3px;"></span>
                    <span style="display: inline-block; width: 30px; height: 4px; background-color: #00150f; border-radius: 2px; margin: 0 3px;"></span>
                    <span style="display: inline-block; width: 30px; height: 4px; background-color: #DAA520; border-radius: 2px; margin: 0 3px;"></span>
                  </div>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;
};
