import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ImagePickerIOS,
  Alert,
  ScrollView
} from 'react-native';

import CardFlip from 'react-native-card-flip';
import {athlImagePicker} from "../utils/imagePicker";
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

export default class AthlClubList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mgr_id: this.props.navigation.getParam("mgr_id"),
          club_id: this.props.navigation.getParam("club_id"),
            matchedList:[],
            loading: true,
            showMe: true
        };
    }

    static navigationOptions = ({ navigation }) => {
      const {params = {}} = navigation.state;
      return{
      gesturesEnabled: false,
      headerTitle: (
          <TouchableOpacity style={{alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}
              onPress={() => {
                  navigation.navigate("CardForMgr",{mgr_id: params.mgr_id});
                  console.log(params.mgr_id, "----------params.mgr_id in club matches going to club cards")
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
                  navigation.navigate("ClubMgrProfile", {mgr_id: params.mgr_id});
                  console.log(params.mgr_id, "----------params.mgr_id in club matches going to manager profile")
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

  getData(){
    return fetch('http://54.191.100.200:8080/api/matched/club/' + this.state.club_id)
      .then(response => response.json())
        .then(responseJson => {
            this.setState({ matchedList: responseJson, loading: false });
        })
        .catch(error => {
            console.error(error);
        });
    }

  componentDidMount(){
    this.getData();
    console.log(this.state.mgr_id, "--------------inside componentdidmount using getData")
    console.log('data loaded');

      this.props.navigation.setParams({
          mgr_id: this.state.mgr_id,
          club_id: this.state.club_id
      })

      console.log(this.state.mgr_id, "-----------------in club matches")
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
        'Error ',
        'Failed To Get Data From The API',
        [
          {
          },
          {text: 'OK', onPress: () => this.props.navigation.navigate('ClubMgrProfile', {mgr_id: this.state.mgr_id, club_id: this.state.club_id})},
          console.log(this.props.navigation.athl_id,'---------------------------', this.props.navigation.club_id)
        ],
        {cancelable: false},
      );
    }

    render(){
    const { matchedList, loading} = this.state;
    console.log(matchedList, "in render")
    if(!loading){
      return(
      <ScrollView>{
        matchedList.map((item, id) => {
            return (
                <CardFlip style={ styles.cardContainer } ref={ (card) => this['card' + id] = card } >
                  <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()} >
                    <Image source ={athlImagePicker(matchedList)[id].url} style={styles.playerphotoCard}></Image>
                    <Text style = {styles.TextStyle}>{item.athl_fname} {item.athl_lname}</Text>  
                  </TouchableOpacity>
                  <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()} >
                    <Text style = {styles.TextStyle}>Date of Birth: {item.athl_dob}</Text>
                    <Text style = {styles.TextStyle}>Gender: {item.athl_gender}</Text>
                    <Text style = {styles.TextStyle}>Position: {item.position}</Text>
                    <Text style = {styles.TextStyle}>Country: {item.country}</Text>
                  </TouchableOpacity>
                </CardFlip>
            )
          })
          }
      </ScrollView>
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
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: "94%",
    height: 200,
    left: 10,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50

  },
  playerphotoCard: {
    borderRadius: 175/2,
    borderWidth: 3,
    borderColor: "#3AD289",
    width: 175,
    height: 175,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor:'#3AD289'
  },
  card: {
    width: "100%",
    height: 220,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },

  // imageViewStyle: {

  //   width: '100%',
  //   height: '100%',
  //   borderRadius:6,
  //   backgroundColor: "#3AD289"
    
  //   },

    TextStyle:{
      color:'black',
      textAlign:'center',
      padding: 5,
      fontSize: 18,
      fontWeight: "bold"
  },
  
});