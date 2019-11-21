var CLUB_IMAGES_DICT = {
    "Barcelona":require("../assets/barcelona.jpg"),
    "Liverpool":require("../assets/liverpool.jpg"),
    "Manchester United":require("../assets/manu.jpg"),
    "Paris-St.Germain":require("../assets/paris.jpg"),
    "Vancouver Whitecaps":require("../assets/whitecaps.png"),
    "TorontoFC":require("../assets/toronto.png"),
    "Montreal Impact":require("../assets/montreal.jpg"),
    "Ottawa Fury":require("../assets/ottawa.png"),
    "Manchester City":require("../assets/mancity.jpg"),
    "Real Madrid":require("../assets/realmadrid.png")
}


/* 
 * @input: [] club {}
 * @output: [] club {} + url: 
 * url:path from component folder
 */
function clubImagePicker(clubArr){
    if(clubArr.length != 0){
        return clubArr.map(club => Object.assign({}, club, {"url": CLUB_IMAGES_DICT[club.club_name]}));
    }else{
        return 'empty'
    }
}

var images={
    "1": require("../assets/athl/1.jpg"),
    "2": require("../assets/athl/2.jpg"),
    "3": require("../assets/athl/3.jpg"),
    "4": require("../assets/athl/4.jpg"),
    "5": require("../assets/athl/5.jpg"),
    "6": require("../assets/athl/6.jpg"),
    "7": require("../assets/athl/7.jpg"),
    "8": require("../assets/athl/8.jpg"),
    "9": require("../assets/athl/9.jpg"),
    "10": require("../assets/athl/10.jpg"),
    "11": require("../assets/athl/11.jpg"),
    "12": require("../assets/athl/12.jpg"),
    "13": require("../assets/athl/13.jpg"),
    "14": require("../assets/athl/14.jpg"),
    "15": require("../assets/athl/15.jpeg"),
    "16": require("../assets/athl/16.jpg"),
    "17": require("../assets/athl/17.jpg"),
    "18": require("../assets/athl/18.jpg"),
    "19": require("../assets/athl/19.jpg"),
    "20": require("../assets/athl/20.jpg"),
    "21": require("../assets/athl/f1.jpg"),
    "22": require("../assets/athl/f2.jpg"),
    "23": require("../assets/athl/f3.jpg"),
    "24": require("../assets/athl/f4.jpg"),
    "25": require("../assets/athl/f5.jpg"),
    "26": require("../assets/athl/f6.jpg"),
    "27": require("../assets/athl/f7.jpg"),
    "28": require("../assets/athl/f8.jpg"),
    "29": require("../assets/athl/f9.jpg"),
    "30": require("../assets/athl/f10.jpg"),
    "31": require("../assets/athl/f11.jpg"),
    "32": require("../assets/athl/f12.jpg"),
    "33": require("../assets/athl/f13.jpg"),
    "34": require("../assets/athl/f14.jpg"),
    "35": require("../assets/athl/f15.jpg"),
    "36": require("../assets/athl/f16.jpg"),
    "37": require("../assets/athl/f17.jpg"),
    "38": require("../assets/athl/f18.jpg"),
    "39": require("../assets/athl/f19.jpg"),
    "40": require("../assets/athl/20.jpg"),
}

function athlImagePicker(athlArr){
    if(athlArr.length != 0){
        return athlArr.map((athl, index) => {
            let gender = athl.athl_gender == "Male" ? "" : "f";
            if(gender ===''){
                return Object.assign({}, athl, {"url":images[index % 20 + 1]})
            }else{
                return Object.assign({}, athl, {"url":images[index % 20 + 1 + 20]})
            }
            
        })
    }else{
        return 'empty'
    }
    
}



module.exports = {
    clubImagePicker,
    athlImagePicker,
}