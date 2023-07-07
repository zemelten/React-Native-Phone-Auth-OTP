import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
    const [info, setInfo] = useState(null)
    const currentUser = auth().currentUser;
    const id = currentUser.uid; 
    const logout = () => {
        auth().signOut();
    }
  const user =  firestore()
  .collection('users')
  // Filter results
  .where('owner_id', '==', id)
  .limit(1)
  .get()
  .then(querySnapshot => {
    const userData = []
    querySnapshot.forEach((doc) => {
        const user = doc.data();
       userData.push(user)
        
    })
    setInfo(userData)
  });
  
    return (
        <View>
        {info &&
          info.map(user => (
            <View key={user.owner_id}>
              <Text>Username: {user.name}</Text>
              <Text>Phone: {user.phone}</Text>
            </View>
          ))}
            <View>
                <Button title="Logout" onPress={()=>logout()} />
            </View>
      </View>
    );
}
export default Home;