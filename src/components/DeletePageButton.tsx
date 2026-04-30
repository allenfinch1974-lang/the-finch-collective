'use client';

import React, { useState } from 'react';
import { deletePage } from '@/actions/page-builder-actions';

export default function DeletePageButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to permanently delete this custom page? This cannot be undone.");
    if (!confirm) return;

    setIsDeleting(true);
    await deletePage(id);
    setIsDeleting(false);
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="btn"
      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: 'transparent', color: '#991B1B', border: '1px solid #991B1B' }}
    >
      {isDeleting ? '...' : 'Delete'}
    </button>
  );
}
