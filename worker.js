export default {
  fetch(request) {
    const url = new URL(request.url);

    // FINAL BASELINE — Vanity redirect map
    const redirects = {
      "google.yourdomain.com": "https://www.youtube.com/",
      "docs.yourdomain.com": "https://docs.google.com/",
      "github.yourdomain.com": "https://github.com/youruser",
      "chat.yourdomain.com": "https://chat.openai.com/",
      "maps.yourdomain.com": "https://maps.google.com/",
      "mail.yourdomain.com": "https://mail.google.com/",
      "drive.yourdomain.com": "https://drive.google.com/",
      "cal.yourdomain.com": "https://calendar.google.com/",
      "yt.yourdomain.com": "https://www.youtube.com/",
      "x.yourdomain.com": "https://x.com/",
      "fb.yourdomain.com": "https://facebook.com/",
      "ig.yourdomain.com": "https://instagram.com/",
      "li.yourdomain.com": "https://linkedin.com/",
      "wa.yourdomain.com": "https://web.whatsapp.com/",
      "tme.yourdomain.com": "https://t.me/",
      "zoom.yourdomain.com": "https://zoom.us/",
      "meet.yourdomain.com": "https://meet.google.com/",
      "movie.yourdomain.com": "http://youtube.com/",
      "video4k.yourdomain.com": "http://venmo.com/"
    };

    // 1) Vanity redirects — redirect immediately (no HTTPS forcing)
    const target = redirects[url.hostname];
    if (target) return Response.redirect(target, 301);

    // 2) Main site only — force HTTPS
    const mainHosts = new Set(["yourdomain.com", "www.yourdomain.com"]);
    if (url.protocol === "http:" && mainHosts.has(url.hostname)) {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // 3) Unknown hostnames — block
    return new Response("Not found", { status: 404 });
  }
};
