const oktaAuthConfig = {
    issuer: 'https://${sso.catapultx.com}/oauth2/default',
    clientId: '${0oa1j28y2ihyjh0G75d7}',
    redirectUri: window.location.origin + '/login/callback',
}

const oktaSignInConfig = {
    baseUrl: 'https://${sso.catapultx.com}',
    clientId: '${0oa1j28y2ihyjh0G75d7}',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {} //add
}

export { oktaAuthConfig, oktaSignInConfig };

