import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, TouchableHighlight, StyleSheet, Text, View, Image, Linking, Alert, Platform, TouchableOpacity } from 'react-native'
import {athlImagePicker} from "../utils/imagePicker"


// demo purposes only
// function * range (start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i
//   }
// }

export default class CardForMgr extends Component {
  constructor (props) {
    
    super(props)
    this.state = {
        mgr_id: this.props.navigation.getParam("mgr_id"),
        club_id : this.props.navigation.getParam("club_id"),
        cards: [],
        emptyRec: false,
      swipedAllCards: false,
      swipeDirection: '',
      url:''
    }
    this.getData = this.getData.bind(this);
    this.callNumber = this.callNumber.bind(this);
    // this.displayImage = this.displayImage.bind(this);
    this.onSwiped = this.onSwiped.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return{
    gesturesEnabled: false,
    headerTitle: (
        <TouchableOpacity style={{alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}>
            <View>
                <Image
                    style={{
                        justifyContent: "center",
                        height: 40,
                        width: 40,
                        resizeMode: "contain",
                    }}
                    source={require("../Icons/heart_active_mgr.png")}
                />
            </View>
        </TouchableOpacity>
    ),
    headerRight: (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("ClubMgrProfile", {mgr_id: params.mgr_id, club_id: params.club_id});
                console.log(params.mgr_id, "----------------mgr_id in cards going to club manager profile ")
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
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("ClubMatches", {mgr_id: params.mgr_id, club_id: params.club_id});
                console.log(params.mgr_id, "----------------mgr_id in cards going to club matches")
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




  // https://stackoverflow.com/questions/51545064/how-to-make-phone-call-in-react-native
  callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
    }
    else  {
    phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
    if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
    }
    })
    .catch(err => console.log(err));
    };

  getData() {
    return fetch('http://54.191.100.200:8080/api/recommendations/club/' + this.state.club_id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Respones JSON in getData---------",responseJson)
        if(Object.entries(responseJson).length != 0){
          new_arr = responseJson
          console.log(new_arr)
          this.setState({cards : athlImagePicker(new_arr)});
        }else{
          this.setState({
            emptyRec: true
          })
      }})
      .catch((error) => {
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

      console.log(this.state.mgr_id, "-----------------in cards")
  }

  // displayImage(card){
  //     this.setState({
  //         url: card.url
  //     })
  // }

  onSwiped = (event, direction) => {
    if(direction === "left"){
      fetch(
        "http://54.191.100.200:8080/api/clubLikes/dislike/",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              athl_id: this.state.cards[event].athl_id,
              club_id: this.state.club_id
            })
        },
        // console.log(body)
      );
      
    }else{
      fetch(
        "http://54.191.100.200:8080/api/clubLikes/like/",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              athl_id: this.state.cards[event].athl_id,
              club_id: this.state.club_id
            })
        },
        console.log('success')
      );
    }
  }


  renderCard = (card) => {
    if(card != undefined){
      return (
        <View  style={styles.card}>
          <Image
            style={{width: 270, height: 270, resizeMode: 'contain', backgroundColor: 'transparent'}}
            source={card.url}
          />
          <Text></Text>

      <Text style={{textAlign: 'center', fontSize: 30,backgroundColor: 'transparent'}}>{card.athl_fname} {card.athl_lname}</Text>
      <Text style={{textAlign: 'center', fontSize: 25,backgroundColor: 'transparent'}}>Position: {card.position}</Text>
          <Text></Text>
      <Text style={styles.text}>Height: {card.athl_height}  Weight: {card.athl_weight}</Text>
      <Text style={styles.text}>Coached by {card.coaches}</Text>
        <Text></Text>
          {/* Linking.openURL(`tel:${phoneNumber}`) */}
          <TouchableOpacity onPress = {this.callNumber}>
            <Text style={styles.text}>{card.athl_phone}</Text>
          </TouchableOpacity>
          
          <Button onPress={() => Linking.openURL('mailto:' + card.athl_email) }
            title = {card.athl_email} />
          
                    
        </View>
      )
    }
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  // swipeLeft = () => {
  //   this.swiper.swipeLeft()
  // };

  render () {
    if (this.state.emptyRec === true){

    }else{
      return (
        <View style={styles.container}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper
            }}
            backgroundColor={'#3ad289'}
            useViewOverflow={Platform.OS === 'ios'}
            onSwipedLeft={(event) => this.onSwiped(event, "left")}
            onSwipedRight={(event) => this.onSwiped(event, "right")}
            cards={this.state.cards}
            cardVerticalMargin={80}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            stackSize={3}
            stackSeparation={15}
            overlayLabels={{
              left: {
                title: 'PASS',
                style: {
                  label: {
                    backgroundColor: '#FA4E3B',
                    borderColor: '#FA4E3B',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: '#3AD289',
                    borderColor: '#3AD289',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30
                  }
                }
              },
            }}
            infinite = {true}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          >
          </Swiper>
          <TouchableHighlight
          style={styles.button}
          onPress={() => this.swiper.swipeBack()}
          >
          <Text style={styles.btnText}> Swipe Back </Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  },
  button: {
    opacity: 0.7,
    backgroundColor: "#6ED2F2",
    width: "57%",
    padding: 13,
    marginLeft: "21%",
    marginTop: 545,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
},
btnText: {
  fontSize: 24,
  opacity: 1,
  color: "#fff",
},
})