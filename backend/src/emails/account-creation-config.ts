import { EmailConfig } from './EmailConfig';

export const getAccountCreationConfig = (
  username: string,
  clientRedirectUrl: string
): EmailConfig => ({
  subject: `Welcome in Beerly ${username}`,
  text: '',
  html: `
  <p>Confirm your account by clicking link bellow. </p>
  <a href="${clientRedirectUrl}">Confirm your account !</a>
`
});
