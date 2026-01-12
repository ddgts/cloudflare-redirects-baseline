export default {
  fetch(request) {
    const url = new URL(request.url);

    // FINAL BASELINE — Vanity redirect map
    const redirects = {
      "google.rkdutta.com": "https://www.youtube.com/",
      "docs.rkdutta.com": "https://docs.google.com/",
      "github.rkdutta.com": "https://github.com/youruser",
      "chat.rkdutta.com": "https://chat.openai.com/",
      "maps.rkdutta.com": "https://maps.google.com/",
      "mail.rkdutta.com": "https://mail.google.com/",
      "drive.rkdutta.com": "https://drive.google.com/",
      "cal.rkdutta.com": "https://calendar.google.com/",
      "yt.rkdutta.com": "https://www.youtube.com/",
      "x.rkdutta.com": "https://x.com/",
      "fb.rkdutta.com": "https://facebook.com/",
      "ig.rkdutta.com": "https://instagram.com/",
      "li.rkdutta.com": "https://linkedin.com/",
      "wa.rkdutta.com": "https://web.whatsapp.com/",
      "tme.rkdutta.com": "https://t.me/",
      "zoom.rkdutta.com": "https://zoom.us/",
      "meet.rkdutta.com": "https://meet.google.com/",
      "movie.rkdutta.com": "http://4k.desitv.be/",
      "desi4k.rkdutta.com": "http://4k.desitv.be/"
    };

    // 1) Vanity redirects — no HTTPS forcing
    const target = redirects[url.hostname];
    if (target) return Response.redirect(target, 301);

    // 2) Main site only — force HTTPS
    const mainHosts = new Set(["rkdutta.com", "www.rkdutta.com"]);
    if (url.protocol === "http:" && mainHosts.has(url.hostname)) {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // 3) Unknown hosts — block
    return new Response("Not found", { status: 404 });
  }
};
