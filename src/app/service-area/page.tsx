import React from "react";
import { getSeoPageData } from "@/actions/seo-actions";

export const dynamic = 'force-dynamic';

export default async function ServiceArea() {
  const data = await getSeoPageData('service-area') || {
    script_text: "The Sandhills",
    h1: "Exclusive Service Areas",
    description: "We provide enterprise-level pet care and house management exclusively to the most discerning neighborhoods in the Sandhills region.",
    box1_title: "Pinehurst No. 2 & The Village",
    box1_link_text: "Explore Services",
    box2_title: "Forest Creek Golf Club",
    box2_link_text: "Explore Services",
    box3_title: "Southern Pines Equestrian",
    box3_link_text: "Explore Services"
  };

  return (
    <main style={{ minHeight: "80vh", position: "relative", backgroundColor: "var(--color-oatmeal)" }}>
      {/* Background Map Illustration */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('/pinehurst-map.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.15,
        zIndex: 0
      }} />

      <section className="section container" style={{ position: "relative", zIndex: 1, padding: "8rem 2rem", textAlign: "center" }}>
        <p className="script-font mb-4">{data.script_text}</p>
        <h1 className="mb-8">{data.h1}</h1>
        <p className="mb-8" style={{ maxWidth: "600px", margin: "0 auto 4rem auto", fontSize: "1.125rem" }}>
          {data.description}
        </p>

        <div className="grid-3">
          <a href="/pinehurst-no-2" className="glass-card" style={{ display: "block", textDecoration: "none", transition: "transform 0.3s ease" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{data.box1_title}</h3>
            <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{data.box1_link_text}</p>
          </a>
          <a href="/forest-creek" className="glass-card" style={{ display: "block", textDecoration: "none", transition: "transform 0.3s ease", borderTop: "4px solid var(--color-olive)" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{data.box2_title}</h3>
            <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{data.box2_link_text}</p>
          </a>
          <a href="/southern-pines" className="glass-card" style={{ display: "block", textDecoration: "none", transition: "transform 0.3s ease" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{data.box3_title}</h3>
            <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{data.box3_link_text}</p>
          </a>
        </div>
      </section>
    </main>
  );
}
