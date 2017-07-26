import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import Input from './common/input';
import Button from './common/button';
import Card from './common/card';
import CardSection from './common/cardSection';
import Spinner from './common/spinner';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        console.log('painettu');
        const { email, password } = this.state;
        console.log('email: ', email);
        console.log('password: ', password);

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch((err) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {
        console.log('onnistui kirjautuminen');
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    onLoginFail() {
        console.log("ei onnistunut");
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button onPressButton={this.onButtonPress.bind(this)}>
                Log in
             </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        value={this.state.email}
                        label="email"
                        onChangeText={writtenText => this.setState({ email: writtenText })}
                        placeholder="user@gmail.com"
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="password"
                        value={this.state.password}
                        onChangeText={writtenPassword => this.setState({ password: writtenPassword })}
                        placeholder="password"
                        secureTextEntry={true}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card >
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;