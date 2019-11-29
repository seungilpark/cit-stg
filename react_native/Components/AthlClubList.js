import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';

import CardFlip from 'react-native-card-flip';
import { clubImagePicker } from '../utils/imagePicker';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

export default class AthlClubList extends React.Component {
  

    constructor(props) {
        super(props);
        this.state = {
          athl_id: this.props.navigation.getParam("athl_id"),
          matchedList:[],
            loading: true,
            showMe: true
        };
        this.getData = this.getData.bind(this);
        console.disableYellowBox=true;
        console.log(this.state.athl_id, "-----------------------athlete id in constructor athlete club list")
    }


    static navigationOptions = ( {navigation} ) => {
      const {params = {}} =navigation.state;
      return{
      gesturesEnabled: false,
      headerStyle:{ borderBottomWidth: 0},
      headerTitle: (
          <TouchableOpacity style={{alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}
              onPress={() => {
                  navigation.navigate("Card", {athl_id: params.athl_id})
                  console.log(params.athl_id, "card params.athl_id in athlete club list");
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
          <TouchableOpacity
              onPress={() => {
                  navigation.navigate("AthleteProfile", {athl_id: params.athl_id})
                  console.log(params.athl_id, "athlete profile params.athl_id in athlete club list");
              }}
          >
              <View>
                  <Image
                      style={{
                          justifyContent: "center",
                          height: 30,
                          width: 30
                      }}
                      source={require("../Icons/profile_inactive.png")}
                  />
              </View>
          </TouchableOpacity>
      ),
      headerLeft: (
          <TouchableOpacity>
              <View>
                  <Image
                      style={{
                          justifyContent: "center",
                          height: 30,
                          width: 30
                      }}
                      source={require("../Icons/list_active.png")}
                  />
              </View>
          </TouchableOpacity>
      )
  }
}

    // RegisterVar(){
    //   const { navigation } = this.props
    //   const new_id = navigation.getParam('mgr_id', 'none')

    //   this.setState({
    //     athl_id: new_id
    //   })
    //   console.log('id set to ' + this.state.athl_id + 'in athlete club list');
    // }
    async getData() {
        try{
          var data = await fetch('http://54.191.100.200:8080/api/matched/athlete/' + this.state.athl_id)
          .then(response => response.json())
          .catch(error => {
            console.error(error);
        });
        console.log("This is the data from getdata fetch statement----------------------------------",data)
        this.setState({
          matchedList: data,
          loading: false
        })

      }catch(err){
        console.log(err)
      }
    }

    async componentDidMount(){
      try{
        await this.getData();
        this.props.navigation.setParams({
          athl_id: this.state.athl_id
         })

      }catch(err){
        console.log(err)
      }
    }

    componentWillMount() {
      setTimeout(() => {
        this.setState({
          showMe: false,
        });
      }, 3000);
    }

    onTimeOutEvent(){
      Alert.alert(
        'Woops',
        'Doesn\'t look like you matched with anyone yet.',
        [
          {
          },
          {text: 'OK', onPress: () => this.props.navigation.navigate('Card', {athl_id: this.state.athl_id})},
        ],
        {cancelable: false},
      );
    }

    render(){
    const { matchedList, loading } = this.state;
    console.log(matchedList, "in render")
    if(!loading){
      return (
        <View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.refreshButton} onPress={this.getData}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        
        <ScrollView>{
          matchedList.map((item, id) => { contentContainerStyle={paddingBottom:20}
            return (
                <CardFlip style={ styles.cardContainer } ref={ (card) => this['card' + id] = card }>
                  <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()}><Image source ={clubImagePicker(this.state.matchedList)[id].url} style={styles.imageViewStyle}></Image></TouchableOpacity>
                  <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()}>
                    <Text style = {styles.textStyle}>Club Name: {item.club_name}</Text>
                    <Text style = {styles.textStyle}>Location: {item.country}</Text>
                    <Text style = {styles.textStyle}>Position: {item.offer_position}</Text>
                    <Text style = {styles.textStyle}>Salary: {item.offer_amount}</Text>
                  </TouchableOpacity>
                </CardFlip>
            )
          })
          }</ScrollView></View>
          </View>
      )}else {
        return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center"}}>
          {
            this.state.showMe ?
            <Bubbles size={10} color="#3AD289"/>
            :
            <View style={this.onTimeOutEvent()}>
              
            </View>
          }
          
        </View>
        )}
    }
  }

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    flex:1,
    width: "94%",
    height: 200,
    // top: 57,
    marginTop: 58,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },
  card: {
    flex:1,
    width: "100%",
    height: "100%",
    top: 5,
    bottom:5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection:'column',
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5
  },

  imageViewStyle: {

    width: '100%',
    height: 200,
    borderRadius:6,
    backgroundColor: "#3AD289"
    
    },

    textStyle:{
      color: "black",
      textAlign:'center',
      padding: 5,
      fontSize: 18,
      fontWeight: "bold"
  },
  refreshButton:{
    flex:1,
    zIndex: 1,
    position: "absolute",
    top: 0,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3AD289",
    width: "50%",
    padding: 14,
    borderRadius: 2
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 24,
    opacity: 1,
    color: "#fff",
  },

});