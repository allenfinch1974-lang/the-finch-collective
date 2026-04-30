import React from "react";
import { Metadata } from "next";
import { getSeoPageData } from "@/actions/seo-actions";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Professional House Sitting & Pet Care for Southern Pines",
  description: "Boutique pet care and house sitting tailored to the equestrian and golf lifestyle of Southern Pines, NC.",
};

export default async function SouthernPines() {
  const data = await getSeoPageData('southern-pines');

  if (!data || data.is_published === false) {
    notFound();
  }

  return (
    <>
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

      <BlockRenderer blocks={data.dynamic_blocks || []} />
    </>
  );
}
