import { OktaAuth } from "@okta/okta-auth-js";

export const oktaAuthConfig = {
  scopes: ["openid", "profile", "email"],
  //   issuer: process.env.REACT_APP_OKTA_ISSUER,
  issuer: "https://${sso.catapultx.com}/oauth2/aus1luvecc1kZjfVv5d",

  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}${process.env.REACT_APP_OKTA_REDIRECT_URI}`,
  pkce: true,
};
