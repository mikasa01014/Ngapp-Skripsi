import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    Text, 
    Dimensions, 
    Platform, 
    View, 
    TouchableOpacity, 
    StatusBar,
    Alert
} from 'react-native'
import { colors as constantColors } from '../../constant/colors'
import { AuthContext, Button, Input } from '../../components'
import * as Animatable from 'react-native-animatable'
import { connect, useDispatch, useSelector } from 'react-redux'
import { 
    setUserTrue, 
    setUserFalse, 
    setPasswordFalse, 
    setPasswordTrue,
    setPasswordVisible, 
    setIsVallidUserTrue,
    setIsVallidUserFalse
} from '../../redux'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Users from '../../components/atom/Users'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { UserState, ApplicationState, onUserLogin, onErrorNull } from '../../redux'
import TitleButtons from '../../components/atom/buttonTitle'

interface LoginProps {
    onUserLogin: Function;
    UserReducer: UserState
    onErrorNull: Function,
}

const _Login2: React.FC<LoginProps> = ({ onUserLogin, UserReducer, onErrorNull }) => {
    const navigation = useNavigation();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const LoginReducer = useSelector((state) => state.LoginReducer);
    const dispatch = useDispatch();

    const { user, error } = UserReducer

    const { signIn } = React.useContext(AuthContext);
    const [ verified, setVerified ] = useState(true)
    const { colors } = useTheme();
    const theme = useTheme();

    useEffect(() => {
        console.log(user.token)
        if (user.token != undefined) {
            navigation.navigate('AllStack')
         }
    }, [user])


    const onTapLogin = () => {
        if ( LoginReducer.data.email.length == 0 || LoginReducer.data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Email or Password cannot be empty', [
                {text: 'Okay'}
            ]);
            return;
        } else if (error.toString().toLowerCase().includes("400")) {
            Alert.alert('Error', 'User Not Found',[
                {
                    text: 'Ok', 
                    onPress: () => {
                       onErrorNull();
                    }
                }
            ])
        }
        onUserLogin(LoginReducer.data.email, LoginReducer.data.password)
    }

    const userInputChange = (val) => {
        if( reg.test(val) === true ){
            dispatch(setUserTrue(val));
        } else {
            dispatch(setUserFalse(val));
        }
    };

    const handlePasswordChange = (val) => {
        if(val.trim().length >= 8){
            dispatch(setPasswordTrue(val));
        } else {
            dispatch(setPasswordFalse(val));
        }

    } 

    const updateSecureTextEntry = () => {
        dispatch(setPasswordVisible());
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4){
            dispatch(setIsVallidUserTrue())
        }else {
            dispatch(setIsVallidUserFalse())
        }
    }

    // const loginHandle = (email:string,password:string) => {
    //     const foundUser = Users.filter( item => {
    //         return email == item.email && password == item.password
    //     })

    //     if ( LoginReducer.data.email.length == 0 || LoginReducer.data.password.length == 0 ) {
    //         Alert.alert('Wrong Input!', 'Username or password cannot be empty', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }

    //     if ( foundUser.length == 0 ) {
    //         Alert.alert('Invalid User!', 'Username or password is Incorrent', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }

    //     signIn(foundUser)
    // }

    const sendData = () => {
        console.log('data diterima', LoginReducer.data)
    }
    
    return (
        <View style={styles.container}>
            <StatusBar 
                backgroundColor={constantColors.default} 
                barStyle= { theme.dark ? 'light-content' : 'dark-content' }
            />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome</Text>
            </View>
            <Animatable.View 
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Email</Text>
                <View style={styles.action}>
                    <Icon1 name="user-o" color={colors.text} size={20} />
                    <Input
                        value= {LoginReducer.data.email}
                        placeholder='Your Email' 
                        autoCapitalize='none' 
                        onChangeText={(val) => userInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        secureTextEntry= {false}
                        keyboardType='email-address'
                    />
                    {LoginReducer.data.check_textInputChange ? 
                        <Animatable.View animation="bounceIn">
                        <Icon2 
                            name="check-circle" 
                            color='green' size={20} />
                        </Animatable.View>
                    : null}
                </View>
                { LoginReducer.data.isValidUser ? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Email Format is wrong!</Text>
                    </Animatable.View>
                }
                

                <Text style={[styles.text_footer, {
                    marginTop: 25,
                    color: colors.text
                }]}>Pasword</Text>
                <View style={styles.action}>
                    <Icon2 name="lock" color={colors.text} size={20} />
                    <Input 
                        value={LoginReducer.data.password}
                        placeholder='Your Password' 
                        autoCapitalize='none' 
                        secureTextEntry={LoginReducer.data.secureTextEntry ? true : false}
                        onChangeText={(val) => handlePasswordChange(val)}/>
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {LoginReducer.data.secureTextEntry ? 
                            <Icon2 name="eye-off" color='grey' size={20} />
                            :
                            <Icon2 name="eye" color='grey' size={20} />
                        }  
                    </TouchableOpacity>
                </View>
                { LoginReducer.data.isValidPassword ? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters</Text>
                    </Animatable.View>
                }
                

                {/* <TouchableOpacity>
                    <Text style={{color: constantColors.default,marginTop:10}}>Forgot password?</Text>
                </TouchableOpacity> */}
                <View style={styles.button}>

                <TitleButtons title={"Login"} onTap={onTapLogin} width={350} height={45} />
                
                <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: constantColors.default,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={[styles.textSign, {
                        color: constantColors.default
                    }]}>Register</Text>
                </TouchableOpacity>
                
                {/* <Button type='linear'
                        title='Login'
                        name='login'
                        onPress={() => {loginHandle(LoginReducer.data.username, LoginReducer.data.password)}}
                    />
                <Button title='Register' 
                    onPress={() => navigation.navigate('Register')} /> */}
                </View>
            </Animatable.View>
        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    UserReducer: state.UserReducer
})

const Login2 = connect(mapToStateProps, { onUserLogin,onErrorNull })(_Login2)

export default Login2

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: constantColors.default
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      footer: {
          flex: 3,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 30
      },
      text_footer: {
          color: '#05375a',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      actionError: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'android' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 14,
      },
      button: {
          alignItems: 'center',
          marginTop: 50
      },
      signIn: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
//() => {loginHandle(LoginReducer.data.email, LoginReducer.data.password)}