import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,StatusBar, Image} from 'react-native'
import { LocationLogo } from '../../assets' 
import * as Location from 'expo-location'
import { useTheme } from '@react-navigation/native'
import { colors as constantColors } from '../../constant'
import { StackNavigationProp } from '@react-navigation/stack'


import { connect } from 'react-redux'
import { onUpdateLocation, UserState, ApplicationState } from '../../redux'
import { useNavigation } from '@react-navigation/core'

interface SplashProps{
    UserReducer: UserState,
    onUpdateLocation:Function
}

const _SplashMainRoots: React.FC<SplashProps> = (props) => {
    const navigation = useNavigation<StackNavigationProp<{HomeAll}>>();
    var locationIcon = 'iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAALiMAAC4jAXilP3YAAABdUExURdzc3LMCAv///+gbG9cQEMEFBZ8AAJQAAAgICCUMDAUDAwICAuro6NTPz4QAANbW1vf19cS9vcNHR9GQkKmpqZGQkK88PMwNDc8ODsJjY8oLC+IXF7gDA9LS0kdwTJkmueYAAAAfdFJOU///////////VgkaNP///8j//yf/////UIP/rNLWagCIvPrXAAAN3UlEQVR42u3diWKbOBAG4MHmqGywOTbYOInf/zGXwxjJSEJgdATPNNvddt20+fqPRsIX3LHeKkACBERABERALAREQAREQCwEREAEREAsBERABERALAREQAREQCwEREAEREAsBERABERALAREQAREQCwEREAEREAsBERABERALAREQAREQATEQkAEREAExEJABERABMRCQAREQATEQkAEREAEtFkkzy+Xa1eXS54TgoCq1cjdvr/3bflBWz8/t8aRIOAkXm23p+oB+GCsFXMElOkxeCPADtEtQ2cACUePB9gZEgR8Dd9tzy0eYGPoTAydAMy54ZMB1oTXHAH79An5JICuEFoHJDI+KWDTyOTjAfPbfr8YMAhu+WcDTsRvGrDuY/LBgFPxUwC0HkKbgJPxUwKsV8IPBbzu96sABoHNNrYGmCv5qQHabGNwd/mbARj85B8GmH/vVwW0Jwhu+ykDWhsl4LafOqAtQXDbbwagpS4Gt/3mANoRNA9IbntNgFZ2M+YBr3ttgMGNbB/wstcIGFw3D3j51gpofhQbBiQz/eYCmh8k4OgC6O/Lqqgrq/+pqjLwXF0GwcUF0C+LDNLdUClkRempIV42DKi0A6z1EhrviZjUhu41MTjWwDVfvBNVrELoXTcLOB1AKV8bQwVC77JRQHKdnLiVnK9LYSgn9Dyjc8Qg4NQECcpsp1JJGcoBjUYQnAmgpxC/RwiryJMCmowgOBJA36vSnWqlhUTQMxtBc4BXuV+xm1MSQc9sBI0BSkewH/L80hiSJIGYF83iFEoAveP2AK/z/FIoqtIL26oPdeOttVCwBbxuDlAWQD98Xf/qHXP4qKitcLxBLE6e0M8zdxwB+yPED8v4dbccsn5NvRLGlUzwsjVASQd7YfK6z6MqogjZfSKUvEnS+ZkbI2C9gwN2AUyLUOBXNzLb6tkpEgIa62Gw3cF1AzMXrqpQDBhFzGY7rTiD5AForIfBcgf7bAPHL34jQWa5hGi0DPZ+3m1TgOIr+UFYSfI38nsRHO9lnoCmetgMYC5uYCaAIz+OIL0OjiP4BDTVw2B3CWQDWCj4RRE9c6qXOTL4mdpLg9UlsA5gRu9LlADpzCYnNoIU4G1DgMIlMGBGMKeBuYJUE6clE0HKz/sh2wEU7gJDeg+YKPpFdGoLJoIMYL4hQGEA6XbkBpArSMUWTtQg9pi6bAfwIjzEUZsSUPajV0GmhzcLeBV2cCUdwSLAqKLn8LOHWT9DY9gmoM8sgWWoLkj1cDH08AvgbTuAN1EHU+Mg9mYkMErojUzE9TN0QcYuoDdAZOGMBFKb6TgSAf5sBlC0Dax54oklUJRACrB8LILexwHWSyA1hKtZgBU9hltAbwyYfwBgOgUoEBx+YQMY8vw2BCg4iAQqgNEU4O4DAMkbgKEaoIeASxPYtHDkfSzgOkNEALj1fWC9c/YmtzGTZ7n4EwCvogSGkxvpSGEjLQDc0FFODEgd5eYkMGSOcgLADV1MuAgBC2otWzaECyHghi5n8TeCDeAql7NOIRfwuB1A/hj2Q2YfAzNamLmgKgDc0iV9/iLYANLXlqsllwMhEgFu6V45wSLohdN3KnEF2TuVTieLM8TUIxO+RYBUmLgRnAhgc5ATzJDjlgD5T/MP2B7mr4KTd6wLAA3dLWz10VntIvjeQzvaDg4tdrCxB1j6oh4OQfbgrFD6uIT2GCJYAjf2+EBy831BDzMPbysnBV8e3ma7g809Rtr3x4RtD7MPsCyn/IB9gKXtDjb4NAefQ9j2MPPA59FDVCV+7SlE0MGbe5rD/eb7Y8IuguyDzCuJH/t8xOwkDKC553oZA7z4PoewjSAbq10mfJpDwTxIv7kSaHuEGAQkN98fG7Zj5PWJSnHhcfzCl6fDppU4gAZfN8Ec4MVnio4gM4m5T/Wq0wejp3qdbB/jjAL2Y+TFsFsFOU82TIqy7PzCsiwyzpMNnQigyaf8X31eeQLBJoeQZFnGf75r1u5grF7MNw44jmBboVhQXA8/fgP/HLcJKIhg0AumM56wfpI0sNEAGn7dGKmg8otOpL0fv4E3+7oxd8KPYL8MhmWi5Ael3M/sy48Zfu0suaBXxArxi+R+ZgNoFlAUwadgWGbylTDN+vgJBojpABp++TtRBAdBKSHNJ8qfd7xvGFAYQUowrA8d3Je/g2LgE/vd7lsGFEfwOYvbtbAsEmb3nMb1wSQa+AT7F8OHEBuAd2EE/YB9noPXvARofQ7JsqKoGLw6fkI/z/jL+JoGFEeQaeMnIys30b4WAmjhdaTFgK8hbC/GjPnE8bMQQPOAzHXBacJoDp+FAFp4KXhZBMeE0Qw+03toS4CSOcIxjNT1jO+hLQES2RwZDD0GMJrWqxvYxluy2HhDlquvVu0z4NpZrFbX+4cAyufIKIqq9THvaDM5RxYCfs57Kqk38RzAG/kgQJU5MhPQ1hvL2QEkl9UBr/dPAlSfI4HjAbQGqNrEioD23iLX2ru7XlcFtNXAFgEVmzhwu4FtvkHz5Xs9QIvvcW3zHa5XA7TXwFYBlZo4cLuBbb9J/TqAn/om9UpNHLjdwJYBFZo4cLuBLQMqnIkDtxvYNuD0mThwu4FtA0438RTg7fDZgJNNHLh6BnYFcPpeTqcb2AHAib1M4OJVaLcA89tiQMs7GEcA5QeSwOEdjCuAE483cnkBdARQtpcJHN7BOAMo28sETi+ArgBKmjhwegF0BlC8lxECXgkC0nWbCehIA7sDKFoGA1ePcK4BipbBwOkF0CVAgWDg9ALoFCB/N8gFvOV3BFRcBgOXB4hjgNxDceD0AugYIG8ZDBw9ArsJyHkyZ+DiNUBnATmDJHB6ATQOeJ6s/RRgMf058o0Ckvvv+EnUr1VMABbMrfkvsXAmd7LJBObx+LWJXisupIDVy83T+nOMCn63CFin4jwdwFEGA6lfE8HxXwKcCTEWQoOAv+l0AGuStBICljAi5/8t/DaCmwKsv6BxA+94AYx38V4AGCRjrZT/15Aby6C5BJ53Sh1ciyR7PmDB+SUx/9M0TbyhN2huAjhuYG4AG8C04AK2r63FuT337+HXVATB0AAhoBZA6F4hhgNYJTFv2RT0cJIbiqCpBP5C92XG7QfEghHS/o8UkmoEWCb8XyToYTgfzAgaeVu0egJzGjXmVoeUlC+AQdanUzGCbROTrQCSMyicIOjdTbZnAYueHZQjaGYSg5EFkBNAUQLjtMtTxgAWIAPkjyMzTQwmAphzF7qJKijAanCPlXvYzCQGCw0sHiFjwaAbwLJfJ+rhRxP/dUAybmBQCSB0ozjoBrAUfieL4J9PILnnCWcFnAhg0nw0gkE3gNsfi6iEEUwMCIL2/I0aGMankKT79lr1KK4Bi+ePIa2ruV17c6CCmfL/Qs7k8PcT+AvCFfDp9mKXNR/Nt6IGLB7/Xf9k0szo4Wbw+BCPEQNNrD2BOS+AdWBGoWtea/FZ/zUf9bciqLr/6H66yVyvBwl1CayNYDx8i9t/6u+1bwZB7/rHaeB415z/WT0K7j+qvuqPr6/mX4/KHnYAD6A0TvtqPu1u97hk8bxyoX0zCJoD+DsaDs3XGQ96z+A97b4aNV7V/6dJYW/IEjJ+VOneDGpOYH7mjcx0WPd6v2m+lvDR3l0/d+tg/3nh2bbsHSSaN4OgNX9sANt1qw8gvCSwF/yaSmB7u77lk4yaJ91UevxOpk50WgGbizDx8xLWcIqLh93LqJGFOXwugq94zyCO8QxMYtCZv8dlfHZhaleqdKj4eVWh+3of85et9mfq77ob9P074CUcODMnOtA6QSbeV4B2bCBbyj6N9K7mEbgsaZ3HeNQiwTmo/B40ZhA0BjCHWFzUXi3uO7wdqOMDCVXNLeL+JCJ3M3Qvp84WPsPcajI5rGXdqOmx2n91M3wYSZN22psY9AXwd7bfcJ0wGV9cUL+SaPREpw1wfBFGJYBTPLHw7lD5xR19gqAtgPMbWOE6V7xTuhZr8PI+6InfkgZWulC4ELBrYvJnEsi7CKO2BKoALlgEQduJDjQFcIGf0gKXLgXU1cR6WnhRAyuN2MWAuu6j05PAJQ2shrN0imh7tAxomcCLAqgZUFMT6wC8L/NTmrBvAOrZToOG/C2aIIo28eIxrOlEB65MENVwLZ8iei7LwPoBzOENQKU+3y38HXRcltHQwueFX12qRJO+sQjqaGJwZAIrHzLeAtQwR9YGXHIRZtZ4iN8CbE90xF1AsryBVWXeGcM6NoOwavzeaGBDgKuf6GDdAOaLA6i8uL01htc/0cG6AVzupziE350iqzfxqi38RgOrX+nbvQm4chOvmsA3Glh9bXs3gStvBmHNCfxOAOcBpu/8Tqs28YqA93f81Pd3747hlbfT4MYEmdGZ8duL4KpNDCtOkPNb1X5lCpWc4ax2S3GtGMEVAQ+Hw7Guf25X80fMDwf3Wpj0gv/cFzwcDs4lcPA7Oh9AFwFJ18LuCx6HBBI3E3h01vD47/HHOziawD6Crtehb2Hi4BD5A4KHw5odvOY2pid0tY7tx8p+q55EyMFtwQPFt9oFmVUvJhC3Y0iaD9L7uXlB9c/U/U6cA/w7gs7eJ9Ii3t16kVjen83R+0RGf1r171Q/gYMFdywEREAEREAsBERABERALAREQAREQCwEREAEREAsBERABERALAREQAREQCwEREAEREAsBERABERALAREQAREQCwEREAEREAsBERABERABMRCQAREQATEWlL/A5MfNpXt8FxiAAAAAElFTkSuQmCC'

    const {UserReducer, onUpdateLocation } = props
    
    const [errorMsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>()

    const [displayAddress, setDisplayAddress] = useState("Waiting for Location");

    const { colors } = useTheme();
    const theme = useTheme();


    useEffect ( () => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted'){
                setErrorMsg('Permision to access location is not granted')
            }

            let location: any = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest });

            const { coords } = location
            
            if(coords) {
                const { latitude, longitude } = coords;

                let addressResponse: any = await Location.reverseGeocodeAsync({latitude, longitude})

                for(let item of addressResponse){
                    setAddress(item)
                    onUpdateLocation(item)
                    let currentAddress = `${item.name},${item.street}, ${item.postalCode}, ${item.country}`
                    setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout( ()=> {
                            navigation.replace('HomeAll')
                        }, 2000)
                    }

                    return;
                }
            } else {
                //notify
            }
        })();

    }, [navigation])

    

    return (
        <View style={styles.background}>
            <StatusBar 
                    barStyle= { theme.dark ? "light-content" : "dark-content" } 
                    backgroundColor={constantColors.default} 
                />
            <Image source={{uri: `data:image/png;base64,${locationIcon}`}} style={styles.logo} />
            <View style={styles.textContainer}>
                <Text style={{color: colors.text, fontSize:14, textAlign: 'center'}}> {displayAddress} </Text>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 200,
        height: 200,
    },
    
    textContainer: {
        alignContent: 'center',
        justifyContent: 'center'
    }
})

const mapToStateProps =( state: ApplicationState ) => ({
    UserReducer : state.UserReducer
}) 

const SplashMainRoots = connect(mapToStateProps, { onUpdateLocation })(_SplashMainRoots)

export default SplashMainRoots