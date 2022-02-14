import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    Platform,
    View,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native'
import { colors as constantColors } from '../../constant/colors'
import { Button, Input } from '../../components'
import * as Animatable from 'react-native-animatable'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
    setCPasswordFalse,
    setCPasswordTrue,
    setCPasswordVisible,
    setEmailFalse,
    setEmailTrue,
    setIsVallidEmailFalse,
    setIsVallidEmailTrue,
    setIsVallidNameFalse,
    setIsVallidNameTrue,
    setIsVallidPhoneFalse,
    setIsVallidPhoneTrue,
    setIsVallidUserrFalse,
    setIsVallidUserrTrue,
    setNameFalse,
    setNameTrue,
    setPasswordrFalse,
    setPasswordrTrue,
    setPasswordrVisible,
    setPhoneFalse,
    setPhoneTrue,
    setUserrFalse,
    setUserrTrue,
    UserState,
    onUserSignUp,
    ApplicationState,
    setIsVallidLastNameTrue,
    setIsVallidLastNameFalse,
    setLastNameTrue,
    setLastNameFalse
} from '../../redux'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import TitleButtons from '../../components/atom/buttonTitle'
import { useNavigation } from '@react-navigation/core'
import { DrawerStack } from '../../routes'

interface RegisterProps {
    UserReducer: UserState;
    onUserSignUp: Function;
    onOTPRequest: Function;
    onVerifyOTP: Function;
}

