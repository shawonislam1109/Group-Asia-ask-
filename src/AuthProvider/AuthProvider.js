import React, { createContext, useEffect, useState } from 'react';

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../component/Firebase/Firebase.config';



export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(true)

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const LoginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleHandle = (provider) => {
        setLoader(true)
        return GoogleAuthProvider(provider);
    }

    const updateUser = (userInfo) => {
        setLoader(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    const GoogleSingIn = (Provider) => {
        return signInWithPopup(auth, Provider)
    }

    const LogOUt = () => {
        setLoader(true)
        return signOut(auth);
    }




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoader(false)
        })
        return () => unsubscribe();
    }, [])

    const info = { user, loader, createUser, LoginUser, LogOUt, googleHandle, updateUser, GoogleSingIn };

    return (
        <AuthContext.Provider value={info}>
            return {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;