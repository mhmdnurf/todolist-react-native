import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const {replace, navigate} = useNavigation();
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');

  const data = async () => {
    const getNim = await AsyncStorage.getItem('nim');
    const getNama = await AsyncStorage.getItem('nama');
    setNim(getNim);
    setNama(getNama);
  };

  useEffect(() => {
    data();
  }, []);

  const btnLogout = async () => {
    await AsyncStorage.clear();
    replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Linus_Torvalds_(cropped).jpg'}}
        style={styles.img}
      />
      <Text style={styles.nama}>{nama}</Text>
      <Text style={{marginBottom: 40, color: '#7286D3'}}>{nim}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate('EditPassword')}>
        <Text style={styles.btnText}>Edit Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => btnLogout()}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nama: {
    fontSize: 24,
    color: '#7286D3',
    fontWeight: 'bold',
    marginTop: 16,
  },
  btn: {
    backgroundColor: '#7286D3',
    padding: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;
