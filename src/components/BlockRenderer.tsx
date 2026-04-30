import React from 'react';

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block: any, index: number) => {
        if (block.block_type === 'hero') {
          return (
            <section key={block.id || index} className="section" style={{ 
              backgroundImage: `linear-gradient(rgba(232, 229, 220, 0.9), rgba(245, 243, 238, 0.9)), url('${block.content.imageUrl || '/images/hero-image.jpg'}')`, 
              backgroundSize: "cover", backgroundPosition: "center", position: "relative" 
            }}>
              <div className="container text-center">
                <h2 className="mb-4">{block.content.headline || 'Hero Headline'}</h2>
                <p className="mb-8" style={{ fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
                  {block.content.subhead || 'Hero subheadline description goes here.'}
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </section>
          );
        }

        if (block.block_type === 'text_split') {
          return (
            <section key={block.id || index} className="section" style={{ backgroundColor: "var(--color-white)" }}>
              <div className="container grid-2" style={{ alignItems: "center" }}>
                <div>
                  <h2 className="mb-4">{block.content.headline || 'Section Title'}</h2>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{block.content.text || 'Paragraph text here.'}</p>
                </div>
                <div>
                  <img src={block.content.imageUrl || '/images/hero-image.jpg'} alt="Section Visual" style={{ width: "100%", borderRadius: "8px", boxShadow: "var(--shadow-lg)" }} />
                </div>
              </div>
            </section>
          );
        }

        if (block.block_type === 'services_grid') {
          return (
            <section key={block.id || index} className="section container text-center" style={{ backgroundColor: "var(--color-oatmeal)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "stretch" }}>
                {[1, 2, 3].map((num) => (
                  <div key={`${block.id || index}-${num}`} className="glass-card service-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", height: "100%", borderTop: "4px solid var(--color-olive)", borderBottom: "4px solid var(--color-olive)" }}>
                    <h3 style={{ marginBottom: "1rem" }}>{block.content[`title_${num}`] || `Service ${num}`}</h3>
                    <div style={{ marginTop: "auto" }}>
                      <button className="btn btn-outline" style={{ width: "100%" }}>Learn More</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}
