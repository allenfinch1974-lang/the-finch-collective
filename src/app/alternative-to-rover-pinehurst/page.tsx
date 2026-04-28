import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Professional Alternative to Rover in Pinehurst",
  description: "Why The Finch Collective is the premier, fully insured alternative to app-based pet sitters like Rover in Pinehurst, NC.",
};

export default function RoverAlternative() {
  return (
    <main className="section container">
      <p className="script-font mb-4 text-center">Boutique vs App-Based</p>
      <h1 className="mb-8 text-center" style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        The Professional Alternative to Rover in Pinehurst
      </h1>
      
      <p className="text-center mb-8" style={{ maxWidth: "700px", margin: "0 auto 4rem auto", fontSize: "1.125rem" }}>
        When you live in a distinguished neighborhood, handing your house keys to a random contractor off an app isn't an option. You need a dedicated, insured, and professional home management partner.
      </p>

      <div className="glass-card" style={{ padding: "0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", backgroundColor: "var(--color-olive-dark)", color: "white", padding: "1.5rem", borderRadius: "12px 12px 0 0" }}>
          <div style={{ fontWeight: "bold" }}>Feature</div>
          <div style={{ fontWeight: "bold" }}>The Finch Collective</div>
          <div style={{ fontWeight: "bold", opacity: 0.7 }}>App-Based Sitters</div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)" }}>
          <div><strong>Insurance & Bonding</strong></div>
          <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>✓ Comprehensive Commercial Insurance</div>
          <div>Limited Platform Guarantees</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)", backgroundColor: "var(--color-oatmeal-dark)" }}>
          <div><strong>Staffing Model</strong></div>
          <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>✓ Dedicated Professional Caretaker</div>
          <div>Gig-Economy Independent Contractors</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)" }}>
          <div><strong>Reporting Technology</strong></div>
          <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>✓ Dedicated CRM, GPS Tracking & Portal</div>
          <div>Basic App Messages</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)", backgroundColor: "var(--color-oatmeal-dark)" }}>
          <div><strong>Home Management</strong></div>
          <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>✓ Full Estate Security & Vendor Checks</div>
          <div>Pets Only</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem" }}>
          <div><strong>Local Accountability</strong></div>
          <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>✓ Local Pinehurst Small Business</div>
          <div>Corporate Support Ticket Queue</div>
        </div>
      </div>

      <div className="text-center" style={{ marginTop: "4rem" }}>
        <h3 className="mb-4">Ready to upgrade your pet care experience?</h3>
        <button className="btn btn-primary">Schedule a Meet & Greet</button>
      </div>
    </main>
  );
}
