type Replacements = Record<string, string | number | null | undefined>;

const wrap = (title: string, contentHtml: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap');
      a{color:#FFFFFF;
      text-decoration: none;}
    </style>
  </head>
  <body style="margin:0;padding:0;background:#EAEFF6;">
    <div style="background:#EAEFF6;padding:24px 12px;">
      <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 29.8px rgba(227,234,243,0.65);font-family:Urbanist, Arial, sans-serif;">
        <div style="background:#1D3557;padding:16px 20px;">
          <div style="color:#FFFFFF;font-size:16px;font-weight:700;line-height:1.2;">Get Claim</div>
          <div style="color:#FFFFFF;opacity:.85;font-size:12px;margin-top:4px;">${title}</div>
        </div>
        <div style="padding:20px;color:#1D3557;font-size:14px;line-height:1.7;">
          ${contentHtml}
        </div>
      </div>
      <div style="max-width:640px;margin:10px auto 0;color:#6C7B92;font-family:Urbanist, Arial, sans-serif;font-size:12px;line-height:1.5;text-align:center;">
        © ${new Date().getFullYear()} Get Claim. All rights reserved.
      </div>
    </div>
  </body>
</html>`;

const badge = (value: string) => `
  <div style="display:inline-block;margin-top:8px;padding:10px 16px;background:#1D3557;color:#FFFFFF;border-radius:10px;font-size:16px;font-weight:700;letter-spacing:0.5px;">
    ${value}
  </div>
`;

const sigGetClaim = `
  <p style="margin:18px 0 0;">Best regards,</p>
  <p style="margin:0;font-weight:700;">Get Claim Team</p>
  <p style="margin:0;color:#6C7B92;">Automated Notification</p>
`;

export const emailMessages: Record<string, string> = {
  verifyEmail: wrap(
    'Email Verification Code',
    `
      <p style="margin:0 0 12px;"><strong>Your verification code</strong></p>
      <p style="margin:0 0 12px;color:#6C7B92;">
        Please use the code below to verify your email address.
      </p>

      <div style="text-align:center;margin:16px 0 10px;">
        ${badge('{verificationCode}')}
      </div>

      ${sigGetClaim}
    `,
  ),

  resetPassword: wrap(
    'Password Reset Code',
    `
      <p style="margin:0 0 12px;"><strong>Your verification code</strong></p>
      <p style="margin:0 0 12px;color:#6C7B92;">
        Please use the code below to reset your password.
      </p>

      <div style="text-align:center;margin:16px 0 10px;">
        ${badge('{verificationCode}')}
      </div>

      <p style="margin:14px 0 0;color:#6C7B92;">
        If you have not sent a password recovery request, you can safely ignore this email.
      </p>

      ${sigGetClaim}
    `,
  ),

  registration: wrap(
    'Email Verification',
    `
      <p style="margin:0 0 12px;"><strong>Email Verification</strong></p>
      <p style="margin:0 0 12px;color:#6C7B92;">
        Thank you for registration. To complete your registration, please enter the verification code below.
      </p>

      <div style="text-align:center;margin:16px 0 10px;">
        ${badge('{verificationCode}')}
      </div>

      <p style="margin:14px 0 0;color:#6C7B92;">
        If you didn't sign up for Get Claim, you can safely ignore this email.
      </p>

      ${sigGetClaim}
    `,
  ),

  socialRegistration: wrap(
    'Welcome',
    `
      <p style="margin:0 0 12px;"><strong>Welcome</strong></p>
      <p style="margin:0 0 12px;color:#6C7B92;">
        Congratulations, you have become a member of Get Claim.
      </p>

      ${sigGetClaim}
    `,
  ),

  'registration-appraiser': wrap(
    'You are in the team!',
    `
      <p style="margin:0 0 12px;"><strong>You have been added to the team</strong></p>
      <p style="margin:0 0 12px;color:#6C7B92;">
        Your account has been created in our system. You can now log in using the credentials below.
      </p>

      <div style="margin:16px 0 0;">
        <p style="margin:0;font-weight:700;">Login (Email):</p>
        <div style="text-align:left;">
          ${badge('{email}')}
        </div>
      </div>

      <div style="margin:16px 0 0;">
        <p style="margin:0;font-weight:700;">Temporary password:</p>
        <div style="text-align:left;">
          ${badge('{password}')}
        </div>
      </div>

      <p style="margin:16px 0 0;color:#6C7B92;">
        For security reasons, we recommend changing your password after your first login.
      </p>

      ${sigGetClaim}
    `,
  ),
  'join-team-confirm-email': wrap(
    'Confirm your email',
    `
      <p style="margin:0 0 12px;"><strong>Hello!</strong></p>
      <p style="margin:0 0 12px;color:#6C7B92;">
        We received your request to join our team. Please confirm your email address by clicking the button below.
      </p>

      <div style="margin:18px 0 10px;text-align:center;">
        <a href="{confirmUrl}"
           style="display:inline-block;background:#1D3557;color:#FFFFFF;text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;">
          Confirm Email
        </a>
      </div>

      <p style="margin:14px 0 0;color:#6C7B92;">
        If you did not request this, you can safely ignore this email.
      </p>

      ${sigGetClaim}
    `,
  ),
  'join-team-admin-notification': wrap(
    'New Join Team Application',
    `
      <p style="margin:0 0 12px;"><strong>New application submitted</strong></p>

      <p style="margin:0 0 12px;color:#6C7B92;">
        A new user has submitted a request to join the team.
      </p>

      <div style="margin:14px 0 0;padding:14px;border-radius:12px;background:#F6F8FC;border:1px solid #E3EAF3;">
        <p style="margin:0 0 8px;"><strong>Applicant:</strong> {fullName}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> {email}</p>
        <p style="margin:0 0 8px;"><strong>Phone:</strong> {phone}</p>
        <p style="margin:0;"><strong>Submitted at:</strong> {createdAt}</p>
      </div>

      <p style="margin:16px 0 0;color:#6C7B92;">
        Please review the application in the admin panel.
      </p>

      ${sigGetClaim}
    `,
  ),
};

export function generateEmailMessage(
  key: string,
  replacements: Replacements = {},
) {
  const messageTemplate = emailMessages[key];

  if (!messageTemplate) {
    return 'Invalid key';
  }

  const processedMessage = Object.keys(replacements).reduce(
    (message, placeholder) => {
      const value = replacements[placeholder];

      const safeValue =
        value === null || value === undefined ? '' : String(value);

      const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
      return message.replace(regex, safeValue);
    },
    messageTemplate,
  );

  return processedMessage;
}
