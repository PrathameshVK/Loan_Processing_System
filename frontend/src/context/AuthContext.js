import React, {useContext,useState,useEffect,createContext} from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from '@firebase/auth';
import {auth, provider} from '../firebase';

const AuthContext=createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(){
        return signInWithPopup(auth, provider)
    }

    function logout(){
        return signOut(auth);
    }

    useEffect(() => {
        const setAuth = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setLoading(false)
        });
        return setAuth;
    }, [])

  const value={
    currentUser,
    login,
    logout
}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
