import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import API_BASE_URL from './apiConfig';

const EditList = ({route}) => {
  const {replace} = useNavigation();
  const {id} = route.params;
  const [tanggal, setTanggal] = useState('');
  const [isi, setIsi] = useState('');

  const btnEdit = async () => {
    try {
      // ip nya ganti dengan ip jaringanmu
      await axios.put(`${API_BASE_URL}/todo/`, {
        id: id,
        tanggal: tanggal,
        isi: isi,
      });

      replace('Homepage');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Kegiatan</Text>
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
        onPress={async () => await btnEdit()}>
        <Text style={styles.btnText}>Edit Data</Text>
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
    color: 'white',
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditList;
