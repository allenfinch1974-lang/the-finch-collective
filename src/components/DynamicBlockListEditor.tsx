'use client';

import React from 'react';

// Shared component for rendering individual block editors
export function HeroBlockEditor({ block, onChange }: { block: any, onChange: (c: any) => void }) {
  const handleChange = (e: any) => {
    onChange({ ...block.content, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input type="text" name="imageUrl" value={block.content.imageUrl || ''} onChange={handleChange} placeholder="Background Image URL" style={inputStyle} />
      <input type="text" name="headline" value={block.content.headline || ''} onChange={handleChange} placeholder="Main Headline" style={inputStyle} />
      <textarea name="subhead" value={block.content.subhead || ''} onChange={handleChange} placeholder="Sub-headline" style={{ ...inputStyle, minHeight: '80px' }} />
    </div>
  );
}

export function TextSplitBlockEditor({ block, onChange }: { block: any, onChange: (c: any) => void }) {
  const handleChange = (e: any) => {
    onChange({ ...block.content, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input type="text" name="headline" value={block.content.headline || ''} onChange={handleChange} placeholder="Section Headline" style={inputStyle} />
      <textarea name="text" value={block.content.text || ''} onChange={handleChange} placeholder="Paragraph Text" style={{ ...inputStyle, minHeight: '120px' }} />
      <input type="text" name="imageUrl" value={block.content.imageUrl || ''} onChange={handleChange} placeholder="Side Image URL" style={inputStyle} />
    </div>
  );
}

export function ServicesGridBlockEditor({ block, onChange }: { block: any, onChange: (c: any) => void }) {
  const handleChange = (e: any) => {
    onChange({ ...block.content, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
      <input type="text" name="title_1" value={block.content.title_1 || ''} onChange={handleChange} placeholder="Service 1 Title" style={inputStyle} />
      <input type="text" name="title_2" value={block.content.title_2 || ''} onChange={handleChange} placeholder="Service 2 Title" style={inputStyle} />
      <input type="text" name="title_3" value={block.content.title_3 || ''} onChange={handleChange} placeholder="Service 3 Title" style={inputStyle} />
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "0.75rem", border: "1px solid var(--color-taupe)", borderRadius: "4px", fontFamily: "inherit", fontSize: "1rem"
};

// The main list editor component
export default function DynamicBlockListEditor({ 
  blocks, 
  onBlocksChange,
  isSeoPage = false
}: { 
  blocks: any[], 
  onBlocksChange: (blocks: any[]) => void,
  isSeoPage?: boolean
}) {

  const handleAddBlock = (type: string) => {
    const defaultContent = type === 'hero' ? { headline: 'New Hero', subhead: 'Description', imageUrl: '' } :
                           type === 'text_split' ? { headline: 'Section Title', text: 'Paragraph here', imageUrl: '' } :
                           type === 'services_grid' ? { title_1: 'Service 1', title_2: 'Service 2', title_3: 'Service 3' } : {};

    const newBlock = {
      id: isSeoPage ? `temp_${Date.now()}` : undefined, // For SEO pages, block IDs are just temporary keys until saved
      block_type: type,
      content: defaultContent,
      sort_order: blocks.length
    };
    
    onBlocksChange([...blocks, newBlock]);
  };

  const handleUpdateBlock = (indexToUpdate: number, newContent: any) => {
    const updated = blocks.map((b, i) => i === indexToUpdate ? { ...b, content: newContent } : b);
    onBlocksChange(updated);
  };

  const handleDeleteBlock = (indexToDelete: number) => {
    const confirm = window.confirm("Are you sure you want to delete this block?");
    if (!confirm) return;
    const updated = blocks.filter((_, i) => i !== indexToDelete);
    onBlocksChange(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
      <h2 style={{ borderBottom: '2px solid var(--color-oatmeal-dark)', paddingBottom: '0.5rem' }}>Dynamic Blocks</h2>
      
      {blocks.map((block: any, index: number) => (
        <div key={block.id || index} className="glass-card" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal-dark)', paddingBottom: '0.5rem' }}>
            <h3 style={{ margin: 0, color: 'var(--color-sage)' }}>Block {index + 1}: {block.block_type.replace('_', ' ').toUpperCase()}</h3>
            <button type="button" onClick={() => handleDeleteBlock(index)} style={{ background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', textDecoration: 'underline' }}>Delete Block</button>
          </div>

          {block.block_type === 'hero' && (
            <HeroBlockEditor block={block} onChange={(content: any) => handleUpdateBlock(index, content)} />
          )}
          
          {block.block_type === 'text_split' && (
            <TextSplitBlockEditor block={block} onChange={(content: any) => handleUpdateBlock(index, content)} />
          )}
          
          {block.block_type === 'services_grid' && (
            <ServicesGridBlockEditor block={block} onChange={(content: any) => handleUpdateBlock(index, content)} />
          )}
        </div>
      ))}

      {blocks.length === 0 && (
        <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'var(--color-white)', borderRadius: '12px', border: '2px dashed var(--color-taupe)' }}>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '1rem' }}>No dynamic blocks added yet.</p>
        </div>
      )}

      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>+ Add New Block</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button type="button" onClick={() => handleAddBlock('hero')} className="btn btn-outline">Hero Header</button>
          <button type="button" onClick={() => handleAddBlock('text_split')} className="btn btn-outline">Text & Image Split</button>
          <button type="button" onClick={() => handleAddBlock('services_grid')} className="btn btn-outline">Services Grid</button>
        </div>
      </div>
    </div>
  );
}
