import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional House Sitting & Pet Care for Pinehurst No. 2",
  description: "The Finch Collective provides luxury concierge pet care and home management for estates in the Pinehurst No. 2 and Village area.",
};

export default function PinehurstNo2() {
  return (
    <main className="section container">
      <p className="script-font mb-4 text-center">Pinehurst No. 2 & The Village</p>
      <h1 className="mb-8 text-center" style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        Concierge Pet Care for Pinehurst Estates
      </h1>
      
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="mb-4">Uncompromising Care for Your Home</h2>
          <p className="mb-4">
            Living on or near the historic Pinehurst No. 2 course requires a level of discretion and professionalism that standard pet sitters simply cannot provide. The Finch Collective specializes in managing high-end properties while you travel for business or leisure.
          </p>
          <p className="mb-4">
            Our "Estate" package includes not only comprehensive pet care, but full home management, security checks, mail retrieval, and vendor supervision. 
          </p>
          <button className="btn btn-primary mt-4">Inquire About Services</button>
        </div>
        
        <div className="glass-card" style={{ backgroundColor: "var(--color-olive)", color: "var(--color-white)" }}>
          <h2 className="mb-4" style={{ color: "var(--color-white)" }}>Why The Finch Collective?</h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
             <li><strong>✓ Fully Insured & Bonded:</strong> Maximum protection for your estate.</li>
             <li><strong>✓ Boutique Roster:</strong> We take a limited number of clients to ensure white-glove service.</li>
             <li><strong>✓ GPS Tracking:</strong> Know exactly when and where your dog is walking.</li>
             <li><strong>✓ Equestrian Community Trusted:</strong> We understand the unique needs of the Sandhills lifestyle.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
