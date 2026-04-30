'use client';

import React, { useState } from 'react';
import { addBlockToPage, updateBlockContent, deleteBlock, updatePageStatus } from '@/actions/page-builder-actions';

export default function PageBuilder({ initialPage }: { initialPage: any }) {
  const [page, setPage] = useState(initialPage);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAddBlock = async (type: string) => {
    const newSortOrder = page.blocks.length;
    const res = await addBlockToPage(page.id, type, newSortOrder);
    if (res.success && res.block) {
      setPage({ ...page, blocks: [...page.blocks, res.block] });
    } else {
      alert(res.error || 'Failed to add block');
    }
  };

  const handleUpdateBlock = async (blockId: string, newContent: any) => {
    // Optimistic update
    const updatedBlocks = page.blocks.map((b: any) => b.id === blockId ? { ...b, content: newContent } : b);
    setPage({ ...page, blocks: updatedBlocks });

    await updateBlockContent(blockId, newContent, page.slug);
  };

  const handleDeleteBlock = async (blockId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this block?");
    if (!confirm) return;

    const updatedBlocks = page.blocks.filter((b: any) => b.id !== blockId);
    setPage({ ...page, blocks: updatedBlocks });
    
    await deleteBlock(blockId, page.slug);
  };

  const handleTogglePublish = async () => {
    setIsPublishing(true);
    const newStatus = !page.is_published;
    const res = await updatePageStatus(page.id, newStatus, page.slug);
    if (res.success) {
      setPage({ ...page, is_published: newStatus });
    } else {
      alert("Failed to update status");
    }
    setIsPublishing(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <strong>Status: </strong>
          <span style={{ color: page.is_published ? '#065F46' : '#991B1B' }}>
            {page.is_published ? 'Published (Live)' : 'Draft (Hidden)'}
          </span>
        </div>
        <div>
          <button onClick={handleTogglePublish} disabled={isPublishing} className={page.is_published ? "btn btn-outline" : "btn btn-primary"} style={{ padding: '0.5rem 1rem' }}>
            {isPublishing ? '...' : page.is_published ? 'Unpublish Page' : 'Publish Page'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {page.blocks.map((block: any, index: number) => (
          <div key={block.id} className="glass-card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-oatmeal-dark)', paddingBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-sage)' }}>Block {index + 1}: {block.block_type.replace('_', ' ').toUpperCase()}</h3>
              <button onClick={() => handleDeleteBlock(block.id)} style={{ background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', textDecoration: 'underline' }}>Delete Block</button>
            </div>

            {block.block_type === 'hero' && (
              <HeroBlockEditor block={block} onChange={(content) => handleUpdateBlock(block.id, content)} />
            )}
            
            {block.block_type === 'text_split' && (
              <TextSplitBlockEditor block={block} onChange={(content) => handleUpdateBlock(block.id, content)} />
            )}
            
            {block.block_type === 'services_grid' && (
              <ServicesGridBlockEditor block={block} onChange={(content) => handleUpdateBlock(block.id, content)} />
            )}
          </div>
        ))}

        {page.blocks.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'var(--color-white)', borderRadius: '12px', border: '2px dashed var(--color-taupe)' }}>
            <p style={{ color: 'var(--color-taupe)', marginBottom: '1rem' }}>This page has no content yet.</p>
          </div>
        )}
      </div>

      <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>+ Add New Block</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => handleAddBlock('hero')} className="btn btn-outline">Hero Header</button>
          <button onClick={() => handleAddBlock('text_split')} className="btn btn-outline">Text & Image Split</button>
          <button onClick={() => handleAddBlock('services_grid')} className="btn btn-outline">Services Grid</button>
        </div>
      </div>
    </div>
  );
}

// Sub-components for editing specific blocks
function HeroBlockEditor({ block, onChange }: any) {
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

function TextSplitBlockEditor({ block, onChange }: any) {
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

function ServicesGridBlockEditor({ block, onChange }: any) {
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
