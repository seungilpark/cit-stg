import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Modal, Button, StyleSheet, Text, View, Image, Linking, Alert, Platform, TouchableOpacity, TouchableHighlight, TouchableHighlightBase } from 'react-native'
import  Overlay  from "react-native-modal-overlay"

// demo purposes only
// function * range (start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i
//   }
// }

export default class Card extends Component {
  constructor (props) {
    
    super(props)
    this.state = {
        athl_id : 2,
        cards: [],
      // cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      modalVisible: false,
    //   cardIndex: 0
    }
    this.getData = this.getData.bind(this);
    this.callNumber = this.callNumber.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }
  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
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
    return fetch('http://54.191.100.200:8080/api/recommendations/athlete/' + this.state.athl_id)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(typeof responseJson);
        // Object.entries(responseJson)

        // not using offer_types, offer_length, fk_club_id
        new_arr = responseJson
        // console.log(new_arr);
        this.setState({cards : new_arr});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(){
      this.getData();
      console.log('data loaded');
  }


  renderCard = (card) => {
    // console.log(this.state.cards);
    if (card === undefined){

    }else{
      return (
        <View  style={styles.card}>
          <Image
            style={{width: 270, height: 270, resizeMode: 'contain', backgroundColor: 'transparent'}}
            source={{uri: 'https://i.pinimg.com/564x/02/43/ee/0243ee0e6e658df20f3393a30e2d6747.jpg'}}
          />
          <Text style={{textAlign: 'center', fontSize: 30,backgroundColor: 'transparent'}}>{card.offer_amount}</Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.text}>From: {card.club_name}</Text>

          {/* Linking.openURL(`tel:${phoneNumber}`) */}
          <TouchableOpacity onPress = {this.callNumber}>
            <Text style={styles.text}>{card.club_contact}</Text>
          </TouchableOpacity>
            
          <Text style={{color: 'blue', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}
            onPress={() => Linking.openURL('http://www.google.com/' + card.club_url)}>
            {card.club_url}
          </Text>
            
          <Text style={styles.text}>{card.offer_desc}</Text>
          <Text style={styles.text}>Title: {card.offer_title}</Text>
        </View>
      )
    }
    
    // console.log(card);
  };

  onSwiped = (event, direction) => {
    if(direction === "left"){
      fetch(
        "http://54.191.100.200:8080/api/athlLikes/dislike/",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              athl_id: this.state.athl_id,
              offer_id: this.state.cards[event].offer_id
            })
        },
        // console.log(body)
      );
      
    }else{
      fetch(
        "http://54.191.100.200:8080/api/athlLikes/like/",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              athl_id: this.state.athl_id,
              offer_id: this.state.cards[event].offer_id
            })
        },
        console.log('success')
      );
    }
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
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper

            
          }}
          backgroundColor={'white'}
          infinite = {false}
          useViewOverflow={Platform.OS === 'ios'}
          // onSwiped={() => this.onSwiped('general')}
          // onPress={(event)=>this._selectedItem(item.text)}
          onSwipedLeft={(event) => this.onSwiped(event, "left")}
          onSwipedRight={(event) => this.onSwiped(event, "right")}
          // onSwipedTop={() => this.onSwiped('top')}
          // onSwipedBottom={() => this.onSwiped('bottom')}
          // onTapCard={this.swipeLeft}
          cards={this.state.cards}
          // cardIndex={this.state.cardIndex}
          marginBottom={110}
          cardVerticalMargin={30}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            // bottom: {
            //   title: 'BLEAH',
            //   style: {
            //     label: {
            //       backgroundColor: 'black',
            //       borderColor: 'black',
            //       color: 'white',
            //       borderWidth: 1
            //     },
            //     wrapper: {
            //       flexDirection: 'column',
            //       alignItems: 'center',
            //       justifyContent: 'center'
            //     }
            //   }
            // },
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
            // top: {
            //   title: 'SUPER LIKE',
            //   style: {
            //     label: {
            //       backgroundColor: 'purple',
            //       borderColor: 'purple',
            //       color: 'white',
            //       borderWidth: 1
            //     },
            //     wrapper: {
            //       flexDirection: 'column',
            //       alignItems: 'center',
            //       justifyContent: 'center'
            //     }
            //   }
            // }
          }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  btnText: {
    fontSize: 24,
    opacity: 1,
    color: "#fff",
  },
  button: {
    opacity: 0.7,
    backgroundColor: "#3AD289",
    width: "57%",
    padding: 13,
    marginLeft: "21%",
    marginTop: 545,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
},

})