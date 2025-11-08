import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './HoverTable.module.css';

type Align = 'left' | 'center' | 'right';

interface HoverTableProps {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  colPercents?: number[];
  dense?: boolean;
  headerAlign?: Align;
  bodyAlign?: Align;
}

export default function HoverTable({
  headers,
  rows,
  colPercents,
  dense = false,
  headerAlign = 'center',
  bodyAlign = 'left',
}: HoverTableProps) {
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  const clearHover = () => {
    setHoverRow(null);
    setHoverCol(null);
  };

  return (
    <div className={styles.wrapper} onMouseLeave={clearHover}>
      <table className={clsx(styles.table, dense && styles.dense)}>
        {colPercents && (
          <colgroup>
            {colPercents.map((w, i) => (
              <col key={i} style={{ width: `${w}%` }} />
            ))}
          </colgroup>
        )}

        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={clsx(
                  styles.th,
                  headerAlign === 'left' && styles.h_left,
                  headerAlign === 'center' && styles.h_center,
                  headerAlign === 'right' && styles.h_right,
                  hoverCol === i && styles.colHover
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className={styles.tr}>
              {row.map((cell, cIdx) => {
                const isRow = hoverRow === rIdx;
                const isCol = hoverCol === cIdx;
                const isCell = isRow && isCol;

                return (
                  <td
                    key={cIdx}
                    className={clsx(
                      styles.td,
                      bodyAlign === 'left' && styles.b_left,
                      bodyAlign === 'center' && styles.b_center,
                      bodyAlign === 'right' && styles.b_right,
                      isRow && styles.rowHover,
                      isCol && styles.colHover,
                      isCell && styles.cellHover
                    )}
                    onMouseEnter={() => {
                      setHoverRow(rIdx);
                      setHoverCol(cIdx);
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
