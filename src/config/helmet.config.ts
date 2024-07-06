export const helmetConfig = {
  contentSecurityPolicy: {
    baseUri: ["'self'"],
  },
  xXssProtection: "1; mode=block",
  xFrameOptions: "DENY",
  xContentTypeOptions: "nosniff",
}
