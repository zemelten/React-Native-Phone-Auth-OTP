import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';


const Home = ({onLogout}) =>{

    return (
<View>
    <Text>Home Page</Text>
    <Button title="Logout" onPress={onLogout} />
</View>
    )

}
export default Home;