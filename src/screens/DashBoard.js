import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Spinner } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

class Dashboard extends Component {
    state = {
        authUser: {},
    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            this.setState({ authUser: user })
            if (!user) {
                this.props.navigation.navigate('Login');
            }
        })
    }
    onlogOut = () => auth().signOut();
    render() {
        const {authUser} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" />
                <View style={styles.header}>
                    <Body style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Image style={styles.logo} source={require('../assets/blood.png')} />
                        <Title style={styles.headerTitle}>DONATE</Title>
                    </Body>
                </View>
                {/* <View style={{ alignItems: 'center' }}>
                    <Text style={styles.userTitle}>Welcome</Text>
                    <Text style={styles.userTitle}>{ authUser ? authUser.email :'demo'}</Text>
                </View> */}
                <View style={styles.body}>
                    <View style={styles.loginBody}>
                        <Text style={styles.bodyTitle}>DONATE - DASHBOARD</Text>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.optionsButton}>
                            <Icon type="FontAwesome5" name="user" style={{ fontSize: 16, color: '#f73b3b', fontWeight: 'bold' }} />
                            <Text style={styles.optionsButtonText}>PROFILE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DonorList')} style={styles.optionsButton}>
                            <Icon type="FontAwesome5" name="list" style={{ fontSize: 16, color: '#f73b3b', fontWeight: 'bold' }} />
                            <Text style={styles.optionsButtonText}>DONOR LIST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddDonor')} style={styles.optionsButton}>
                            <Icon type="FontAwesome5" name="tint" style={{ fontSize: 16, color: '#f73b3b', fontWeight: 'bold' }} />
                            <Text style={styles.optionsButtonText}>BECOME A DONOR </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onlogOut} style={styles.optionsButton}>
                            <Icon type="FontAwesome5" name="sign-out-alt" style={{ fontSize: 16, color: '#f73b3b', fontWeight: 'bold' }} />
                            <Text style={styles.optionsButtonText}>SIGN OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )

    }
}
export default Dashboard;

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
        width: 50,
        height: 60
    },
    loginBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 40,
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