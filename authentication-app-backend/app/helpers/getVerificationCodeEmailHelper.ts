export const getVerificationCodeEmailTemplate = (
  email: string,
  fullName: string,
  code: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hello ${fullName},</h2>
      <p>We received a request to verify your email: <strong>${email}</strong>.</p>
      <p>Please use the following verification code:</p>
      <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #2d89ef;">
        ${code}
      </div>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <br/>
      <p>Thanks,<br/>The Team</p>
    </div>
  `;
};
