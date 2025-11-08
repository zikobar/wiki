import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import HeaderSearch from '@site/src/components/HeaderSearch';
import articles from '@site/src/data/articles';

export default function Navbar(props) {
  return (
    <div style={{ position: 'relative' }}>
      <OriginalNavbar {...props} />
      {/* Контейнер справа в хедере */}
      <div
        style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        <HeaderSearch articles={articles} />
      </div>
    </div>
  );
}
