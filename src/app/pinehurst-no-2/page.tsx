import React from "react";
import { Metadata } from "next";
import { getSeoPageData } from "@/actions/seo-actions";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Professional House Sitting & Pet Care for Pinehurst No. 2",
  description: "The Finch Collective provides luxury concierge pet care and home management for estates in the Pinehurst No. 2 and Village area.",
};

export default async function PinehurstNo2() {
  const data = await getSeoPageData('pinehurst-no-2');

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

      <BlockRenderer blocks={data.dynamic_blocks || []} />
    </>
  );
}
