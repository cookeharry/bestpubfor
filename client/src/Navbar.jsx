import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const attributes = [
        'sunday-lunch',
        'beer-garden',
        'dog-friendly',
        'cocktails',
        'live-music'
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#2f2f2f',
            padding: '1rem 2rem',
            color: '#fff',
            fontFamily: 'Libre Baskerville, serif',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Best Pub For…</h1>
            <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {attributes.map(attr => (
                    <Link
                        key={attr}
                        to={`/york/best-for/${attr}`}
                        style={{
                            color: '#ffd700',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {attr.replace('-', ' ')}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
