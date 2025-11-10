
import React, { useEffect, useRef, useState } from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; { (new Date().getFullYear())} Get Your Adminssion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
