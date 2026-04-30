'use client';

import React, { useState } from 'react';
import { addTagToLead, removeTagFromLead, getTags } from '@/actions/crm-actions';

export default function LeadTags({ leadId, initialTags }: { leadId: string, initialTags: any[] }) {
  const [tags, setTags] = useState(initialTags || []);
  const [availableTags, setAvailableTags] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchAvailableTags = async () => {
    const allTags = await getTags();
    const currentTagIds = tags.map(t => t.id);
    setAvailableTags(allTags.filter((t: any) => !currentTagIds.includes(t.id)));
    setShowDropdown(true);
  };

  const handleAddTag = async (tag: any) => {
    setTags([...tags, tag]);
    setShowDropdown(false);
    await addTagToLead(leadId, tag.id);
  };

  const handleRemoveTag = async (tagId: string) => {
    setTags(tags.filter(t => t.id !== tagId));
    await removeTagFromLead(leadId, tagId);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {tags.map((tag: any) => (
        <span 
          key={tag.id} 
          style={{ 
            backgroundColor: tag.color, 
            padding: '0.2rem 0.6rem', 
            borderRadius: '12px', 
            fontSize: '0.75rem',
            color: 'var(--color-charcoal)',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          {tag.name}
          <button 
            onClick={() => handleRemoveTag(tag.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-charcoal)', opacity: 0.5 }}
          >
            &times;
          </button>
        </span>
      ))}
      
      <div style={{ position: 'relative' }}>
        <button 
          onClick={showDropdown ? () => setShowDropdown(false) : fetchAvailableTags}
          style={{ background: 'none', border: '1px dashed var(--color-olive)', borderRadius: '12px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--color-olive)' }}
        >
          + Add Tag
        </button>
        
        {showDropdown && (
          <div className="glass-card" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', padding: '0.5rem', width: '200px', zIndex: 10 }}>
            {availableTags.length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>No tags available</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {availableTags.map(tag => (
                  <button 
                    key={tag.id} 
                    onClick={() => handleAddTag(tag)}
                    style={{ textAlign: 'left', background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer', fontSize: '0.875rem' }}
                  >
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: tag.color, borderRadius: '50%', marginRight: '0.5rem' }}></span>
                    {tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
