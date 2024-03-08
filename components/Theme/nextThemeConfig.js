function getNextThemeConfigFile(){
    return `
'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useState } from 'react';
import { CssBaseline } from '@mui/material';
import themeConfig from '.';

export const ThemeContext = createContext();

export const LayoutThemeConfig = ({ children }) => {
    const [mode, setMode] = useState('dark');

    const toggleColorMode = () => {
        setMode((prevMode) => prevMode === 'dark' ? 'light' : 'dark');
    };

    const theme = createTheme(themeConfig(mode));

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ toggleColorMode, mode }}>
                <CssBaseline />
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}
`
}

module.exports = getNextThemeConfigFile;