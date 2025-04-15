import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '6rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                {children}
            </div>
        </>
    );
};

export default Layout;
