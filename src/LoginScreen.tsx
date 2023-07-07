import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export const LoginScreen = () => {
    const [confirm, setConfirm] = useState(null);
    const [authenticated, setAutheticated] = useState(false);
    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);


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




    async function signInWithPhoneNumber(phoneNumber) {
        setLoading(true);
        console.log(phoneNumber);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            const currentUser = auth().currentUser;
            const phone = currentUser.phoneNumber;
            const id = currentUser.uid; 
            firestore()
                .collection('users')
                .doc(phone)
                .set({
                    name: 'zemelten',
                    phone:phoneNumber,
                    owner_id:id,
                })
                .then(() => {
                    console.log('User added!');
                });
            Alert.alert('Every thing is Good!')
        } catch (error) {
            Alert.alert('You Fucked!' + error)
        }
    }
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
                    disabled={loading}
                />
                {loading && <ActivityIndicator size="small" color="#0000ff" />}


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
