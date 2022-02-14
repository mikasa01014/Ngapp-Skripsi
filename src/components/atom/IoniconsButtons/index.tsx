import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface IonIconsButtonsProps{
    onTap: Function;
    icon: string;
    color: string
}

const IonIconsButtons: React.FC<IonIconsButtonsProps> = ({ onTap, icon, color }) => {

    return (
        <TouchableOpacity style={styles.btn} onPress={() => onTap()}>
            <Icon name={icon} size={35} color={color}/>
        </TouchableOpacity>
    )
}

export default IonIconsButtons

const styles = StyleSheet.create({
    btn:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height:30,
    }
})
