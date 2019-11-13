import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';

import CardFlip from 'react-native-card-flip';

export default class AthlClubList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchedList:[{
                "athl_id": 1,
                "club_id": 1,
                "club_name": "Liverpool",
                "country": "England",
                "offer_amount": "1000000",
                "offer_desc": "Goal Keeper for 6 years",
                "offer_photo": "test",
                "offer_position": "GK",
                "offer_title": "Goal Keeper Contract",
              },
              {
                "athl_id": 1,
                "club_id": 2,
                "club_name": "Manchester",
                "country": "England",
                "offer_amount": "1000000",
                "offer_desc": "Goal Keeper for 6 years",
                "offer_photo": "test",
                "offer_position": "GK",
                "offer_title": "Goal Keeper Contract",
              },
              {
                "athl_id": 1,
                "club_id": 3,
                "club_name": "Arsenal",
                "country": "England",
                "offer_amount": "1000000",
                "offer_desc": "Goal Keeper for 6 years",
                "offer_photo": "test",
                "offer_position": "GK",
                "offer_title": "Goal Keeper Contract",
              }],
            loading: true
        };
    }

    // async componentDidMount(){
    //     try {
    //         var athl_id = 1;
    //         const getList = await fetch('http://54.191.100.200:8080/api/matched/athlete/1');

    //         const clubList = await getList.json()
    //         console.log(clubList,"Get list 1111111111111111");
    //         //console.log(clubList.results, "Get List 2")
    //         this.setState({matchedList : clubList, loading: false});
    //         // console.log(this.matchedList);
    //         //console.log(matchedList)  
            
    //   } catch(error) {
    //         console.log("Error fetching data", error);
    //     };
    //   }

    render(){
    const { matchedList } = this.state;
    console.log(matchedList, "in render")
    return matchedList.map((item, id) => {
          return (
              <CardFlip style={ styles.cardContainer } ref={ (card) => this['card' + id] = card } >
                <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()} ><Image source ={require('../assets/manu.jpg')} style={styles.imageViewStyle}></Image></TouchableOpacity>
                <TouchableOpacity key={item} style={ styles.card } onPress={() => this['card' + id].flip()} >
                  <Text style = {styles.TextStyle}>Club Name: {item.club_name}</Text>
                  <Text style = {styles.TextStyle}>Location: {item.country}</Text>
                  <Text style = {styles.TextStyle}>Position: {item.offer_position}</Text>
                  <Text style = {styles.TextStyle}>Salary: {item.offer_amount}</Text>
                </TouchableOpacity>
              </CardFlip>
          )
        })
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
  card: {
    width: "100%",
    height: 220,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: "#E2F0E4",
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

    width: '96%',
    height: 200,
    borderRadius:6,
    backgroundColor: "#3AD289"
    
    },

    TextStyle:{
      color:'black',
      textAlign:'center',
      padding: 5,
      fontSize: 18,
      fontWeight: "bold"
  },
});