import React from "react";
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Image,
    TouchableHighlight
} from "react-native";
import { AppLoading, Font } from "expo";
import { NavigationEvents, StackNavigator } from "react-navigation";
import { Card } from "react-native-elements";

export default class AthleteProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            athl_id: this.props.navigation.getParam("athl_id"),
            athl_fname:"",
            athl_lname:"",
            athl_gender:"",
            athl_height:"",
            athl_weight:"",
            athl_dob: "",
            athl_addr:"",            
            athl_email: "",
            athl_phone: "",
            account: "",
            password: "",
            city: "",
            country:"",
            profile_photo_url: ""
        };
        // this.registerVar = this.registerVar.bind(this);
        console.log(this.state.athl_id, "-----------------------athlete id in constructor athlete profile")
    }

    static navigationOptions = ( {navigation} ) => {
        const {params = {}} =navigation.state;
      return{
        gesturesEnabled: false,
        headerTitle: (
            <TouchableOpacity style={{alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}
                onPress={() => {
                    navigation.navigate("Card", {athl_id:  params.athl_id})
                    console.log(params.athl_id, "card params.athl_id in athlete profile");
                }}
            >
                <View>
                    <Image
                        style={{
                            justifyContent: "center",
                            height: 40,
                            width: 40,
                            resizeMode: "contain"
                        }}
                        source={require("../Icons/heart_inactive.png")}
                    />
                </View>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity>
                <View>
                    <Image
                        style={{
                            justifyContent: "center",
                            height: 30,
                            width: 30
                        }}
                        source={require("../Icons/profile_active.png")}
                    />
                </View>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("AthlClubList", {athl_id: params.athl_id});
                    console.log(params.athl_id, "header left params.athl_id in athlete profile")
                }}
            >
                <View>
                    <Image
                        style={{
                            justifyContent: "center",
                            height: 30,
                            width: 30
                        }}
                        source={require("../Icons/list_inactive.png")}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

    // registerVar() {
    //     const { navigation } = this.props
    //     const new_id = navigation.getParam('athl_id','none')
    //     console.log(new_id);
    
    //     this.setState({
    //       athl_id: new_id
    //     })
    //     console.log('id set to ' + this.state.athl_id + 'in athlete profile');
    //   }

    getData() {
        console.log(this.state.athl_id, "----------------inside getdata athlete profile")
        return fetch("http://54.191.100.200:8080/api/athletes/" + this.state.athl_id)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ data: responseJson });
        })
        .catch(error => {
            console.error(error);
        });
    }

    // getData2(){
    //     console.log(this.state.athl_id, "------inside getdata2 athlete profile")
    //     return fetch("http://54.191.100.200:8080/api/profiles/athlete"+ this.state.athl_id)
    //     .then(response => response.json())
    //     .then(responseJson => {
    //         this.setState({ data2: responseJson });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // }

    componentDidMount() {
        this.getData();
        
        this.props.navigation.setParams({
            athl_id: this.state.athl_id
            })

        this.setState({
            athl_fname: this.state.athl_fname,
            athl_lname: this.state.athl_lname,
            athl_gender: this.state.athl_gender,
            athl_height: this.state.athl_height,
            athl_weight: this.state.athl_weight,
            athl_dob: this.state.athl_dob,
            athl_addr: this.state.athl_addr,            
            athl_email: this.state.athl_email,
            athl_phone:  this.state.athl_phone,
            account:  this.state.account,
            password: this.state.password,
            city: this.state.city,
            country: this.state.country,
        })        
    }

    onPressEvent() {
        Alert.alert(
            "Sign Out ",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("MainApp")
                }
            ],
            { cancelable: false }
        );
    }

    render() {
        console.log(this.state.data, "-----------data in render athlete profile")
        console.log(this.state.data2, "-----------data2 in render athlete profile")

        if (this.state.data.length == 0) {
            return <View></View>;
        }
        // console.log(this.state.data[0]);
        // console.log(this.state.data2[0]);
        // console.log(
        //     "The profile_photo Url is --> ",
        //     this.state.data2[0].profile_photo
        // );
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Card containerStyle={styles.playerphotoCard}>
                        <Image
                            source={require("../assets/stockMgr.jpg")}
                            style={styles.playerphoto}
                        />
                    </Card>
                    <Card containerStyle={styles.cardStyle1}>
                        <View style={{ marginTop: 70 }}><Text style={{fontSize: 15, fontWeight: "bold", textAlign: "center", color: "#3AD289"}}>Welcome</Text><Text style={{textAlign: "center", color: "black", fontSize: 25, fontWeight: "bold"}}>{this.state.data[0].athl_fname}{" "}{this.state.data[0].athl_lname}</Text></View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle={styles.cardStyle2}>
                        <View style={styles.row}><Text style={{fontSize: 15, fontWeight: "bold", bottom: 5}}>Contact Information</Text><TouchableOpacity onPress={() => this.props.navigation.navigate("AthleteContactDetails", {
                            athl_id : this.state.data[0].athl_id,
                            athl_fname: this.state.data[0].athl_fname,
                            athl_lname: this.state.data[0].athl_lname,
                            athl_gender: this.state.data[0].athl_gender,
                            athl_height: this.state.data[0].athl_height,
                            athl_weight: this.state.data[0].athl_weight,
                            athl_dob: this.state.data[0].athl_dob,
                            athl_addr: this.state.data[0].athl_addr,
                            athl_email: this.state.data[0].athl_email, 
                            athl_phone: this.state.data[0].athl_phone,
                            account: this.state.data[0].account,
                            password: this.state.data[0].password,
                            city: this.state.data[0].city,
                            country: this.state.data[0].country
                            })}>
                        <Image style={styles.editIconStyle} source={require("../assets/editIcon.png")}/></TouchableOpacity></View>
                        <View><Text style={{fontSize: 12,fontWeight: "bold",paddingTop: 5}}>Email</Text><Text style={{ fontSize: 12, color: "grey" }}>{this.state.data[0].athl_email}</Text><Text style={{fontSize: 12,fontWeight: "bold",paddingTop: 5}}>Phone Number</Text><Text style={{ fontSize: 12, color: "grey" }}>{this.state.data[0].athl_phone}</Text></View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle={styles.cardStyle3}>
                        <View style={styles.row}><Text style={{fontSize: 15,fontWeight: "bold",bottom: 5}}>Personal Information</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("AthletePersonalInfoEdit", {
                                    athl_id : this.state.data[0].athl_id,
                                    athl_fname: this.state.data[0].athl_fname,
                                    athl_lname: this.state.data[0].athl_lname,
                                    athl_gender: this.state.data[0].athl_gender,
                                    athl_height: this.state.data[0].athl_height,
                                    athl_weight: this.state.data[0].athl_weight,
                                    athl_dob: this.state.data[0].athl_dob,
                                    athl_addr: this.state.data[0].athl_addr,
                                    athl_email: this.state.data[0].athl_email, 
                                    athl_phone: this.state.data[0].athl_phone,
                                    account: this.state.data[0].account,
                                    password: this.state.data[0].password,
                                    city: this.state.data[0].city,
                                    country: this.state.data[0].country
                                    })}>
                                <Image
                                    style={styles.editIconStyle}
                                    source={require("../assets/editIcon.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <View><Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>First Name</Text><Text style={{ fontSize: 12, color: "grey" }}>{this.state.data[0].athl_fname}</Text><Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Last Name</Text><Text style={{ fontSize: 12, color: "grey" }}>{this.state.data[0].athl_lname}</Text><Text style={{ fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Account Name</Text><Text style={{ fontSize: 12, color: "grey" }}>{this.state.data[0].account}</Text><Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Password</Text><Text style={{ fontSize: 12, color: "grey" }}>{this.state.data[0].password}</Text></View>
                    </Card>
                </View>
                <TouchableHighlight style={styles.signOutButton} onPress={() => this.onPressEvent()}><Text style={styles.btnText}>Sign Out</Text></TouchableHighlight>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    playerphotoCard: {
        borderRadius: 150 / 2,
        width: 150,
        height: 150,
        marginTop: 10,
        position: "absolute",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
        backgroundColor: "#3AD289"
    },
    playerphoto: {
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 150 / 2,
        width: 150,
        height: 150,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },

    cardStyle1: {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 70,
        width: "95%",
        height: 175,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5
    },
    cardStyle2: {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 10,
        width: "95%",
        height: 150,
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5
    },
    cardStyle3: {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 10,
        width: "95%",
        height: 250,
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10
    },
    editIconStyle: {
        width: 15,
        height: 15,
        bottom: 5,
        top: 2
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgrey",
        bottom: 10
    },

    btnText: {
        fontSize: 24,
        opacity: 1,
        color: "#fff"
    },
    signOutButton: {
        alignSelf: "center",
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "45%",
        padding: 14,
        alignItems: "center",
        bottom: "10%",
        alignItems: "center",
        marginTop: 80,
        marginBottom: 28,
        borderRadius: 2
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        alignItems: "center"
    }
});
