import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function Dashboard({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [coursedata, setCoursedata] = useState('');

    const [images, setImages] = useState([
        require('../img/2.jpg'),
        require('../img/13.jpg'),
        require('../img/1.jpg'),
    ])


    useEffect(() => {
        onCourseList();
    }, [])

    const onCourseList = async () => {
        try {
            const { data } = await axios({
                method: 'get',
                url: 'https://lmsystem-5cdb1-default-rtdb.firebaseio.com/.json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            console.log(data);
            setCoursedata(data)
            //alert(data.message)

        } catch (err) {
            console.log("195", err);
            if (err.response.status === 404) {
                console.log('Resource could not be found!');
            }

        }
    }



    return (
        <>
            <LinearGradient
                colors={['#2E2B69', 'orange', 'red', '#2A12CC']}
                style={styles.linearGradient}>
                <ScrollView>
                   
                    <Text style={[styles.title,{marginTop:80}]}>WELCOME Rahul!</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'red' }}>
                        Enrolled Courses
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Available Courses</Text>

                            {coursedata ==undefined || coursedata == null || coursedata ==''? '' :
                    (coursedata?.map(function (course) {
                        return (
                            <View key={course.id}>
                                <TouchableOpacity onPress={() => navigation.navigate('Course', { 'courseid': course.id })} >
                                    <ImageBackground
                                        source={require('../img/12.jpg')}
                                        style={{ width: width * 0.9, height: height * 0.6, marginTop: 20, marginLeft: 15, marginBottom: 20 }}
                                    >
                                        <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'blue', height: height * 0.11, width: width * 0.9, alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>{course?.name}</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>{course?.description.slice(0, 18)}...</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>CLICK TO KNOW MORE...</Text>

                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        )
                    }))
                }

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
