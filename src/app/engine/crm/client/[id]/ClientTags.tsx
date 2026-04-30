'use client';

import React, { useState, useEffect } from 'react';
import { getTags, addTagToClient, removeTagFromClient } from '@/actions/crm-actions';

export default function ClientTags({ clientId, initialTags }: { clientId: string, initialTags: any[] }) {
  const [tags, setTags] = useState(initialTags);
  const [availableTags, setAvailableTags] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      const allTags = await getTags();
      setAvailableTags(allTags);
    }
    fetchTags();
  }, []);

  const handleAddTag = async (tag: any) => {
    // Optimistic
    if (!tags.find(t => t.id === tag.id)) {
      setTags([...tags, tag]);
      await addTagToClient(clientId, tag.id);
    }
    setIsAdding(false);
  };

  const handleRemoveTag = async (tagId: string) => {
    setTags(tags.filter(t => t.id !== tagId));
    await removeTagFromClient(clientId, tagId);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {tags.map(tag => (
        <span 
          key={tag.id} 
          style={{ 
            backgroundColor: tag.color || '#E5E7EB', 
            color: '#1F2937', 
            padding: '0.2rem 0.6rem', 
            borderRadius: '12px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          {tag.name}
          <button 
            onClick={() => handleRemoveTag(tag.id)} 
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', opacity: 0.6, fontSize: '0.8rem' }}
          >
            &times;
          </button>
        </span>
      ))}
      
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ 
            background: 'none', 
            border: '1px dashed var(--color-taupe)', 
            borderRadius: '12px', 
            padding: '0.1rem 0.5rem', 
            fontSize: '0.75rem', 
            cursor: 'pointer' 
          }}
        >
          + Tag
        </button>
        
        {isAdding && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            marginTop: '0.5rem', 
            backgroundColor: 'white', 
            border: '1px solid var(--color-taupe)', 
            borderRadius: '8px', 
            boxShadow: 'var(--shadow-md)', 
            padding: '0.5rem',
            zIndex: 10,
            width: '200px'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: 'var(--color-taupe)' }}>Add Tag</h4>
            {availableTags.filter(at => !tags.find(t => t.id === at.id)).map(tag => (
              <button 
                key={tag.id}
                onClick={() => handleAddTag(tag)}
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  textAlign: 'left', 
                  background: 'none', 
                  border: 'none', 
                  padding: '0.4rem', 
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: tag.color, marginRight: '0.5rem' }}></span>
                {tag.name}
              </button>
            ))}
            {availableTags.filter(at => !tags.find(t => t.id === at.id)).length === 0 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>No new tags available.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
