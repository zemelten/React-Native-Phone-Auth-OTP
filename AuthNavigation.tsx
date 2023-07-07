import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { SignedInStack, SignedOutStack } from "./navigation";
import auth from '@react-native-firebase/auth';

export const AuthNav = () =>{
    const [currentUser, setCurrentUser] = useState(null)

    const userHandler = (user) =>{
       user ? setCurrentUser(user) : setCurrentUser(null);
    
      }
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(userHandler);
        return subscriber; // unsubscribe on unmount
      }, []);

 return (
    <>
   { currentUser ? <SignedInStack/> : <SignedOutStack/>}
    </>
  )
    
   
}