import React from 'react';

/**
 * Converts backtick-wrapped segments to <code> and *wrapped* to <em>.
 * Prevents raw backticks from appearing in rendered explanation text.
 */
export function renderText(text) {
  if (!text) return null;
  const segments = text.split(/(`[^`]+`|\*[^*]+\*)/g);
  return segments.map((seg, i) => {
    if (seg.length > 2 && seg.startsWith('`') && seg.endsWith('`')) {
      return <code key={i} className="inline-code">{seg.slice(1, -1)}</code>;
    }
    if (seg.length > 2 && seg.startsWith('*') && seg.endsWith('*')) {
      return <em key={i}>{seg.slice(1, -1)}</em>;
    }
    return seg;
  });
}
