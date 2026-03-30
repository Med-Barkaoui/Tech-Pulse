// Charger GA4
const script = document.createElement("script");
script.async = true;
script.src = "https://www.googletagmanager.com/gtag/js?id=G-3NGZQHT11S";
document.head.appendChild(script);

// Initialisation
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Démarrage tracking
gtag('js', new Date());

// Configuration GA4
gtag('config', 'G-3NGZQHT11S');