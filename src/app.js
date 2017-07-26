import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import Header from './components/common/header'
import Button from './components/common/button'
import Spinner from './components/common/spinner'
import LoginForm from './components/loginForm';

class App extends Component {

    state = { loggedIn: null };

    //https://console.firebase.google.com/
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCb18PIZGb_8Y4LdZoPh5jxH6FDScPYq8o",
            authDomain: "auth-ce1c0.firebaseapp.com",
            databaseURL: "https://auth-ce1c0.firebaseio.com",
            projectId: "auth-ce1c0",
            storageBucket: "auth-ce1c0.appspot.com",
            messagingSenderId: "424107298836"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => firebase.auth.signOut()}>
                        Log Out
                    </Button>
                );
            case false:
                return <LoginForm />
            default:
                return <Spinner size="large" />
        }
    }

    render() {
        return (
            <View>
                <Header headerText={"Authentication"} />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;