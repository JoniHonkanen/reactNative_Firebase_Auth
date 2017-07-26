import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = (props) => {
    console.log(props);
    return (
        <View style={styles.containerStyle} >
            <Text style={styles.labelStyle}>{props.label}</Text>
            <TextInput
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                autoCorrect={false}
                style={styles.inputStyle}
                value={props.value}
                onChangeText={props.onChangeText}
                underlineColorAndroid={'transparent'}
                style={{ height: 35, flex: 1 }}
            />
        </View >
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export default Input;