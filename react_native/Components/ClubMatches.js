import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ImagePickerIOS,
  Alert
} from 'react-native';

import CardFlip from 'react-native-card-flip';
import {athlImagePicker} from "../utils/imagePicker";
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

export default class AthlClubList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchedList:[],
            loading: true,
            showMe: true
        };
        this.RegisterVar = this.RegisterVar.bind(this);
    }
    RegisterVar(){
      const { navigation } = this.props
      const athl_id = navigation.getParam('mgr_id', 'none')
    }
    async componentDidMount(){
        try {
            var athl_id = 1;
            const getList = await fetch('http://54.191.100.200:8080/api/matched/club/' + athl_id);
            const clubMatches = await getList.json()
            
            console.log(clubMatches,"Get list 1111111111111111");
            //console.log(clubList.results, "Get List 2")
            this.setState({matchedList : clubMatches, loading: false});
            
            // console.log(this.matchedList);
            //console.log(matchedList)
      } catch(error) {
            console.log("Error fetching data", error);
        };
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
          {text: 'OK', onPress: () => this.props.navigation.navigate('ClubMgrProfile')},
        ],
        {cancelable: false},
      );
    }

    render(){
    const { matchedList, loading} = this.state;
    console.log(matchedList, "in render")
    if(!loading){
      return matchedList.map((item, id) => {
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
    }else {
      return(
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: "94%",
    height: 200,
    flex: 1,
    left: 10,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10

  },
  playerphotoCard: {
    borderRadius: 175/2,
    borderWidth: 3,
    borderColor: "white",
    width: 175,
    height: 175,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowOffset:{  width: 0,  height: 12,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 11,
    elevation: 3,
    backgroundColor:'#3AD289'
  },
  card: {
    width: "100%",
    height: 220,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: "black",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5
  },

  // imageViewStyle: {

  //   width: '100%',
  //   height: '100%',
  //   borderRadius:6,
  //   backgroundColor: "#3AD289"
    
  //   },

    TextStyle:{
      color:'white',
      textAlign:'center',
      padding: 5,
      fontSize: 18,
      fontWeight: "bold"
  },
  
});