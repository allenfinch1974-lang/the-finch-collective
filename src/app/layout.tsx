import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-lora", // Keeping variable name to map seamlessly to existing CSS
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-caveat", // Keeping variable name for CSS mapping
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Finch Collective | Enterprise Concierge Pet Care",
  description: "Luxury pet sitting, dog walking, and house sitting for the equestrian and golf community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "The Finch Collective",
    "image": "https://thefinchcollective.com/pinehurst-map.png",
    "description": "Enterprise concierge pet care and house sitting for the Sandhills region.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pinehurst",
      "addressRegion": "NC"
    },
    "serviceArea": ["Pinehurst", "Southern Pines", "Forest Creek"]
  };

  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <nav style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-taupe)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", fontFamily: "var(--font-montserrat)", color: "var(--color-charcoal)", marginRight: "-0.4em", fontWeight: 500 }}>THE</span>
              <span style={{ fontSize: "2.2rem", letterSpacing: "0.15em", fontFamily: "var(--font-lora)", color: "var(--color-olive-dark)", margin: "0.2rem 0", marginRight: "-0.15em" }}>FINCH</span>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.5em", fontFamily: "var(--font-montserrat)", color: "var(--color-charcoal)", marginRight: "-0.5em", fontWeight: 500 }}>COLLECTIVE</span>
            </a>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="/#services" style={{ fontWeight: 500 }}>Services</a>
            <a href="/service-area" style={{ fontWeight: 500 }}>Service Area</a>
            <a href="/alternative-to-rover-pinehurst" style={{ fontWeight: 500 }}>Why Us</a>
            <a href="/#book" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>Client Portal</a>
          </div>
        </nav>
        {children}
        <footer style={{ backgroundColor: "var(--color-olive-dark)", color: "var(--color-oatmeal)", padding: "4rem 0" }}>
          <div className="container grid-3">
            <div>
              <h3 style={{ color: "var(--color-white)" }}>The Finch Collective</h3>
              <p>Enterprise level pet and home care for the Sandhills region.</p>
            </div>
            <div>
              <h4 style={{ color: "var(--color-sage-light)" }}>Service Areas</h4>
              <ul style={{ listStyle: "none", lineHeight: 2 }}>
                <li><a href="/pinehurst-no-2">Pinehurst No. 2</a></li>
                <li><a href="/forest-creek">Forest Creek</a></li>
                <li><a href="/southern-pines">Southern Pines</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: "var(--color-sage-light)" }}>Resources</h4>
              <ul style={{ listStyle: "none", lineHeight: 2, marginBottom: "1rem" }}>
                <li><a href="/alternative-to-rover-pinehurst">The Rover Alternative</a></li>
                <li>Client Portal Login</li>
                <li>Contact Us</li>
              </ul>
              <img src="/images/qr-code.png" alt="QR Code" style={{ width: "100px", height: "100px", borderRadius: "8px", backgroundColor: "white", padding: "4px" }} />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
