import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from './apiConfig';

const Details = ({route, navigation}) => {
  const {replace} = useNavigation();
  const {id} = route.params;
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [detail, setDetail] = useState({});
  console.log('id', id);

  const getDetail = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const nama = await AsyncStorage.getItem('nama');
      // ip nya ganti dengan ip jaringanmu
      const res = await axios.get(
        `${API_BASE_URL}/todo/detail/${id}`,
      );
      setDetail(res.data.data);
      setNim(nim);
      setNama(nama);
    } catch (e) {
      console.log(e);
    }
  };

  const btnDelete = async id => {
    try {
      // ip nya ganti dengan ip jaringanmu
      const res = await axios.delete(
        `${API_BASE_URL}/todo/hapus/${id}`,
      );
      if (res.data.status === 200) {
        console.log(res.data.message);
        navigation.replace('Homepage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, {width: '25%', backgroundColor: 'red'}]}
        onPress={() => navigation.replace('Homepage')}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Detail Kegiatan</Text>
      <View>
        <View style={styles.body}>
          <Text style={styles.body1}>NIM :</Text>
          <Text style={styles.body2}>{nim}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body1}>Nama :</Text>
          <Text style={styles.body2}>{nama}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body1}>Tanggal :</Text>
          <Text style={styles.body2}>{detail.tanggal}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body1}>Status :</Text>
          <Text style={styles.body2}>{detail.status}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.body1}>Kegiatan :</Text>
          <Text style={styles.body2}>{detail.isi}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('EditList', {id: id})}>
        <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => await btnDelete(id)}>
        <Text style={styles.btnText}>Delete</Text>
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
  },
  body: {
    marginVertical: 16,
  },
  body1: {
    color: '#7286D3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  body2: {
    color: 'black',
  },
  btn: {
    backgroundColor: '#7286D3',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Details;
