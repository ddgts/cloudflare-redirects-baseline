export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    // =========================================================
    // PREVIEW-ONLY HELPER
    // Preview runs on *.workers.dev so redirects won't match there.
    // This block returns debug JSON in Preview.
    // Remove this block after testing (optional).
    // =========================================================
    if (host.endsWith(".workers.dev")) {
      return new Response(
        JSON.stringify(
          {
            message: "Worker preview active",
            preview_hostname: host,
            note: "Redirects only trigger on real routed domains (e.g., desi4k.mydesitv.com)."
          },
          null,
          2
        ),
        { status: 200, headers: { "content-type": "application/json; charset=utf-8" } }
      );
    }

    // =========================================================
    // Redirect map (EXAMPLE)
    // Replace these with your own host -> target mappings.
    // =========================================================
    const redirects = {
      "sm4k.mydesitv.com": "https://sony4k.me/",
      "desi4k.mydesitv.com": "http://gplay.tvmate.biz/"
    };

    // Vanity redirects
    const target = redirects[host];
    if (target) return Response.redirect(target, 301);

    // Unknown hostnames — block
    return new Response("Not found", { status: 404 });
  }
};
