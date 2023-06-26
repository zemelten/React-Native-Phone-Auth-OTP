/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import Home from './src/Home';



function App() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAutheticated] = useState(false);
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      setAutheticated(true);
      
     return(

      <View>
        <Text>Welcome Home</Text>
        <Button title='Log out'/>
      </View>
     )
   
    }
  }
  const handleChange = (text) => {
    setPhoneNumber(text);
    
    if (text.length === 10 && /^[0][0-9]+$/.test(text)) {
      setButtonDisabled(false);
  
    } else if (text.length === 9 && /^[79][0-9]+$/.test(text)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
     
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const logout = () =>{
    auth().signOut()
    setAutheticated(false);
    setConfirm(null)
    setPhoneNumber('')
    setCode('')
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log(phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  if (authenticated) return <Home onLogout={logout} />;


  if (!confirm) {
    return (
      <View>
              <TextInput
      value={phoneNumber}
      onChangeText={handleChange}
      placeholder="Enter Phone Number"
      keyboardType="phone-pad"
    />
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber(phoneNumber)}
      />
   
      </View>
       );

  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default App;
