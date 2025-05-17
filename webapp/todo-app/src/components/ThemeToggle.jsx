// src/components/ThemeToggle.jsx

import React, { useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggle = () => setDarkMode(!darkMode);

  return (
    <button onClick={toggle}>
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
