import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors as constantColors } from '../../../constant'


interface TitleButtonsProps{
    onTap: Function;
    title: string;
    width: number;
    height: number;
    isNoBg?: boolean;
    disable?: boolean;
}

const TitleButtons: React.FC<TitleButtonsProps> = ({ onTap, title, height, width, isNoBg = false, disable = false }) => {
    if(!isNoBg) {
        return (
            <TouchableOpacity disabled={disable} style={[styles.btn, {width, height, backgroundColor: disable ? constantColors.disable :constantColors.default,}]} onPress={() => onTap()}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
            </TouchableOpacity>
        )
    } else {
        
        return (
            <TouchableOpacity disabled={disable} style={[styles.btn, {width, height, backgroundColor: 'transparant'}]} onPress={() => onTap()}>
                <Text style={{fontWeight: 'bold', color: disable ? constantColors.disable :constantColors.default, fontSize: 18}}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

export default TitleButtons

const styles = StyleSheet.create({
    btn:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height:30,
        marginTop: 15,
        borderRadius: 10,
        alignSelf: 'center'
    }
})
