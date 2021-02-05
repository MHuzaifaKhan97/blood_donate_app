import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Spinner } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

class Login extends Component {

    state = {
        isPasswordShown: false,
        email: '',
        password: '',
        showSpinner: false,
        socialLoggedIn: false,
        userInfo: [],
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Dashboard');
            }
        })
    }

    showHidePassword = () => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown
        });
        console.log('Clicked');
    }
    loggedIn = () => {

        const { email, password } = this.state;
        if (email == "") {
            Alert.alert('Error', 'Please Enter Your Email',);
        } else if (password == "") {
            Alert.alert('Error', 'Please Enter Your Password',);
        }
        else {
            if (password.length <= 8) {
                Alert.alert('Error', 'Weak Password');
            }
            else {
                auth().signInWithEmailAndPassword(email, password)
                    .then((response) => {
                        this.setState({
                            showSpinner: true,
                        })
                        setTimeout(() => {
                            this.props.navigation.navigate('Dashboard');
                            this.setState({
                                showSpinner: false,
                                email: null,
                                password: null,
                            })
                        }, 2500);
                        return <View><Spinner color='blue' /></View>
                    }).catch((error) => {
                        this.setState({
                            showSpinner: false,
                        })
                        Alert.alert('Error', error.message);
                    })
            }
        }
    }
    signInWithFacebook = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Facebook Signin Available Soon",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
    }
    signInWithGoogle = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Google Signin Available Soon",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
    }

    render() {
        const { isPasswordShown, email, password, showSpinner } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#f73b3b" />
                <View style={styles.header}>
                    <Body style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Image style={styles.logo} source={require('../assets/blood.png')} />
                        <Title style={styles.headerTitle}>DONATE</Title>
                    </Body>
                </View>
                <View style={styles.body}>
                    <View style={styles.loginBody}>
                        <Text style={styles.bodyTitle}>DONATE - LOGIN</Text>
                        <Item floatingLabel style={{ marginTop: 20 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Email</Label>
                            <Input value={email} maxLength={30} keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Password...</Label>
                            <Input value={password} maxLength={25} onChangeText={(text) => this.setState({ password: text })} secureTextEntry={!isPasswordShown} />
                            <Icon active solid={true} name={isPasswordShown ? "eye-slash" : "eye"} type='FontAwesome5' style={{ color: '#f73b3b', fontSize: 16 }} onPress={this.showHidePassword} />
                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 4, alignItems: 'flex-end' }}>
                                <Spinner color="#f73b3b" style={{ display: showSpinner ? 'flex' : 'none' }} />
                            </View>
                            <View style={{ flex: 3, alignItems: 'flex-end', margin: 5, marginRight: 10 }}>
                                <Text style={{ color: '#f73b3b', fontWeight: '700' }}>
                                    Forgot Password?
                            </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: '#f73b3b',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 10,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                        }}
                            onPress={this.loggedIn}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="sign-in" color='white' size={15} style={{ marginTop: 3 }} />
                                <Text style={{ marginLeft: 8, color: 'white', fontSize: 15, fontWeight: '700' }}>
                                    SIGNIN
                                    </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 10,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderColor: '#f73b3b',
                            borderWidth: 2,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                        }}
                            onPress={() => console.log(this.props.navigation.navigate('Register'))}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="user" color='#f73b3b' size={15} style={{ marginTop: 3 }} />
                                <Text style={{ marginLeft: 8, color: '#f73b3b', fontSize: 15, fontWeight: '700' }}>
                                    REGISTER
                                    </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderColor: '#f73b3b',
                            borderWidth: 1,
                            marginTop: 10,
                            width: '100%',
                        }}
                        />

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <TouchableOpacity style={{
                                backgroundColor: '#1877f2',
                                width: '48%',
                                alignItems: 'center',
                                marginTop: 10,
                                paddingTop: 15,
                                paddingBottom: 15,
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                borderBottomRightRadius: 30,
                                borderBottomLeftRadius: 30,
                            }}
                                onPress={this.signInWithFacebook}

                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <MyIcon name="facebook" color='white' size={15} style={{ marginTop: 3 }} />
                                    <Text style={{ marginLeft: 8, color: 'white', fontSize: 15, fontWeight: '700' }}>
                                        FACEBOOK
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: '#f73b3b',
                                width: '48%',
                                alignItems: 'center',
                                marginTop: 10,
                                paddingTop: 15,
                                paddingBottom: 15,
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                borderBottomRightRadius: 30,
                                borderBottomLeftRadius: 30,
                            }}
                                onPress={this.signInWithGoogle}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <MyIcon name="google" color='white' size={15} style={{ marginTop: 3 }} />
                                    <Text style={{ marginLeft: 5, color: 'white', fontSize: 15, fontWeight: '700' }}>
                                        GOOGLE
                            </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
    },
    header: {
        display: 'flex',
        // flexDirection: 'row',
        backgroundColor: '#f73b3b',
        flex: 0.15,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    body: {
        flex: 0.85,
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 38,
        marginTop: 5,
        paddingBottom: 20,
        marginLeft: 10,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700'
    },
    logo: {
        width: 50,
        height: 60,
        marginBottom: 20,
    },
    loginBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 60,
        fontWeight: '700',
        fontSize: 35,
        alignItems: 'center',
        color: '#f73b3b',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },
})