const _Register2: React.FC<RegisterProps> = ({ onUserSignUp, UserReducer, onOTPRequest, onVerifyOTP }) => {
    const navigation = useNavigation();
    const RegisterReducer = useSelector((state) => state.RegisterReducer);
    const dispatch = useDispatch();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let numreg = /^[0-9]+$/;
    let namereg = /^[A-Za-z]+$/;


    const { colors } = useTheme();
    const theme = useTheme();

    const { user } = UserReducer

    const [otp, setOtp] = useState('')
    const [image, setImage] = useState('')
    const [verified, setVerified] = useState(true)
    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a New OTP in')
    const [canRequestOtp, setCanRequestOtp] = useState(false)
    const [account_name, setAccount_Name] = useState('')
    const [check_accountNameInputChange, setCheck_accountNameInputChange] = useState(false)
    const [isValidAccount_Name, setIsValidAccount_Name] = useState(true)



    useEffect(() => {
        console.log(user.token)
        if (user.token != undefined) {
            navigation.navigate('AllStack')
        }
    }, [user])

    // const onEnableOtpRequest = () => {
    //     const otpDate = new Date();
    //     otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))
    //     const otpTime = otpDate.getTime()

    //     countDown = setInterval(function () {
    //         const currentTime = new Date().getTime()

    //         const totalTime = otpTime - currentTime;

    //         let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
    //         let seconds = Math.floor((totalTime % (1000 * 60)) / 1000)

    //         setRequestOtpTitle(`Request a New OTP in ${minutes}:${seconds}`)

    //         if (minutes < 1 && seconds < 1) {
    //             setRequestOtpTitle('Request a New OTP')
    //             setCanRequestOtp(true)
    //             clearInterval(countDown)
    //         }

    //     }, 1000)

    // }


    const nameInputChange = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setNameTrue(val.replace(/^[0-9]+$/, '')));
        } else {
            dispatch(setNameFalse(val.replace(/^[0-9]+$/, '')));
        }
    };
    const lastNameInputChange = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setLastNameTrue(val.replace(/^[0-9]+$/, '')));
        } else {
            dispatch(setLastNameFalse(val.replace(/^[0-9]+$/, '')));
        }
    };

    const emailInputChange = (val) => {
        if (reg.test(val) === true) {
            dispatch(setEmailTrue(val));
        } else {
            dispatch(setEmailFalse(val));
        }
    }

    const accountNameInputChange = (val) => {
        if (val.trim().length > 0) {
            setAccount_Name(val);
            setCheck_accountNameInputChange(true);
            setIsValidAccount_Name(true)
        } else  {
            setAccount_Name(val);
            setCheck_accountNameInputChange(false);
            setIsValidAccount_Name(false)
        }
    }

    const phoneInputChange = (val) => {
        if (val.trim().length >= 10 && numreg.test(val) === true) {
            //dispatch(setPhoneTrue(val));
            dispatch(setPhoneTrue(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')))
        } else {
            //dispatch(setPhoneFalse(val));
            dispatch(setPhoneFalse(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')))
        }
    };


    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            dispatch(setPasswordrTrue(val));
        } else {
            dispatch(setPasswordrFalse(val));
        }
    }

    const handleAccountNameChange = (val) => {
        if (val.trim().length > 0) {
            setIsValidAccount_Name(true)
        } else {
            setIsValidAccount_Name(false)
        }
    }

    const handleValidEmail = (val) => {
        if (reg.test(val) === true) {
            dispatch(setIsVallidEmailTrue())
        } else {
            dispatch(setIsVallidEmailFalse())
        }
    }

    const handleValidPhone = (val) => {
        if (val.trim().length >= 10 && numreg.test(val) === true) {
            dispatch(setIsVallidPhoneTrue())
        } else {
            dispatch(setIsVallidPhoneFalse())
        }
    }
    const handleValidName = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setIsVallidNameTrue());
        } else {
            dispatch(setIsVallidNameFalse());
        }
    };
    const handleValidLastName = (val) => {
        if (val.trim().length !== 0 && namereg.test(val) === true) {
            dispatch(setIsVallidLastNameTrue());
        } else {
            dispatch(setIsVallidLastNameFalse());
        }
    };


    const updateSecureTextEntry = () => {
        dispatch(setPasswordrVisible())
    }



    const onTapAuth = () => {
        onUserSignUp(
            RegisterReducer.data.email,
            RegisterReducer.data.phone_number,
            RegisterReducer.data.password,
            RegisterReducer.data.first_name,
            RegisterReducer.data.last_name,
            account_name
        )
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={constantColors.default}
                    barStyle={theme.dark ? 'light-content' : 'dark-content'}
                />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>
                <Animatable.View
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                    animation="fadeInUpBig"
                >
                    <Text style={[styles.text_footer, {
                        marginTop: 10,
                        color: colors.text
                    }]}>FirstName</Text>
                    <View style={styles.action}>
                        <Icon1 name="user-o" color={colors.text} size={20} />
                        <Input
                            value={RegisterReducer.data.first_name}
                            secureTextEntry={false}
                            placeholder='Your FirstName'
                            autoCapitalize='none'
                            onChangeText={(val) => nameInputChange(val)}
                            keyboardType='default'
                            onEndEditing={(e) => handleValidName(e.nativeEvent.text)} />
                        {RegisterReducer.data.check_textInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green' size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    {RegisterReducer.data.isValidName ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Firstname can't be empty and Only letters</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 10,
                        color: colors.text
                    }]}>LastName</Text>
                    <View style={styles.action}>
                        <Icon1 name="user-o" color={colors.text} size={20} />
                        <Input
                            value={RegisterReducer.data.last_name}
                            secureTextEntry={false}
                            placeholder='Your LastName'
                            autoCapitalize='none'
                            onChangeText={(val) => lastNameInputChange(val)}
                            keyboardType='default'
                            onEndEditing={(e) => handleValidLastName(e.nativeEvent.text)} />
                        {RegisterReducer.data.check_lastNameInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green' size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    {RegisterReducer.data.isValidLastName ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Lastname can't be empty and Only letters</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 10,
                        color: colors.text
                    }]}>Email</Text>
                    <View style={styles.action}>
                        <Icon1 name="user-o" color={colors.text} size={20} />
                        <Input
                            value={RegisterReducer.data.email}
                            secureTextEntry={false}
                            placeholder='Your Email'
                            autoCapitalize='none'
                            onChangeText={(val) => emailInputChange(val)}
                            keyboardType='email-address'
                            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} />
                        {RegisterReducer.data.check_emailInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green' size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    {RegisterReducer.data.isValidEmail ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Email is not valid</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 10,
                        color: colors.text
                    }]}>Bank Account Name</Text>
                    <View style={styles.action}>
                        <Icon1 name="user-o" color={colors.text} size={20} />
                        <Input
                            value={account_name}
                            secureTextEntry={false}
                            placeholder='Your Account Name'
                            autoCapitalize='none'
                            onChangeText={(val) => accountNameInputChange(val)}
                            keyboardType='default'
                            onEndEditing={(e) => handleAccountNameChange(e.nativeEvent.text)} />
                        {check_accountNameInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green' size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    {isValidAccount_Name ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Bank Account Name is not valid</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10,
                        color: colors.text
                    }]}>Phone</Text>
                    <View style={styles.action}>
                        <Icon2 name="phone" color={colors.text} size={20} />
                        <Input
                            value={RegisterReducer.data.phone_number}
                            secureTextEntry={false}
                            placeholder='Your Phone'
                            autoCapitalize='none'
                            onChangeText={(val) => phoneInputChange(val)}
                            keyboardType='numeric'
                            onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)} />
                        {RegisterReducer.data.check_phoneInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green' size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    {RegisterReducer.data.isValidPhone ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Phone is Not Valid and Number Only</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 10,
                        color: colors.text
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Icon2 name="lock" color={colors.text} size={20} />
                        <Input
                            value={RegisterReducer.data.password}
                            placeholder='Your Password'
                            autoCapitalize='none'
                            secureTextEntry={RegisterReducer.data.secureTextEntry ? true : false}
                            onChangeText={(val) => handlePasswordChange(val)} />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {RegisterReducer.data.secureTextEntry ?
                                <Icon2 name="eye-off" color='grey' size={20} />
                                :
                                <Icon2 name="eye" color='grey' size={20} />
                            }
                        </TouchableOpacity>
                    </View>
                    {RegisterReducer.data.isValidPassword ? null :
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters or more</Text>
                        </Animatable.View>
                    }


                    <View style={styles.button}>
                        <TitleButtons title={"Register"} onTap={onTapAuth} width={350} height={45} />

                        <TouchableOpacity
                            style={[styles.signIn, {
                                borderColor: constantColors.default,
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={[styles.textSign, {
                                color: constantColors.default
                            }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </ScrollView>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    UserReducer: state.UserReducer
})

const Register2 = connect(mapToStateProps, { onUserSignUp })(_Register2)

export default Register2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantColors.default
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        marginTop: 30,
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
        fontSize: 18,
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
        marginTop: 20
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
    },
    containerOTP: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    action_image: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    imgPicker: {
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
