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
            showMe: true,
            disabledBtn: true,
        };
        this.getData = this.getData.bind(this);
        console.disableYellowBox= true;
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
                      source={require("../Icons/list_active_mgr.png")}
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
            console.log(this.state.matchedList)
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
        'Woops',
        'Doesn\'t look like you matched with anyone yet.',
        [
          {
          },
          {text: 'OK', onPress: () => this.props.navigation.navigate('CardForMgr', {mgr_id: this.state.mgr_id, club_id: this.state.club_id})},
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

      <View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.refreshButton} onPress={this.getData}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        
      <ScrollView>{
       
        matchedList.map((item, id) => { contentContainerStyle={paddingBottom:20}
            
            return (
              
                <CardFlip style={ styles.cardContainer } ref={ (card) => this['card' + id] = card } >
                  <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()} >
                    <Image source ={athlImagePicker(matchedList)[id].url} style={styles.playerphotoCard}></Image>
                    <Text style = {styles.TextStyle}>{item.athl_fname} {item.athl_lname}</Text>  
                  </TouchableOpacity>
                  <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()} >
                    <Text style = {styles.TextStyle}>Height: {item.athl_height}Lbs  Weight: {item.athl_weight}Lbs</Text>
                    <Text style = {styles.TextStyle}>Gender: {item.athl_gender}</Text>
                    <Text style = {styles.TextStyle}>Email: {item.athl_email}</Text>
                    <Text style = {styles.TextStyle}>Position: {item.position}</Text>
                    <Text style = {styles.TextStyle}>Country: {item.country}</Text>
                  </TouchableOpacity>
                </CardFlip>
            )
          })
          }
      </ScrollView></View>
      </View>
      )}else {
      return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center"}}>
        {
          this.state.showMe ?
          <Bubbles size={10} color="#6ED2F2"/>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    flex: 1,
    width: "94%",
    height: 200,
    left: 10,
    // top:55,
    marginTop: 55,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 25,

  },
  playerphotoCard: {
    borderRadius: 150/2,
    borderWidth: 3,
    borderColor: "#6ED2F2",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor:'#6ED2F2'
  },
  card: {
    flex:1,
    width: "100%",
    height: "100%",
    top: 5,
    bottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  refreshButton:{
    flex:1,
    zIndex: 1,
    position: "absolute",
    top: 0,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6ED2F2",
    width: "50%",
    padding: 14,
    borderRadius: 2,
    paddingBottom: 10
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
  TextStyle:{
    color:'black',
    textAlign:'center',
    padding: 5,
    fontSize: 18,
    fontWeight: "bold"
  },
  
});