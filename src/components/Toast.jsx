import React from 'react';

export default function Toast({ toast }) {
  if (!toast || !toast.show) return null;

  return (
    <div
      id="toast"
      className={`toast show ${toast.type || 'success'}`}
      role="alert"
      aria-live="polite"
    >
      {toast.message}
    </div>
  );
}
