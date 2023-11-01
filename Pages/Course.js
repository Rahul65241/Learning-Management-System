import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Course({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const [images, setImages] = useState([
        require('../img/2.jpg'),
        require('../img/13.jpg'),
        require('../img/1.jpg'),
    ])



    return (
        <>
            <LinearGradient
                colors={['#2E2B69', 'orange', 'red', '#2A12CC']}
                style={styles.linearGradient}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MaterialCommunityIcons name="menu" onPress={() => navigation.navigate('RegularAccount')} size={30} color="white" style={{ marginTop: width * 0.14, marginLeft: 10 }} />
                    </View>


                    <View style={{backgroundColor:'blue', width:'90%', alignSelf:'center', marginTop:20, borderRadius:7}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: width * 0.05, marginTop: width * 0.06 }}>Party Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', marginLeft: width * 0.05, marginTop: width * 0.09, fontWeight: '800' }}>Daniel Ancuta</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                    <Text style={{ color: 'white', marginLeft: width * 0.05, fontWeight: '800' }}>Venue Name</Text>
                                </View>
                                <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                    <Text style={{ color: 'white', marginRight: width * 0.15, fontWeight: '800', textAlign: 'right' }}>Attendees: 225</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                    <Text style={{
                                        textAlign: 'left',
                                        color: 'white',
                                        fontSize: 12,
                                        left: width * 0.05, marginTop: width * 0.01,
                                        fontFamily: 'Poppins_400Regular',
                                    }}>Street Name 01</Text>
                                </View>
                                <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'white',
                                        fontSize: 12,
                                        marginTop: width * 0.01,
                                        fontFamily: 'Poppins_400Regular',
                                        marginRight: width * 0.15,
                                        marginBottom:20
                                    }}>March 1, 2023</Text>
                                </View>
                            </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                    <Text style={{
                                        textAlign: 'left',
                                        color: 'white',
                                        fontSize: 11,
                                        left: width * 0.05,
                                        fontFamily: 'Poppins_400Regular',
                                    }}>Additional location info</Text>
                                </View>
                                <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'white',
                                        fontSize: 11,
                                        fontFamily: 'Poppins_400Regular',
                                        marginRight: width * 0.15
                                    }}>6:00pm</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'red' }}>
                        Courses Gallary
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            data={images} renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: width * 0.9, marginLeft: 15, height: height / 3.5, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                        <Image source={item}
                                            key={index}
                                            style={{
                                                width: '98%',
                                                height: '100%',
                                                position: 'absolute', top: 5,
                                                borderRadius: 10,
                                            }} />
                                    </View>
                                )
                            }}>
                        </FlatList>
                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Overview</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Course Name:
                    </Text>
                    <Text style={{color:'white',marginTop: 21,}}> New</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Course Name:
                    </Text>
                    <Text style={{color:'white',marginTop: 21,}}> New</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Course Name:
                    </Text>
                    <Text style={{color:'white',marginTop: 21,}}> New</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Course Name:
                    </Text>
                    <Text style={{color:'white',marginTop: 21,}}> New</Text>
                    </View>


                </ScrollView>
            </LinearGradient >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        backgroundColor: "#F6F6F6",
        height: 50,
        borderRadius: 8,
        marginTop: 25,
        alignSelf: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "black",
    },
    title: {
        fontWeight: 'bold',
        fontSize: width * 0.05,
        color: 'violet',
        marginTop: 25,
        textAlign: 'center',
    }

});
