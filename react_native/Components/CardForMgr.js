import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, Linking, Alert, Platform, TouchableOpacity } from 'react-native'
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
        club_id : 1,
        cards: [],
      swipedAllCards: false,
      swipeDirection: '',
      url:''
    }
    this.getData = this.getData.bind(this);
    this.callNumber = this.callNumber.bind(this);
    this.displayImage = this.displayImage.bind(this);
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
        new_arr = responseJson
        this.setState({cards : athlImagePicker(new_arr)});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(){
      this.getData();
      console.log('data loaded');
  }

  displayImage(card){
      this.setState({
          url: card.url
      })
  }


  renderCard = (card) => {
    if (card === undefined){

    }else{
        displayingImage = this.displayImage(card);
      return (
        <View  style={styles.card}>
          <Image
            style={{width: 270, height: 270, resizeMode: 'contain', backgroundColor: 'transparent'}}
            source={require("../assets/athl/f1.jpg")}
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
    
    // console.log(card);
  };

  onSwiped = (index) => {
    console.log("Manager swiped")
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  // swipeLeft = () => {
  //   this.swiper.swipeLeft()
  // };

  render () {
    //   console.log(this.state.cards[0])
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          backgroundColor={'#3ad289'}
          useViewOverflow={Platform.OS === 'ios'}
          onSwipedLeft={(event) => this.onSwiped()}
          onSwipedRight={(event) => this.onSwiped()}
          cards={this.state.cards}
          cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          infinite = {true}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD0E9'
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
    fontSize: 18.5,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})