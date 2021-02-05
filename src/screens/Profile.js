import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Spinner } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Profile extends Component {

    state = {
        isPasswordShown: false,
        name: 'Huzaifa Nadir',
        email: 'huzaifa@gmail.com',
        contactNo: '03122282334',
        password: '12345678',
        address: '',
        loggedInUser: {},
        authUser: {},
        isDataLoaded: false,
    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            this.setState({ authUser: user })
            if (user) {
                database().ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                            this.setState({
                                loggedInUser: data.val()[key]
                            })
                        }
                    }
                })
            }
        })
        setTimeout(() => {
            this.setState({ isDataLoaded: true });
        }, 1000);
    }

    showHidePassword = () => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown
        });
        console.log('Clicked');
    }
    updateProfile = () => {

    }
    render() {
        const { isPasswordShown, name, email, password, contactNo, loggedInUser, isDataLoaded } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" />
                <View style={styles.header}>
                    <Body style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Image style={styles.logo} source={require('../assets/blood.png')} />
                        <Title style={styles.headerTitle}>DONATE</Title>
                    </Body>
                </View>

                <View style={styles.body}>

                    {
                        isDataLoaded ?
                            <View style={styles.loginBody}>
                                <View>
                                    <Image
                                        source={require('../assets/profile.png')}
                                        style={{ width: 100, height: 100, marginTop: 13, borderRadius: 100, borderWidth: 3, borderColor: 'white' }}
                                    ></Image>
                                </View>

                                <Item regular style={{ marginTop: 20, borderRadius: 10, borderColor: '#f73b3b', borderWidth: 2 }}>
                                    <Input style={{ color: 'red', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser.name} maxLength={30} onChangeText={(text) => this.setState({ name: text })} />
                                </Item>
                                <Item regular style={{ marginTop: 15, borderColor: '#f73b3b', borderWidth: 2, }}>
                                    <Input disabled={true} style={{ color: 'red', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser.email} keyboardType="email-address" maxLength={35} onChangeText={(text) => this.setState({ email: text })} />
                                </Item>
                                <Item regular style={{ marginTop: 0, borderColor: '#f73b3b', borderWidth: 2, }}>
                                    <Input style={{ color: 'red', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser.contactNo} keyboardType="numeric" maxLength={50} onChangeText={(text) => this.setState({ contactNo: text })} />
                                </Item>

                                <Item regular style={{ marginTop: 10, borderColor: '#f73b3b', borderWidth: 2, }}>
                                    <Input style={{ color: 'red', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser.address} maxLength={50} onChangeText={(text) => this.setState({ password: text })}  />
                                </Item>

                                <TouchableOpacity style={{
                                    backgroundColor: '#fff',
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 40,
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    borderRadius: 10,
                                }}
                                    onPress={this.updateProfile}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <MyIcon name="edit" color='#f73b3b' size={15} style={{ marginTop: 3 }} />
                                        <Text style={{ marginLeft: 8, color: '#f73b3b', fontSize: 15, fontWeight: '700' }}>
                                            UPDATE PROFILE
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Spinner color="#fff" />
                            </View>
                    }

                </View>
            </View>
        )

    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        display: 'flex',
        backgroundColor: '#fff',
        flex: 0.15,
        marginTop:20,
    },
    body: {
        flex: 0.80,
        display: 'flex',
        backgroundColor: '#f73b3b',
        alignItems: 'center',
        borderTopStartRadius: 45,
        borderTopEndRadius: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 38,
        marginTop: 5,
        paddingBottom: 10,
        marginLeft: 10,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700',
        color: '#f73b3b',
    },
    logo: {
        width: 80,
        height: 80,
    },
    loginBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 60,
        fontWeight: '700',
        fontSize: 25,
        alignItems: 'center',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },

    optionsButton: {
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 30,
        padding: 15,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    optionsButtonText: {
        fontWeight: '700',
        color: '#f73b3b',
        fontSize: 18,
        marginLeft: 10,
    },
    userTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        // paddingBottom: 10,
        // marginLeft: 10,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(227, 89, 79, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700',
        color: '#f73b3b',
    }

})