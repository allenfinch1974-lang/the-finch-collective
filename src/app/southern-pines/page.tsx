import React from "react";
import { Metadata } from "next";
import { getSeoPageData } from "@/actions/seo-actions";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Professional House Sitting & Pet Care for Southern Pines",
  description: "Boutique pet care and house sitting tailored to the equestrian and golf lifestyle of Southern Pines, NC.",
};

export default async function SouthernPines() {
  const data = await getSeoPageData('southern-pines') || {
    script_text: "Southern Pines",
    h1: "Boutique Care for the Equestrian Lifestyle",
    card1_h2: "Equestrian & Estate Focus",
    card1_p1: "Southern Pines has a unique rhythm. Whether you live in the heart of town or have acreage in horse country, your property and animals demand specialized, highly reliable care.",
    card1_p2: "We are not farmhands, but we are the ultimate home management team for your estate while you are traveling for shows, business, or vacation. We manage the dogs, the cats, and the property with military precision and five-star hospitality.",
    card1_btn: "Book Your Dates",
    card2_h3: "The \"Enterprise\" Standard",
    card2_p1: "We utilize a bespoke Client Portal and GPS technology. Our clients never have to guess when we arrived or how their home was left. We provide automated transparency for true peace of mind."
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
        
        <div className="glass-card text-center" style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "4px solid var(--color-olive)" }}>
          <div style={{ fontSize: "3rem", color: "var(--color-sage)", marginBottom: "1rem" }}>◆◆◆</div>
          <h3>{data.card2_h3}</h3>
          <p className="mt-4">{data.card2_p1}</p>
        </div>
      </div>
    </main>
  );
}
