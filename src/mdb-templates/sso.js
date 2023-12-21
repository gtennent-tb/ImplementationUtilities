/* This function returns a json template for a new corporate card feed record. */

export const sso = () => {
  return `{{
    "organizationId" : ObjectId(""),
    "provider" : "saml",
    "type" : "sso",
    "settings" : {
        "entryPoint" : "https://login.microsoftonline.com/....../saml2",
        "cert" : "",
        "issuer" : "https://sts.windows.net/........",
        "enableProvisioning" : false,
        "idpDisplayName" : "",
        "enforceRedirect" : true,
        "loginRedirectUrl" : "https://api.travelbank.com/auth/saml/[id]",
        "samlOverrides" : {
            "issuer" : "travelbank"
        }
    }
}`;
};