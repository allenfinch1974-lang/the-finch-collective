import Link from "next/link";
import React from "react";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main>

      {/* Banner Section */}
      <section style={{ width: "100%", backgroundColor: "var(--color-oatmeal-dark)" }}>
        <img src="/images/banner.png" alt="Thoughtful care for every pet. Peace of mind for every owner." style={{ width: "100%", height: "auto", display: "block" }} />
      </section>

      {/* Hero Section */}
      <section className="section" style={{ 
        backgroundImage: "linear-gradient(rgba(232, 229, 220, 0.9), rgba(245, 243, 238, 0.9)), url('/images/hero-image.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative" 
      }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="script-font mb-4" style={{ fontSize: "3rem" }}>for home and the ones you love</p>
            <h1 className="mb-4">Thoughtful Care. Trustworthy Service.</h1>
            <p className="mb-8" style={{ fontSize: "1.125rem", maxWidth: "450px" }}>
              Experience Pinehurst’s most exclusive pet sitting, dog walking, and house management service. Tailored precision for your home, unparalleled love for your pets.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-primary">Reserve a Date</button>
              <Link href="#services" className="btn btn-outline">Explore Packages</Link>
            </div>
          </div>
          
          {/* Booking Flow Mockup */}
          <div className="glass-card" style={{ borderTop: "4px solid var(--color-olive)" }}>
            <h3 style={{ borderBottom: "1px solid var(--color-taupe)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
              Submit an Inquiry
            </h3>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section id="services" className="section container text-center">
        <h2 className="mb-4">Curated Service Packages</h2>
        <p className="mb-8" style={{ maxWidth: "600px", margin: "0 auto 3rem auto" }}>
          We don't just "watch" pets. We manage their lifestyle. Choose from our luxury service tiers designed for discerning households.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "stretch" }}>
          <div className="glass-card service-card" style={{ padding: "0", overflow: "hidden", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)", display: "flex", flexDirection: "column", height: "100%" }}>
             <img src="/images/finch_pet_sitting_dog_walking.svg" alt="Pet Sitting & Dog Walking Services" style={{ width: "100%", height: "auto", display: "block" }} />
             <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ marginBottom: "1rem" }}>Pet Sitting & Walking</h3>
                <div style={{ marginTop: "auto" }}>
                   <button className="btn btn-primary" style={{ width: "100%" }}>Book Pet Care</button>
                </div>
             </div>
          </div>

          <div className="glass-card service-card" style={{ padding: "0", overflow: "hidden", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)", display: "flex", flexDirection: "column", height: "100%" }}>
             <img src="/images/finch_house_sitting.svg" alt="House Sitting Services" style={{ width: "100%", height: "auto", display: "block" }} />
             <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ marginBottom: "1rem" }}>House Management</h3>
                <div style={{ marginTop: "auto" }}>
                   <button className="btn btn-primary" style={{ width: "100%" }}>Book House Sitting</button>
                </div>
             </div>
          </div>

          <div className="glass-card service-card" style={{ padding: "0", overflow: "hidden", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)", display: "flex", flexDirection: "column", height: "100%" }}>
             <img src="/images/finch_overnight.svg" alt="Overnight Pet Sitting" style={{ width: "100%", height: "auto", display: "block" }} />
             <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ marginBottom: "1rem" }}>Overnight Sitting</h3>
                <div style={{ marginTop: "auto" }}>
                   <button className="btn btn-primary" style={{ width: "100%" }}>Book Overnight</button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The Tech / Feature List */}
      <section className="section" style={{ backgroundColor: "var(--color-white)" }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div style={{ padding: "3rem", backgroundColor: "var(--color-oatmeal-dark)", borderRadius: "12px" }}>
            <h2 className="mb-4">The Concierge Difference</h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <li style={{ display: "flex", gap: "1rem" }}>
                <span style={{ color: "var(--color-sage)", fontSize: "1.5rem" }}>✓</span>
                <div>
                  <h4 style={{ marginBottom: "0.25rem" }}>Secure Client Portal</h4>
                  <p>Manage your invoices, schedules, and pet profiles in one seamless, high-tech interface.</p>
                </div>
              </li>
              <li style={{ display: "flex", gap: "1rem" }}>
                <span style={{ color: "var(--color-sage)", fontSize: "1.5rem" }}>✓</span>
                <div>
                  <h4 style={{ marginBottom: "0.25rem" }}>GPS Tracking & Real-Time Updates</h4>
                  <p>Know exactly where your pet is and when they were walked with automated map reports.</p>
                </div>
              </li>
              <li style={{ display: "flex", gap: "1rem" }}>
                <span style={{ color: "var(--color-sage)", fontSize: "1.5rem" }}>✓</span>
                <div>
                  <h4 style={{ marginBottom: "0.25rem" }}>Automated "Visit Cards"</h4>
                  <p>Receive a beautiful digital report card with photos and behavioral notes after every single visit.</p>
                </div>
              </li>
            </ul>
          </div>
          <div style={{ paddingLeft: "2rem" }}>
             <p className="script-font mb-4" style={{ fontSize: "2.5rem" }}>Peace of mind</p>
             <h2>Technology meets boutique hospitality.</h2>
             <p className="mt-4">
               We believe that hiring a pet sitter should feel like checking into a five-star hotel. Our proprietary technology ensures that you are never left wondering about the status of your home or your beloved pets.
             </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="section" style={{ backgroundColor: "var(--color-oatmeal)" }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
             <img src="/images/founder.jpg" alt="Samantha and her dog" style={{ width: "100%", borderRadius: "50%", border: "8px solid var(--color-white)", boxShadow: "var(--shadow-lg)" }} />
          </div>
          <div style={{ paddingLeft: "2rem" }}>
             <h2 className="mb-4">Meet the Founder</h2>
             <p className="mb-4">
               At The Finch Collective, every detail matters—because the little things create the most meaningful experiences. I'm here to bring ease to your day and elevate the way you care for the ones (and places) you love most.
             </p>
             <p className="mb-8">
               Whether it's your home or your pet, you can count on thoughtful care, trustworthy service, and a personal touch—always.
             </p>
             <p className="script-font" style={{ fontSize: "3rem", color: "var(--color-olive-dark)" }}>Samantha</p>
          </div>
        </div>
      </section>


    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid var(--color-taupe)",
  borderRadius: "4px",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  backgroundColor: "var(--color-white)",
  color: "var(--color-charcoal)"
};
