import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_BASE_URL from './apiConfig';

const EditPassword = ({navigation}) => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiSandi, setKonfirmasiSandi] = useState('');

  const [data, setData] = useState({
    nim: '',
    password: '',
    name: '',
  });

  console.log('nim', data.nim);
  console.log('password', data.password);
  console.log('name', data.name);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      let nim = await AsyncStorage.getItem('nim');
      let password = await AsyncStorage.getItem('password');
      let name = await AsyncStorage.getItem('nama');
      if (nim !== null) {
        // value previously stored
        setData({
          nim: nim,
          name: name,
          password: password,
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  const resetPassword = async value => {
    console.log('value', value);
    try {
      // ip nya ganti dengan ip jaringanmu
      const response = await axios.put(`${API_BASE_URL}/users/`, {
        nim: value.nim,
        password: value.passwordLama,
        newPassword: value.passwordBaru,
      });
      if (response.data.status == 200) {
        console.log('response', response);
        ToastAndroid.show('Password berhasil diubah', ToastAndroid.SHORT);
        navigation.navigate('Account');
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Cek kembali nim dan password', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Password</Text>
      <View>
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="NIM"
          placeholderTextColor="white"
          onChangeText={nim => setNim(nim)}
          value={nim}
        />
      </View>
      <View>
        <Text style={styles.label}>Password Lama</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password Lama"
          placeholderTextColor="white"
          // secureTextEntry={true}
          onChangeText={password => setPasswordLama(password)}
          value={passwordLama}
        />
      </View>
      <View>
        <Text style={styles.label}>Password Baru</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password Baru"
          placeholderTextColor="white"
          // secureTextEntry={true}
          onChangeText={password => setPasswordBaru(password)}
          value={passwordBaru}
        />
      </View>
      <View>
        <Text style={styles.label}>Konfirmasi Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Konfirmasi Password"
          placeholderTextColor="white"
          // secureTextEntry={true}
          onChangeText={password => setKonfirmasiSandi(password)}
          value={konfirmasiSandi}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (
            nim == '' ||
            passwordLama == '' ||
            passwordBaru == '' ||
            konfirmasiSandi == ''
          ) {
            ToastAndroid.show('Data tidak boleh kosong', ToastAndroid.SHORT);
          } else if (nim !== data.nim || passwordLama !== data.password) {
            ToastAndroid.show('NIM atau Password Salah', ToastAndroid.SHORT);
          } else if (passwordBaru !== konfirmasiSandi) {
            ToastAndroid.show(
              'Password Baru dan Konfirmasi Password Tidak Sama',
              ToastAndroid.SHORT,
            );
          } else {
            resetPassword({
              nim: nim,
              nama: nama,
              passwordLama: passwordLama,
              passwordBaru: passwordBaru,
            });
          }
        }}>
        <Text style={styles.textButton}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#f2ed46',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#000',
    fontSize: 20,
  },
  label: {
    color: '#fff',
    marginLeft: 4,
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

export default EditPassword;
