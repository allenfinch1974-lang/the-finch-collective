import React from "react";
import { Metadata } from "next";
import { getSeoPageData } from "@/actions/seo-actions";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "The Professional Alternative to Rover in Pinehurst",
  description: "Why The Finch Collective is the premier, fully insured alternative to app-based pet sitters like Rover in Pinehurst, NC.",
};

export default async function RoverAlternative() {
  const data = await getSeoPageData('alternative-to-rover-pinehurst');

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
        
        <p className="text-center mb-8" style={{ maxWidth: "700px", margin: "0 auto 4rem auto", fontSize: "1.125rem" }}>
          {data.description}
        </p>

        <div className="glass-card" style={{ padding: "0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", backgroundColor: "var(--color-olive-dark)", color: "white", padding: "1.5rem", borderRadius: "12px 12px 0 0" }}>
            <div style={{ fontWeight: "bold" }}>Feature</div>
            <div style={{ fontWeight: "bold" }}>The Finch Collective</div>
            <div style={{ fontWeight: "bold", opacity: 0.7 }}>App-Based Sitters</div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)" }}>
            <div><strong>Insurance & Bonding</strong></div>
            <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>{data.row1_finch}</div>
            <div>{data.row1_app}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)", backgroundColor: "var(--color-oatmeal-dark)" }}>
            <div><strong>Staffing Model</strong></div>
            <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>{data.row2_finch}</div>
            <div>{data.row2_app}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)" }}>
            <div><strong>Reporting Technology</strong></div>
            <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>{data.row3_finch}</div>
            <div>{data.row3_app}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem", borderBottom: "1px solid var(--color-taupe)", backgroundColor: "var(--color-oatmeal-dark)" }}>
            <div><strong>Home Management</strong></div>
            <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>{data.row4_finch}</div>
            <div>{data.row4_app}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1.5rem" }}>
            <div><strong>Local Accountability</strong></div>
            <div style={{ color: "var(--color-olive)", fontWeight: "bold" }}>{data.row5_finch}</div>
            <div>{data.row5_app}</div>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "4rem" }}>
          <h3 className="mb-4">{data.bottom_h3}</h3>
          <button className="btn btn-primary">{data.bottom_btn}</button>
        </div>
      </main>

      <BlockRenderer blocks={data.dynamic_blocks || []} />
    </>
  );
}
