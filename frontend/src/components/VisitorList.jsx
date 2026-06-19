import React from 'react';

export default function VisitorList({ visitors, onCheckOut, filterCategory, setFilterCategory, filterStatus, setFilterStatus }) {
  
  const getCategoryStyle = (cat) => {
    const colors = {
      Parent: { bg: '#e0f2fe', text: '#0369a1' },
      Vendor: { bg: '#fef3c7', text: '#b45309' },
      Guest: { bg: '#f3e8ff', text: '#6b21a8' },
      Alumni: { bg: '#d1fae5', text: '#065f46' }
    };
    return colors[cat] || { bg: '#f1f5f9', text: '#475569' };
  };

  return (
    <div style={styles.listCard}>
      <div style={styles.headerRow}>
        <h2 style={styles.listTitle}>Live Campus Logs</h2>
        
        <div style={styles.filterContainer}>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={styles.filterSelect}>
            <option value="">All Categories</option>
            <option value="Parent">Parent</option>
            <option value="Vendor">Vendor</option>
            <option value="Guest">Guest</option>
            <option value="Alumni">Alumni</option>
          </select>

          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={styles.filterSelect}>
            <option value="">All Statuses</option>
            <option value="In">In Campus</option>
            <option value="Out">Checked Out</option>
          </select>
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Visitor Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Purpose</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.emptyCell}>No records found matching filters.</td>
              </tr>
            ) : (
              visitors.map(v => {
                const catStyle = getCategoryStyle(v.category);
                return (
                  <tr key={v._id} style={styles.tr}>
                    <td style={{...styles.td, fontWeight: '600', color: '#1e293b'}}>{v.name}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge, 
                        backgroundColor: catStyle.bg, 
                        color: catStyle.text
                      }}>
                        {v.category}
                      </span>
                    </td>
                    <td style={{...styles.td, color: '#64748b'}}>{v.purpose}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: v.status === 'In' ? '#ecfdf5' : '#fef2f2',
                        color: v.status === 'In' ? '#10b981' : '#f43f5e',
                        border: v.status === 'In' ? '1px solid #a7f3d0' : '1px solid #fecaca'
                      }}>
                        ● {v.status === 'In' ? 'Active In' : 'Out'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {v.status === 'In' && (
                        <button onClick={() => onCheckOut(v._id)} style={styles.checkoutBtn}>
                          Checkout
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid #eef2f6',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '20px',
  },
  listTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    flexGrow: 1,
  },
  filterContainer: {
    display: 'flex',
    gap: '12px',
  },
  filterSelect: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '13px',
    color: '#475569',
    backgroundColor: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  thRow: {
    borderBottom: '2px solid #edf2f7',
    backgroundColor: '#f8fafc',
  },
  th: {
    padding: '14px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    verticalAlign: 'middle',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '99px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  checkoutBtn: {
    backgroundColor: '#f43f5e',
    color: '#ffffff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  emptyCell: {
    padding: '32px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '14px',
  }
};