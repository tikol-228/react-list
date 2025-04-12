import React, { createContext, useState } from 'react';
export const ThemeContext = createContext();
import { useEffect } from 'react';
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(theme);
    }, [theme]);
        
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;