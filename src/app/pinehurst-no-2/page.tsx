import React from "react";
import { Metadata } from "next";
import { getSeoPageData } from "@/actions/seo-actions";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Professional House Sitting & Pet Care for Pinehurst No. 2",
  description: "The Finch Collective provides luxury concierge pet care and home management for estates in the Pinehurst No. 2 and Village area.",
};

export default async function PinehurstNo2() {
  const data = await getSeoPageData('pinehurst-no-2') || {
    script_text: "Pinehurst No. 2 & The Village",
    h1: "Concierge Pet Care for Pinehurst Estates",
    card1_h2: "Uncompromising Care for Your Home",
    card1_p1: "Living on or near the historic Pinehurst No. 2 course requires a level of discretion and professionalism that standard pet sitters simply cannot provide. The Finch Collective specializes in managing high-end properties while you travel for business or leisure.",
    card1_p2: "Our \"Estate\" package includes not only comprehensive pet care, but full home management, security checks, mail retrieval, and vendor supervision.",
    card1_btn: "Inquire About Services",
    card2_h2: "Why The Finch Collective?",
    bullet_1: "Fully Insured & Bonded: Maximum protection for your estate.",
    bullet_2: "Boutique Roster: We take a limited number of clients to ensure white-glove service.",
    bullet_3: "GPS Tracking: Know exactly when and where your dog is walking.",
    bullet_4: "Equestrian Community Trusted: We understand the unique needs of the Sandhills lifestyle."
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
        
        <div className="glass-card" style={{ backgroundColor: "var(--color-olive)", color: "var(--color-white)" }}>
          <h2 className="mb-4" style={{ color: "var(--color-white)" }}>{data.card2_h2}</h2>
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
