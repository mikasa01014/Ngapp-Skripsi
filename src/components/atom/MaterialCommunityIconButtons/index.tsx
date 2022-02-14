import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IconButtonsProps{
    onTap: Function;
    icon: string;
    color: string
}

const IconButtons: React.FC<IconButtonsProps> = ({ onTap, icon, color }) => {

    return (
        <TouchableOpacity style={styles.btn} onPress={() => onTap()}>
            <Icon name={icon} size={45} color={color}/>
        </TouchableOpacity>
    )
}

export default IconButtons

const styles = StyleSheet.create({
    btn:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height:30,
    }
})
