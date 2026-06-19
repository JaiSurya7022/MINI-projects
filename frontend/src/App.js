import React, { useState, useEffect, useCallback } from 'react';
import VisitorForm from './components/VisitorForm';
import VisitorList from './components/VisitorList';

export default function App() {
  const [visitors, setVisitors] = useState([]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const fetchVisitors = useCallback(async () => {
    const url = `http://localhost:5000/api/visitors?category=${category}&status=${status}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setVisitors(data);
    } catch (err) {
      console.error("Error fetching data from API:", err);
    }
  }, [category, status]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const handleCheckout = async (id) => {
    await fetch(`http://localhost:5000/api/visitors/${id}/checkout`, { method: 'PATCH' });
    fetchVisitors();
  };

  return (
    <div style={appStyles.container}>
      <header style={appStyles.header}>
        <div style={appStyles.logoBadge}>PESU</div>
        <h1 style={appStyles.title}>Visitor Management Control</h1>
        <p style={appStyles.subtitle}>Campus Gate Entrance Logistics Dashboard</p>
      </header>
      
      <VisitorForm onVisitorAdded={fetchVisitors} />
      
      <VisitorList 
        visitors={visitors} 
        onCheckOut={handleCheckout} 
        filterCategory={category} 
        setFilterCategory={setCategory} 
        filterStatus={status} 
        setFilterStatus={setStatus} 
      />
    </div>
  );
}

const appStyles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logoBadge: {
    display: 'inline-block',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '10px',
  },
  title: {
    margin: '0',
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: '6px 0 0 0',
    fontSize: '14px',
    color: '#64748b',
  }
};