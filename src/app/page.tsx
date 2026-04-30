import Link from "next/link";
import React from "react";
import BookingForm from "@/components/BookingForm";
import { getWebsiteSettings } from "@/actions/cms-actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await getWebsiteSettings() || {
    hero_script_text: 'for home and the ones you love',
    hero_headline: 'Thoughtful Care. Trustworthy Service.',
    hero_subhead: 'Experience Pinehurst’s most exclusive pet sitting, dog walking, and house management service. Tailored precision for your home, unparalleled love for your pets.',
    hero_image_url: '/images/hero-image.jpg',
    banner_image_url: '/images/banner.png',
    services_intro_headline: 'Curated Service Packages',
    services_intro_text: 'We don\'t just "watch" pets. We manage their lifestyle. Choose from our luxury service tiers designed for discerning households.',
    service_1_title: 'Pet Sitting & Walking',
    service_1_image_url: '/images/finch_pet_sitting_dog_walking.svg',
    service_2_title: 'House Management',
    service_2_image_url: '/images/finch_house_sitting.svg',
    service_3_title: 'Overnight Sitting',
    service_3_image_url: '/images/finch_overnight.svg',
    about_headline: 'Meet the Founder',
    about_paragraph_1: 'At The Finch Collective, every detail matters—because the little things create the most meaningful experiences. I\'m here to bring ease to your day and elevate the way you care for the ones (and places) you love most.',
    about_paragraph_2: 'Whether it\'s your home or your pet, you can count on thoughtful care, trustworthy service, and a personal touch—always.',
    about_image_url: '/images/founder.jpg'
  };

  return (
    <main>

      {/* Banner Section */}
      <section style={{ width: "100%", backgroundColor: "var(--color-oatmeal-dark)" }}>
        <img src={settings.banner_image_url} alt="Banner" style={{ width: "100%", height: "auto", display: "block" }} />
      </section>

      {/* Hero Section */}
      <section className="section" style={{ 
        backgroundImage: `linear-gradient(rgba(232, 229, 220, 0.9), rgba(245, 243, 238, 0.9)), url('${settings.hero_image_url}')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative" 
      }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="script-font mb-4" style={{ fontSize: "3rem" }}>{settings.hero_script_text}</p>
            <h1 className="mb-4">{settings.hero_headline}</h1>
            <p className="mb-8" style={{ fontSize: "1.125rem", maxWidth: "450px" }}>
              {settings.hero_subhead}
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
        <h2 className="mb-4">{settings.services_intro_headline}</h2>
        <p className="mb-8" style={{ maxWidth: "600px", margin: "0 auto 3rem auto" }}>
          {settings.services_intro_text}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "stretch" }}>
          <div className="glass-card service-card" style={{ padding: "0", overflow: "hidden", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)", display: "flex", flexDirection: "column", height: "100%" }}>
             <img src={settings.service_1_image_url} alt={settings.service_1_title} style={{ width: "100%", height: "auto", display: "block" }} />
             <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ marginBottom: "1rem" }}>{settings.service_1_title}</h3>
                <div style={{ marginTop: "auto" }}>
                   <button className="btn btn-primary" style={{ width: "100%" }}>Book Pet Care</button>
                </div>
             </div>
          </div>

          <div className="glass-card service-card" style={{ padding: "0", overflow: "hidden", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)", display: "flex", flexDirection: "column", height: "100%" }}>
             <img src={settings.service_2_image_url} alt={settings.service_2_title} style={{ width: "100%", height: "auto", display: "block" }} />
             <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ marginBottom: "1rem" }}>{settings.service_2_title}</h3>
                <div style={{ marginTop: "auto" }}>
                   <button className="btn btn-primary" style={{ width: "100%" }}>Book House Sitting</button>
                </div>
             </div>
          </div>

          <div className="glass-card service-card" style={{ padding: "0", overflow: "hidden", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)", display: "flex", flexDirection: "column", height: "100%" }}>
             <img src={settings.service_3_image_url} alt={settings.service_3_title} style={{ width: "100%", height: "auto", display: "block" }} />
             <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ marginBottom: "1rem" }}>{settings.service_3_title}</h3>
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
             <img src={settings.about_image_url} alt="Samantha" style={{ width: "100%", borderRadius: "50%", border: "8px solid var(--color-white)", boxShadow: "var(--shadow-lg)" }} />
          </div>
          <div style={{ paddingLeft: "2rem" }}>
             <h2 className="mb-4">{settings.about_headline}</h2>
             <p className="mb-4">
               {settings.about_paragraph_1}
             </p>
             <p className="mb-8">
               {settings.about_paragraph_2}
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
