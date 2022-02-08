import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EcommerceApp from './screens/Ecommerce';
import Cart from './screens/Cart';
import CheckOut from './screens/Checkout';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// Import Redux
import store from './redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#ffffff',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>

      <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={EcommerceApp} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'Carrito' }} />
        <Stack.Screen name="CheckOut" component={CheckOut} options={{ title: 'CheckOut' }} />
      </Stack.Navigator>
      </Provider>
      </PaperProvider>

    </NavigationContainer>
  );
}

export default App;

