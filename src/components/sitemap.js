// src/sitemap.js
import React from 'react';
import { Route } from 'react-router-dom';

const Routes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add other routes as needed */}
        </>
    );
};

export default Routes;