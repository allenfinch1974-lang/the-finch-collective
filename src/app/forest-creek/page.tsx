import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concierge Dog Walking & Pet Sitting in Forest Creek",
  description: "Exclusive pet care and house sitting services for the Forest Creek Golf Club community. The Finch Collective provides enterprise-level care.",
};

export default function ForestCreek() {
  return (
    <main className="section container">
      <p className="script-font mb-4 text-center">Forest Creek Golf Club</p>
      <h1 className="mb-8 text-center" style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        Premium Pet Care for Forest Creek Residents
      </h1>
      
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="mb-4">Discreet, Professional Care</h2>
          <p className="mb-4">
            Forest Creek represents some of the most beautiful and exclusive real estate in the Sandhills. We provide a level of pet and home care that matches the prestige of your neighborhood.
          </p>
          <p className="mb-4">
            Our "Chauffeur" dog walking packages offer private, GPS-tracked walks through the community's beautiful trails, ensuring your pet receives exercise, stimulation, and the utmost safety.
          </p>
          <button className="btn btn-primary mt-4">Inquire About Services</button>
        </div>
        
        <div className="glass-card" style={{ backgroundColor: "var(--color-oatmeal-dark)" }}>
          <h2 className="mb-4">The Finch Standard</h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
             <li><strong>✓ Real-Time Reports:</strong> Instantly receive visit cards with photos to your client portal.</li>
             <li><strong>✓ Medication Management:</strong> Expert administration of daily medications.</li>
             <li><strong>✓ No Pack Walking:</strong> We strictly provide private walks. Your dog gets 100% of our attention.</li>
             <li><strong>✓ Home Security:</strong> Rotating lights, retrieving mail, and maintaining the lived-in look while you're away.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
