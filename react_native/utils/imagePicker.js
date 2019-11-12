const CLUB_IMAGES_DICT = {
    "Barcelona":"barcelona.jpg",
    "Liverpool":"liverpool.png",
    "Manchester United":"manu.jpg",
    "Paris-St.Germain":"paris.jpg",
    "Vancouver Whitecaps":"whitecaps.png",
    "TorontoFC":"toronto.png",
    "Montreal Impact":"montreal.jpg",
    "Ottawa Fury":"ottawa.png",
    "Manchester City":"mancity",
    "Real Madrid":"realmadrid.png"
}


/* 
 * @input: [] club {}
 * @output: [] club {} + url: 
 * url:path from component folder
 */
const clubImagePicker = (clubArr) => {
    return clubArr.map(club => Object.assign({}, club, {"url": `../assets/${CLUB_IMAGES_DICT[club.club_name]}`}));
}


const athlImagePicker = (athlArr) => {
    return athlArr.map((athl, index) => {
        let gender = athl.athl_gender == "Male" ? "" : "f";
        return Object.assign({}, athl, {"url":`../assets/athl/${gender}${index % 19 + 1}.jpg`})
    })
}

module.exports = {
    clubImagePicker,
    athlImagePicker,
}