const oktaAuthConfig = {
    issuer: 'https://${sso.catapultx.com}/oauth2/default',
    clientId: '${0oa1j28y2ihyjh0G75d7}',
    redirectUri: window.location.origin + '/login/callback',
}

const oktaSignInConfig = {
    baseUrl: 'https://${sso.catapultx.com}',
    clientId: '${0oa1j28y2ihyjh0G75d7}',
    redirectUri: window.location.origin + '/login/callback',
    i18n: {
        en: {
          'primaryauth.title': 'Sign in to CatapultX'
        },
      },
    authParams: {
        issuer: 'https://${sso.catapultx.com}/oauth2/default', //not sure this is right
        responseType: "id_token"
    } //add
}

export { oktaAuthConfig, oktaSignInConfig };

