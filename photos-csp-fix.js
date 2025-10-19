export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const headers = new Headers(response.headers);
    const csp = headers.get("content-security-policy");

    if (csp && !csp.includes("https://photos.wils-on.com")) {
      headers.set(
        "content-security-policy",
        csp.replace(
          "img-src 'self'",
          "img-src 'self' https://photos.wils-on.com"
        )
      );
    }

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  },
};

