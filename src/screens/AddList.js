import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import API_BASE_URL from './apiConfig';

const AddList = () => {
  const {replace} = useNavigation();
  const [tanggal, setTanggal] = useState('');
  const [isi, setIsi] = useState('');

  const btnTambah = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const nama = await AsyncStorage.getItem('nama');
      // ip nya ganti dengan ip jaringanmu
      const res = await axios.post(`${API_BASE_URL}/todo/tambah`, {
        nim: nim,
        nama: nama,
        tanggal: tanggal,
        isi: isi,
      });

      if (res.data.status === 200) {
        console.log('Data berhasil ditambahkan');
        replace('Homepage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Kegiatan</Text>
      <View style={{marginTop: 12}}>
        <Text style={{color: '#7286D3', fontWeight: 'bold'}}>Tanggal</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan Tanggal"
          placeholderTextColor="#7286D3"
          onChangeText={tanggal => setTanggal(tanggal)}
          value={tanggal}
        />
      </View>
      <View style={{marginTop: 12}}>
        <Text style={{color: '#7286D3', fontWeight: 'bold'}}>Kegiatan</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan Kegiatan"
          placeholderTextColor="#7286D3"
          onChangeText={isi => setIsi(isi)}
          value={isi}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => await btnTambah()}>
        <Text style={styles.btnText}>Tambah Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 30,
  },
  title: {
    color: '#7286D3',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    color: '#7286D3',
    paddingHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#7286D3',
    borderWidth: 1
  },
  btn: {
    backgroundColor: '#7286D3',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 8
  },
  btnText: {
    color: '#FFF2F2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddList;
