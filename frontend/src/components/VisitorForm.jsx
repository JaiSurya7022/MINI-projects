import React, { useState } from 'react';

export default function VisitorForm({ onVisitorAdded }) {
  const [formData, setFormData] = useState({ name: '', phone: '', category: 'Parent', purpose: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.phone.length < 10) {
      setError('Please provide a valid name and a 10-digit phone number.');
      return;
    }
    setError('');

    const res = await fetch('http://localhost:5000/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: '', phone: '', category: 'Parent', purpose: '' });
      onVisitorAdded();
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>New Visitor Registration</h2>
      {error && <p style={styles.errorText}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Visitor Name</label>
          <input 
            type="text" 
            placeholder="e.g. John Doe" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone Number</label>
          <input 
            type="text" 
            placeholder="e.g. 9876543210" 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Category</label>
          <select 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})} 
            style={styles.input}
          >
            <option value="Parent">Parent</option>
            <option value="Vendor">Vendor</option>
            <option value="Guest">Guest</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Purpose of Visit</label>
          <input 
            type="text" 
            placeholder="e.g. Meeting with HOD" 
            value={formData.purpose} 
            onChange={e => setFormData({...formData, purpose: e.target.value})} 
            style={styles.input} 
          />
        </div>

        <button type="submit" style={styles.submitBtn}>
          ✦ Check In Visitor
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid #eef2f6',
    marginBottom: '32px',
  },
  cardTitle: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
  },
  input: {
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    color: '#334155',
    backgroundColor: '#f8fafc',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  submitBtn: {
    gridColumn: '1 / -1',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
    transition: 'background-color 0.2s',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 0 16px 0',
  }
};