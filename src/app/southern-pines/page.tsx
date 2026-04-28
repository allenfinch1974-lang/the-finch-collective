import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional House Sitting & Pet Care for Southern Pines",
  description: "Boutique pet care and house sitting tailored to the equestrian and golf lifestyle of Southern Pines, NC.",
};

export default function SouthernPines() {
  return (
    <main className="section container">
      <p className="script-font mb-4 text-center">Southern Pines</p>
      <h1 className="mb-8 text-center" style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        Boutique Care for the Equestrian Lifestyle
      </h1>
      
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="mb-4">Equestrian & Estate Focus</h2>
          <p className="mb-4">
            Southern Pines has a unique rhythm. Whether you live in the heart of town or have acreage in horse country, your property and animals demand specialized, highly reliable care. 
          </p>
          <p className="mb-4">
            We are not farmhands, but we are the ultimate home management team for your estate while you are traveling for shows, business, or vacation. We manage the dogs, the cats, and the property with military precision and five-star hospitality.
          </p>
          <button className="btn btn-primary mt-4">Book Your Dates</button>
        </div>
        
        <div className="glass-card text-center" style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "4px solid var(--color-olive)" }}>
          <div style={{ fontSize: "3rem", color: "var(--color-sage)", marginBottom: "1rem" }}>◆◆◆</div>
          <h3>The "Enterprise" Standard</h3>
          <p className="mt-4">
            We utilize a bespoke Client Portal and GPS technology. Our clients never have to guess when we arrived or how their home was left. We provide automated transparency for true peace of mind.
          </p>
        </div>
      </div>
    </main>
  );
}
