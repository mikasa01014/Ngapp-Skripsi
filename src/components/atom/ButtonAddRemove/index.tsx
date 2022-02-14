import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors as constantColors } from '../../../constant'
import { useTheme } from '@react-navigation/native'

interface ButtonProps{
    onAdd: Function;
    unit: number;
    onRemove: Function;
}

const ButtonAddRemove: React.FC<ButtonProps> = ({ onAdd, unit, onRemove }) => {
    const { colors } = useTheme();


    if(unit > 0) {
        return (
            <View style={styles.optionView}>
                <TouchableOpacity style={[styles.btnPlusMinus, {backgroundColor:colors.background}]} onPress={() => onRemove()}>
                    <Text style={styles.buttonTextAddRemove}> - </Text>
                </TouchableOpacity>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                }}>
                    <Text style={{
                        color:constantColors.default,
                        fontSize: 20, 
                        fontWeight: '700',
                        textAlign: 'center',
                    }}>{unit}</Text>
                </View>
                <TouchableOpacity style={[styles.btnPlusMinus, {backgroundColor:colors.background}]} onPress={() => onAdd()}>
                    <Text style={styles.buttonTextAddRemove}> + </Text>
                </TouchableOpacity>
            </View> 
        )    
    } else {
        return (
            <TouchableOpacity style={styles.button} onPress={() => onAdd()}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        )
    }
}

export default ButtonAddRemove

const styles = StyleSheet.create({
    button:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: constantColors.default
    },
    buttonTextAddRemove:{
        fontSize: 17, 
        color: constantColors.default,
    },
    buttonText:{
        fontSize: 17, 
        color: 'white',
    },
    optionView:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnPlusMinus:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: constantColors.default,
        height: 58,
        width:38
    }
})
