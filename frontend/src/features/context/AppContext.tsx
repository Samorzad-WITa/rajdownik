import React, {createContext, ReactNode, useContext, useState} from "react";

export type ExtendedAppProps = {
    pageTitle: string;
    shouldRenderNavbar: boolean;
    shouldRenderFooter: boolean
};

const AppContext = createContext<{
    appProps: ExtendedAppProps;
    setProps: React.Dispatch<React.SetStateAction<ExtendedAppProps>>
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode; initialProps: ExtendedAppProps}> = ({ children, initialProps}) => {
    const [appProps, setAppProps] = useState(initialProps);

    return (
        <AppContext.Provider value={{ appProps, setAppProps }}>
            { children }
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
}