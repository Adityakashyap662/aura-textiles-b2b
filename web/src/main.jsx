import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0b0c10', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', color: '#d4af37', fontWeight: '800', marginBottom: '12px' }}>Aura Textiles — System Refresh</h2>
          <p style={{ color: '#cbd5e1', fontSize: '14px', maxWidth: '500px', marginBottom: '24px' }}>
            The application experienced a temporary cache state update. Click below to restore full storefront view.
          </p>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('userWishlist');
                localStorage.removeItem('userCart');
              } catch(e) {}
              window.location.reload();
            }}
            style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
          >
            🔄 Restore Website View
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
