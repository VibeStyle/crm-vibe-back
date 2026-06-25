type Replacements = Record<string, string | number | null | undefined>;

const BRAND_NAME = 'VibeStyle';
const PRIMARY_COLOR = '#000000';
const ACCENT_COLOR = '#c4f934';
const MUTED_COLOR = '#5F5F5F';
const PAGE_BG = '#F4F4F4';
const PANEL_BG = '#FFFFFF';

const wrap = (title: string, contentHtml: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap');
      a{color:${PRIMARY_COLOR};text-decoration:none;}
    </style>
  </head>
  <body style="margin:0;padding:0;background:${PAGE_BG};">
    <div style="background:${PAGE_BG};padding:24px 12px;">
      <div style="max-width:640px;margin:0 auto;background:${PANEL_BG};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);font-family:Urbanist, Arial, sans-serif;border:1px solid #E8E8E8;">
        <div style="background:${PRIMARY_COLOR};padding:18px 20px;border-bottom:4px solid ${ACCENT_COLOR};">
          <div style="color:${ACCENT_COLOR};font-size:18px;font-weight:700;line-height:1.2;letter-spacing:0.2px;">${BRAND_NAME}</div>
          <div style="color:#FFFFFF;opacity:.9;font-size:12px;margin-top:4px;">${title}</div>
        </div>
        <div style="padding:22px;color:${PRIMARY_COLOR};font-size:14px;line-height:1.7;">
          ${contentHtml}
        </div>
      </div>
      <div style="max-width:640px;margin:10px auto 0;color:${MUTED_COLOR};font-family:Urbanist, Arial, sans-serif;font-size:12px;line-height:1.5;text-align:center;">
        (c) ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
      </div>
    </div>
  </body>
</html>`;

const badge = (value: string) => `
  <div style="display:inline-block;margin-top:8px;padding:10px 18px;background:${ACCENT_COLOR};color:${PRIMARY_COLOR};border-radius:10px;font-size:16px;font-weight:700;letter-spacing:0.5px;border:1px solid ${PRIMARY_COLOR};">
    ${value}
  </div>
`;

const button = (href: string, label: string) => `
  <a href="${href}"
     style="display:inline-block;background:${ACCENT_COLOR};color:${PRIMARY_COLOR};text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;border:1px solid ${PRIMARY_COLOR};">
    ${label}
  </a>
`;

const signature = `
  <p style="margin:18px 0 0;">Best regards,</p>
  <p style="margin:0;font-weight:700;">${BRAND_NAME} Team</p>
  <p style="margin:0;color:${MUTED_COLOR};">Automated Notification</p>
`;

export const emailMessages: Record<string, string> = {
  verifyEmail: wrap(
    'Email Verification Code',
    `
      <p style="margin:0 0 12px;"><strong>Your verification code</strong></p>
      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
        Please use the code below to verify your email address.
      </p>

      <div style="text-align:center;margin:16px 0 10px;">
        ${badge('{verificationCode}')}
      </div>

      ${signature}
    `,
  ),

  resetPassword: wrap(
    'Password Reset Code',
    `
      <p style="margin:0 0 12px;"><strong>Your verification code</strong></p>
      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
        Please use the code below to reset your password.
      </p>

      <div style="text-align:center;margin:16px 0 10px;">
        ${badge('{verificationCode}')}
      </div>

      <p style="margin:14px 0 0;color:${MUTED_COLOR};">
        If you have not sent a password recovery request, you can safely ignore this email.
      </p>

      ${signature}
    `,
  ),

  registration: wrap(
    'Email Verification',
    `
      <p style="margin:0 0 12px;"><strong>Email Verification</strong></p>
      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
        Thank you for registration. To complete your registration, please enter the verification code below.
      </p>

      <div style="text-align:center;margin:16px 0 10px;">
        ${badge('{verificationCode}')}
      </div>

      <p style="margin:14px 0 0;color:${MUTED_COLOR};">
        If you didn't sign up for ${BRAND_NAME}, you can safely ignore this email.
      </p>

      ${signature}
    `,
  ),

  socialRegistration: wrap(
    'Welcome',
    `
      <p style="margin:0 0 12px;"><strong>Welcome</strong></p>
      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
        Congratulations, you have become a member of ${BRAND_NAME}.
      </p>

      ${signature}
    `,
  ),

  'registration-appraiser': wrap(
    'You are in the team!',
    `
      <p style="margin:0 0 12px;"><strong>You have been added to the team</strong></p>
      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
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

      <p style="margin:16px 0 0;color:${MUTED_COLOR};">
        For security reasons, we recommend changing your password after your first login.
      </p>

      ${signature}
    `,
  ),

  'join-team-confirm-email': wrap(
    'Confirm your email',
    `
      <p style="margin:0 0 12px;"><strong>Hello!</strong></p>
      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
        We received your request to join our team. Please confirm your email address by clicking the button below.
      </p>

      <div style="margin:18px 0 10px;text-align:center;">
        ${button('{confirmUrl}', 'Confirm Email')}
      </div>

      <p style="margin:14px 0 0;color:${MUTED_COLOR};">
        If you did not request this, you can safely ignore this email.
      </p>

      ${signature}
    `,
  ),

  'join-team-admin-notification': wrap(
    'New Join Team Application',
    `
      <p style="margin:0 0 12px;"><strong>New application submitted</strong></p>

      <p style="margin:0 0 12px;color:${MUTED_COLOR};">
        A new user has submitted a request to join the team.
      </p>

      <div style="margin:14px 0 0;padding:14px;border-radius:12px;background:#F8F8F8;border:1px solid ${ACCENT_COLOR};">
        <p style="margin:0 0 8px;"><strong>Applicant:</strong> {fullName}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> {email}</p>
        <p style="margin:0 0 8px;"><strong>Phone:</strong> {phone}</p>
        <p style="margin:0;"><strong>Submitted at:</strong> {createdAt}</p>
      </div>

      <p style="margin:16px 0 0;color:${MUTED_COLOR};">
        Please review the application in the admin panel.
      </p>

      ${signature}
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
