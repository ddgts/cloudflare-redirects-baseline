export default {
fetch(request) {
const url = new URL(request.url);

// Map host -> upstream ORIGIN ONLY (scheme + host). Use http upstream when needed.
const ORIGIN_MAP = {
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

    
// Vanity redirects — preserve path + query
const upstreamOrigin = ORIGIN_MAP[url.hostname];
if (upstreamOrigin) {
const dest = new URL(upstreamOrigin);

// Preserve the exact request path/query (critical for /stalker_portal/server/*.php calls)
dest.pathname = url.pathname;
dest.search = url.search;

// If the user hits bare host "/", many portals expect /stalker_portal/c/
// Optional: only do this for hostnames you know are stalker portals
if (dest.pathname === "/") {
// If you want EVERYTHING to go to portal home when "/" is requested:
// dest.pathname = "/stalker_portal/c/";
// Leave as-is if you prefer strict preservation.
}

// 302 is safer for STB clients (avoids sticky caching)
return Response.redirect(dest.toString(), 302);
}

return new Response("Not found", { status: 404 });
}
};
