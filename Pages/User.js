import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function User({ navigation }) {
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

                    <Text style={[styles.title, { marginTop: 80 }]}>WELCOME Rahul!</Text>

                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Enrolled Courses</Text>

                    {coursedata == undefined || coursedata == null || coursedata == '' ? '' :
                        (coursedata?.map(function (course) {
                            return (
                                <>
                                    {course?.enrolled == true ?
                                        <View key={course.id}>
                                            <TouchableOpacity onPress={() => navigation.navigate('UserCourse', { 'courseid': course.id })} >
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
                                        </View > : ''}
                                </>
                            )
                        }))
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ backgroundColor: 'orange', justifyContent:'center', marginBottom: 20, width: '90%', height: 50, borderRadius: 6, alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', padding: 5 }}>VIEW ALL AVAILABLE COURSES</Text>
                    </TouchableOpacity>


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
