import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Dashboard from './src/screens/DashBoard';
import Profile from './src/screens/Profile';
import DonorList from './src/screens/DonorList';
import AddDonor from './src/screens/AddDonor';
import Donor from './src/screens/Donor';
import Splash from './src/screens/Splash';

import {Provider} from 'react-redux';
import store from './src/store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="DonorList" component={DonorList} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
        <Stack.Screen options={{ headerShown: false }} name="AddDonor" component={AddDonor} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
        <Stack.Screen options={{ headerShown: false }} name="Donor" component={Donor} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;