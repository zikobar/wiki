import React from 'react';
import HeaderSearch from '@site/src/components/HeaderSearch';
import articles from '@site/src/data/articles';

export default function NavbarSearch(): JSX.Element {
  // Рендерим наш поиск в штатном месте навбара (справа)
  return <HeaderSearch articles={articles} />;
}
