import React, { FC, PropsWithChildren } from 'react';
import { createContext, useState, useEffect } from 'react';

interface IAppContext {
  darkMode: boolean;
  setDarkMode: () => void;
}

const AppContext = createContext<IAppContext>({
  darkMode: false,
  setDarkMode: () => { },
});

export const AppContextProvider: FC<PropsWithChildren<IAppContext>> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const localStorageIsDarkMode = window.localStorage.getItem('isDarkMode');
    if (localStorageIsDarkMode !== undefined) {
      setDarkMode(localStorageIsDarkMode === 'true');
    }
    else {
      setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleDarkMode = () => {
    window.localStorage.setItem('isDarkMode', `${!darkMode}`);
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode: darkMode,
        setDarkMode: toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;