import React, { useEffect, useMemo, useRef, useState } from 'react';

type Article = {
  title: string;
  keywords: string[];
  content: string;
  link: string;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const re = new RegExp(escapeRegExp(query), 'ig');
  const parts = text.split(re);
  const matches = text.match(re) || [];
  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {p}
          {i < matches.length && <mark>{matches[i]}</mark>}
        </React.Fragment>
      ))}
    </>
  );
}

export default function HeaderSearch({ articles }: { articles: Article[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return articles
      .filter(a => [a.title, ...a.keywords].some(f => f.toLowerCase().includes(q)))
      .slice(0, 8);
  }, [query, articles]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const typing = tag === 'input' || tag === 'textarea';
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        title="Поиск (/)"
        aria-label="Поиск"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          padding: '4px 8px',
          color: 'var(--ifm-navbar-link-color)',
        }}
      >
        🔍
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '120%',
            right: 0,
            width: 280,
            padding: 8,
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: 10,
            background: 'var(--ifm-navbar-background-color)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
            zIndex: 2000,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск…  (нажми /)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid var(--ifm-color-emphasis-300)',
              background: 'var(--ifm-background-surface-color)',
              color: 'inherit',
              fontSize: 14,
              outline: 'none',
            }}
          />

          {query && (
            <div
              style={{
                marginTop: 6,
                maxHeight: 220,
                overflowY: 'auto',
                borderTop: '1px solid var(--ifm-color-emphasis-300)',
              }}
            >
              {results.length ? (
                results.map((r, i) => (
                  <div
                    key={i}
                    onClick={() => window.location.assign(r.link)}
                    style={{
                      padding: '8px 6px',
                      borderRadius: 6,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--ifm-color-emphasis-200)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      <Highlight text={r.title} query={query} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ifm-color-emphasis-600)' }}>
                      <Highlight text={r.content} query={query} />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: 8,
                    textAlign: 'center',
                    color: 'var(--ifm-color-emphasis-600)',
                    fontSize: 13,
                  }}
                >
                  Ничего не найдено
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
