import React from "react";
import { Metadata } from "next";
import { getSeoPageData } from "@/actions/seo-actions";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Concierge Dog Walking & Pet Sitting in Forest Creek",
  description: "Exclusive pet care and house sitting services for the Forest Creek Golf Club community. The Finch Collective provides enterprise-level care.",
};

export default async function ForestCreek() {
  const data = await getSeoPageData('forest-creek') || {
    script_text: "Forest Creek Golf Club",
    h1: "Premium Pet Care for Forest Creek Residents",
    card1_h2: "Discreet, Professional Care",
    card1_p1: "Forest Creek represents some of the most beautiful and exclusive real estate in the Sandhills. We provide a level of pet and home care that matches the prestige of your neighborhood.",
    card1_p2: "Our \"Chauffeur\" dog walking packages offer private, GPS-tracked walks through the community's beautiful trails, ensuring your pet receives exercise, stimulation, and the utmost safety.",
    card1_btn: "Inquire About Services",
    card2_h2: "The Finch Standard",
    bullet_1: "Real-Time Reports: Instantly receive visit cards with photos to your client portal.",
    bullet_2: "Medication Management: Expert administration of daily medications.",
    bullet_3: "No Pack Walking: We strictly provide private walks. Your dog gets 100% of our attention.",
    bullet_4: "Home Security: Rotating lights, retrieving mail, and maintaining the lived-in look while you're away."
  };

  return (
    <main className="section container">
      <p className="script-font mb-4 text-center">{data.script_text}</p>
      <h1 className="mb-8 text-center" style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        {data.h1}
      </h1>
      
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="mb-4">{data.card1_h2}</h2>
          <p className="mb-4">{data.card1_p1}</p>
          <p className="mb-4">{data.card1_p2}</p>
          <button className="btn btn-primary mt-4">{data.card1_btn}</button>
        </div>
        
        <div className="glass-card" style={{ backgroundColor: "var(--color-oatmeal-dark)" }}>
          <h2 className="mb-4">{data.card2_h2}</h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
             <li><strong>✓ </strong>{data.bullet_1}</li>
             <li><strong>✓ </strong>{data.bullet_2}</li>
             <li><strong>✓ </strong>{data.bullet_3}</li>
             <li><strong>✓ </strong>{data.bullet_4}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
