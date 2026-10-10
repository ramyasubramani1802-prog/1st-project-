import React from 'react';

export default function Marquee() {
  const items = [
    '✦ Custom Fidget Clickers',
    '✦ Mini Photo Albums',
    '✦ Name Keychains',
    '✦ Kawaii Accessories',
    '✦ PAN India Delivery',
    '✦ 100% Handcrafted',
    '✦ Custom Fidget Clickers',
    '✦ Mini Photo Albums',
    '✦ Name Keychains',
    '✦ Kawaii Accessories',
    '✦ PAN India Delivery',
    '✦ 100% Handcrafted',
  ];

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {items.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
}
