import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image } from 'react-native'
import { Platform } from 'react-native'


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
        athl_id : 1,
        cards: [],
      // cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
    //   cardIndex: 0
    }
    this.getData = this.getData.bind(this);
  }

  getData() {
    return fetch('http://54.191.100.200:8080/api/offers')
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
          <Text style={styles.text}>{card.offer_position}</Text>
          <Text style={styles.text}>${card.offer_amount}</Text>
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
        console.log('success')
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
          backgroundColor={'#FFD0E9'}
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
          cardVerticalMargin={80}
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
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'grey',
                  borderColor: 'grey',
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
                  backgroundColor: 'red',
                  borderColor: 'red',
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
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})