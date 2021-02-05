import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 3000);
    }
    render() {
        return (
            <React.Fragment>
                <StatusBar backgroundColor="#fff" />
                <View style={styles.container}>
                   
                    <View style={styles.topSide}>
                        <Image
                            source={require('../assets/blood.png')}
                            style={{ width: 80, height: 100 }}
                        />
                        <Text style={styles.title}>
                            DONATE
                    </Text>
                    </View>
               

                </View>
                <View style={styles.developedBy}>
                    <Text style={styles.developedByText}>Developed By Huzaifa Nadir</Text>
                </View>
            </React.Fragment>
        );
    }
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        alignItems: 'center',
        flexDirection: 'row',
        // marginHorizontal: 40,
        justifyContent: 'center',
        backgroundColor:'#f73b3b'
    },
    topSide:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        borderBottomLeftRadius:120,
        borderBottomRightRadius:120,
    },
    title: {
        fontWeight: '700',
        fontSize: 45,
        alignItems: 'center',
        color: '#f73b3b',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },
    developedBy: {
        flex:0.3,
        alignItems: 'center',
        backgroundColor: '#f73b3b',

    },
    developedByText: {
        fontSize: 18,
        color: '#fff',
        justifyContent:'center',
        marginTop:50,
        fontWeight: '700',
        marginBottom: 60
    }
});