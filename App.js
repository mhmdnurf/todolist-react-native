import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Homepage from './src/screens/Homepage';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Account from './src/screens/Account';
import Details from './src/screens/Details';
import SplashScreen from './src/screens/SplashScreen';
import AddList from './src/screens/AddList';
import EditList from './src/screens/EditList';
import EditPassword from './src/screens/EditPassword';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#f2ed46',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddList"
        component={AddList}
        options={{
          tabBarLabel: 'AddList',
          tabBarIcon: ({color, size}) => (
            <Icon name="book-plus-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homepage"
          component={RootHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen name="EditList" component={EditList} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
