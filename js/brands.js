/* Brand logos for the partner marquee.
   Simplified, recognizable SVG marks rendered in their brand colours. */
(function () {
  const track = document.getElementById('brand-track');
  if (!track) return;

  const logos = {
    microsoft: `<svg viewBox="0 0 130 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="2" width="9" height="9" fill="#F25022"/><rect x="11" y="2" width="9" height="9" fill="#7FBA00"/><rect x="0" y="13" width="9" height="9" fill="#00A4EF"/><rect x="11" y="13" width="9" height="9" fill="#FFB900"/><text x="26" y="17" font-family="Segoe UI, Arial" font-size="15" fill="#e8edf5">Microsoft</text></svg>`,
    google: `<svg viewBox="0 0 90 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Arial" font-size="20" font-weight="500"><tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC05">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan></text></svg>`,
    aws: `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg"><text x="0" y="16" font-family="Arial" font-size="15" font-weight="700" fill="#FF9900">aws</text><path d="M4 22 q14 6 28 0" stroke="#FF9900" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`,
    azure: `<svg viewBox="0 0 96 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 4 L3 20 H8 L14 4 Z" fill="#0089D6"/><path d="M11 9 L7 19 H20 L16 16 H13 L17 9 Z" fill="#0089D6"/><text x="26" y="17" font-family="Segoe UI, Arial" font-size="14" fill="#e8edf5">Azure</text></svg>`,
    googlecloud: `<svg viewBox="0 0 130 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 7l2.5-2.5a7 7 0 0 1 3 4.2A5 5 0 0 1 22 18H8a5 5 0 0 1-1-9.8A7 7 0 0 1 14 7z" fill="none" stroke="#4285F4" stroke-width="1.6"/><circle cx="13" cy="11" r="2.4" fill="#EA4335"/><text x="30" y="16" font-family="Arial" font-size="12.5" fill="#e8edf5">Google Cloud</text></svg>`,
    cisco: `<svg viewBox="0 0 80 24" xmlns="http://www.w3.org/2000/svg"><g fill="#1BA0D7"><rect x="2" y="9" width="2" height="6" rx="1"/><rect x="6" y="6" width="2" height="12" rx="1"/><rect x="10" y="3" width="2" height="18" rx="1"/><rect x="14" y="6" width="2" height="12" rx="1"/><rect x="18" y="9" width="2" height="6" rx="1"/></g><text x="26" y="17" font-family="Arial" font-size="14" font-weight="600" fill="#e8edf5">cisco</text></svg>`,
    tally: `<svg viewBox="0 0 70 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="18" height="18" rx="4" fill="#0066B3"/><text x="4" y="17" font-family="Arial" font-size="13" font-weight="700" fill="#fff">T</text><text x="24" y="17" font-family="Arial" font-size="14" font-weight="600" fill="#e8edf5">Tally</text></svg>`,
    busy: `<svg viewBox="0 0 70 24" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="12" r="9" fill="#E2231A"/><text x="6" y="16" font-family="Arial" font-size="11" font-weight="700" fill="#fff">B</text><text x="24" y="16" font-family="Arial" font-size="14" font-weight="600" fill="#e8edf5">BUSY</text></svg>`,
    vmware: `<svg viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="17" font-family="Arial" font-size="14" font-weight="700" fill="#717074">vm</text><text x="22" y="17" font-family="Arial" font-size="14" font-weight="700" fill="#e8edf5">ware</text><rect x="0" y="20" width="56" height="2" fill="#5BB832"/></svg>`,
    fortinet: `<svg viewBox="0 0 96 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 4 h7 v4 h-3 v3 h3 v4 h-7 z" fill="#EE3124"/><text x="14" y="17" font-family="Arial" font-size="13" font-weight="600" fill="#e8edf5">Fortinet</text></svg>`,
    ubuntu: `<svg viewBox="0 0 96 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="12" r="9" fill="none" stroke="#E95420" stroke-width="2"/><circle cx="11" cy="3.5" r="2" fill="#E95420"/><circle cx="4" cy="16" r="2" fill="#E95420"/><circle cx="18" cy="16" r="2" fill="#E95420"/><text x="26" y="17" font-family="Arial" font-size="13" fill="#e8edf5">Ubuntu</text></svg>`,
    cloudflare: `<svg viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 15c0-2-1.6-3.5-3.6-3.5-.3 0-.6 0-.9.1A4.5 4.5 0 0 0 5 13.2 3 3 0 0 0 6 19h11a2 2 0 0 0 1-3.8z" fill="#F38020"/><text x="26" y="17" font-family="Arial" font-size="12" fill="#e8edf5">Cloudflare</text></svg>`
  };

  const order = ['microsoft','google','googlecloud','aws','azure','tally','busy','cisco','vmware','fortinet','ubuntu','cloudflare'];
  const make = () => order.map(k => `<div class="logo" title="${k}">${logos[k]}</div>`).join('');
  // duplicate set for seamless loop
  track.innerHTML = make() + make();
})();
