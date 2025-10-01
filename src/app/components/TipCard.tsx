"use client";
import React from 'react';

interface Tip {
  title: string;
  description: string;
}

interface Props {
  tip: Tip;
}

export default function TipCard({ tip }: Props) {
  return (
    <div
      style={{
        width: '250px',
        padding: '20px',
        borderRadius: '10px',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
    >
      <h3 style={{ color: '#ff9800', fontSize: '1.2rem', marginBottom: '10px' }}>
        {tip.title}
      </h3>
      <p style={{ color: '#333', fontSize: '1rem', margin: 0 }}>{tip.description}</p>
    </div>
  );
}
