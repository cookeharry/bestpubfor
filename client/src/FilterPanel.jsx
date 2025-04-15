import React from 'react';

const ATTRIBUTES = [
  'accessible',
  'dog-friendly',
  'food',
  'cocktails',
  'beer-garden',
  'sunday-lunch',
];

const FilterPanel = ({ selected, setSelected }) => {
  const toggle = (attr) => {
    setSelected((prev) =>
      prev.includes(attr) ? prev.filter(a => a !== attr) : [...prev, attr]
    );
  };

  return (
    <div style={{ position: 'absolute',
        bottom: 20,      // ⬅️ Moved from top to bottom
        left: 20,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000 }}>
      <strong>Best For ▾</strong>
      {ATTRIBUTES.map(attr => (
        <div key={attr}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(attr)}
              onChange={() => toggle(attr)}
            />
            {` ${attr.charAt(0).toUpperCase() + attr.slice(1)}`}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
