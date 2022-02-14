import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  ActivityIndicator
} from 'react-native';
import { 
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, 
  DarkTheme as NavigationDarkTheme, 
} from '@react-navigation/native';
import { Provider } from 'react-redux'
import { setLogin, setLogout, setToken, store } from './redux';
import { DrawerStack, RootStack } from './routes';
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from './components';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme, 
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper'

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};

const App = () => {
  const LoginAuthReducer = useSelector((state) => state.LoginAuthReducer);
  const dispatch = useDispatch();

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
      //console.log('userToken: ', userToken);
      dispatch(setLogin(userName, userToken))
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch(setLogout())
    },
    signUp: () => {

    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      //console.log(' userToken: ', userToken)
      dispatch(setToken(userToken))
    },200);
  }, []);

  if( LoginAuthReducer.isLoading ) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Text>Please wait</Text>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {LoginAuthReducer.userToken == null ? 
            <RootStack />:
            <DrawerStack />
          }  
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  )
}

export default AppWrapper
