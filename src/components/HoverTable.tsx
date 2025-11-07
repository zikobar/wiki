import React, {useState} from 'react';
import styles from './HoverTable.module.css';

type Row = (string | number)[];

export default function HoverTable({
  headers,
  rows,
  dense = false,
  colPercents, // например: [38, 10, 10, 10, 10, 11, 11]
}: {
  headers: string[];
  rows: Row[];
  dense?: boolean;
  colPercents?: number[]; // проценты ширины колонок, должны давать ~100
}) {
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  return (
    <div className={styles.wrap}>
      <table className={`${styles.table} ${dense ? styles.dense : ''}`}>
        {/* фиксируем ширину колонок, чтобы таблица влезала */}
        <colgroup>
          {(colPercents ?? []).map((p, i) => (
            <col key={i} style={{width: `${p}%`}} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {headers.map((h, c) => (
              <th
                key={c}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(null)}
                className={hoverCol === c ? styles.colActive : undefined}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, r) => (
            <tr
              key={r}
              onMouseEnter={() => setHoverRow(r)}
              onMouseLeave={() => setHoverRow(null)}
              className={hoverRow === r ? styles.rowActive : undefined}
            >
              {row.map((cell, c) => (
                <td
                  key={c}
                  onMouseEnter={() => setHoverCol(c)}
                  onMouseLeave={() => setHoverCol(null)}
                  className={[
                    hoverCol === c ? styles.colActive : '',
                    hoverRow === r ? styles.rowActiveCell : '',
                  ].join(' ')}
                  title={String(cell)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
