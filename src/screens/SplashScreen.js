import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 3000);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.icon-icons.com/icons2/2331/PNG/512/todolist_planing_list_planlist_todo_icon_142265.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>TODO LIST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7286D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginTop: 20,
  },
});

export default SplashScreen;
