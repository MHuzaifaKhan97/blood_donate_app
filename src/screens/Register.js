import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Left } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Register extends Component {

    state = {
        isPasswordShown: false,
        name: '',
        email: '',
        contactNo: '',
        password: '',
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
    createUser = () => {
        const { name, email, password, contactNo } = this.state;
        let id = database().ref("users").push().key;

        if (name == "") {
            Alert.alert('Error', 'Please Enter Your Name',);
        } else if (email == "") {
            Alert.alert('Error', 'Please Enter Your Email',);
        } else if (contactNo == "") {
            Alert.alert('Error', 'Please Enter Your Contact Number',);
        } else if (password == "") {
            Alert.alert('Error', 'Please Enter Your Password',);
        }
        else {
            if (password.length <= 8) {
                Alert.alert('Error', 'Weak Password');
            }
            else if (contactNo.length != 11) {
                Alert.alert('Error', 'Invalid Contact Number');
            }
            else {
                auth().createUserWithEmailAndPassword(email, password)
                    .then((response) => {
                        database().ref(`users/${id}`).set({
                            id: id,
                            name: name,
                            email: email,
                            password: password,
                            contactNo: contactNo,
                            photoURL: '',
                        });
                        Alert.alert('Success', 'Successfully User Created.');
                        this.props.navigation.navigate('Dashboard');
                    }).catch((error) => {
                        Alert.alert('Error', error.message);
                    })
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    contactNo: '',
                })
            }
        }

        // database()
        //     .ref('/users/123')
        //     .once('value')
        //     .then(snapshot => {
        //         console.log('User data: ', snapshot.val());
        //     });
    }


    render() {
        const { isPasswordShown, name, email, password, contactNo } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#f73b3b" />
                <View style={styles.header}>
                    <Body style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon onPress={() => { this.props.navigation.pop() }} name="arrow-left" style={{ color: "#fff", marginLeft: 20 }} type="FontAwesome5" />
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Image style={styles.logo} source={require('../assets/blood.png')} />
                            <Title style={styles.headerTitle}>DONATE</Title>
                        </View>

                    </Body>
                </View>
                <View style={styles.body}>
                    <View style={styles.signUpBody}>
                        <Text style={styles.bodyTitle}>DONATE - REGISTER</Text>

                        <Item floatingLabel style={{ marginTop: 15 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Name</Label>
                            <Input value={name} maxLength={25} onChangeText={(text) => this.setState({ name: text })} />
                        </Item>

                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Email</Label>
                            <Input value={email} maxLength={30} keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Contact No</Label>
                            <Input value={contactNo} maxLength={11} keyboardType="numeric" onChangeText={(text) => this.setState({ contactNo: text })} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Password...</Label>
                            <Input value={password} maxLength={25} 
                            onChangeText={(text) => this.setState({ password: text })} 
                            secureTextEntry={!isPasswordShown} 
                            />
                            <Icon active solid={true} name={isPasswordShown ? "eye-slash" : "eye"} type='FontAwesome5' style={{ color: '#f73b3b', fontSize: 16 }} onPress={this.showHidePassword} />
                        </Item>

                        <TouchableOpacity style={{
                            backgroundColor: '#f73b3b',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 40,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                        }}
                            onPress={this.createUser}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="user" color='white' size={15} style={{ marginTop: 3 }} />
                                <Text style={{ marginLeft: 8, color: 'white', fontSize: 15, fontWeight: '700' }}>
                                    REGISTER
                                    </Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        )
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
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
        marginLeft: 10,
        paddingBottom: 20,
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
    signUpBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 60,
        fontWeight: '700',
        fontSize: 28,
        alignItems: 'center',
        color: '#f73b3b',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },

})