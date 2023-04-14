import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalAmmount, setTotalAmmount] = useState(0);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        totalAmmount,
        setTotalAmmount
    }

    return (
        <AuthContext.Provider value={ authInfo }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;