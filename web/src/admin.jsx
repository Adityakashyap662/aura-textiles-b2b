import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp'
import './index.css'

class AdminErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Admin Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0b0c10', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', color: '#d4af37', fontWeight: '800', marginBottom: '12px' }}>Aura Admin Console — Refresh Required</h2>
          <p style={{ color: '#cbd5e1', fontSize: '14px', maxWidth: '500px', marginBottom: '24px' }}>
            The admin console state refreshed. Click below to reload the management workspace.
          </p>
          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
          >
            🔄 Reload Admin Workspace
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminErrorBoundary>
      <AdminApp />
    </AdminErrorBoundary>
  </React.StrictMode>,
)
