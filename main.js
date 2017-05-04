$(document).ready(function () {
    $('#yearmenu').on('change', onValueChange);

    function onValueChange() {
        console.log('Valittu arvo:' + this.value);
        var imageYear = this.value;
        //console.log('kokeilu' + imageY);
        //console.log('Valittu teksti: ' + $('#yearmenu option:selected').text());
        //piätisi saada this.value vuosilukua vatsaavat kuvat näkyviin
        //appendToPhotosDiv('<b>vuosiluku: ' + imageY + '</b>');
        /*for(var i=0; i<json.records.length; i++) {
           if(this.value === year)
           
        }*/
        //console.log(artMetadata);
        //getArt(this.value);
        // ei toista kutsua Finna-palveluun, vaan läpikäydään tietueet
        $('#photos').empty();
        for (var i = 0; i < artMetadata.length; ++i) {
            // if vuosi täsmää, tulosta ruudulle, kuten onGetArtissa
            // (ennen tulostusta, tyhjennä tulokset ruudulta)
            //console.log("moi");
            //console.log(artMetadata[i].year);
            //console.log('vuosi: '+imageYear);
            //console.log('metadata year: '+artMetadata[i].year);

            if (artMetadata[i].year == imageYear) {
                //console.log('-> vuosi täsmää');
                //console.log(artMetadata[i].images);
                //var workOfArt = artMetadata[i].images;
                appendToPhotosDiv(artMetadata[i]);
            }
        }
    }


    function appendToPhotosDiv(metadataEntry) {
        //var imgUrl = jsonEntry.images; // ensimmäinen kuva taulukosta
        $('#photos').append('<img src="https://www.finna.fi' + metadataEntry.image[0] + '">');
        $('#photos').append('<p>' + metadataEntry.title + ' by ' + metadataEntry.artist + '</p>');
        //$('#photos').append(html + '<br/>');
        //$('.photos').append('<img src="https://www.finna.fi' + images + '">');
        //$('#photos').append('<img src="https://www.finna.fi' + workOfArt + '">');

    }
});


//hakee rajapinnasta kaikki teokset 
function getArt() {
    console.log(getArt);
    $.ajax({
        'url': 'https://api.finna.fi/v1/search?lookfor=syövytys&filter[]=format:%221/WorkOfArt/Graphic/%22&filter[]=building:%220/Nykytaiteen%20museo%20Kiasma/%22',
        'dataType': 'json',
        'success': onGetArt
    });
}

// metatiedot, tietokanta / data joka tulee finna-rajapinnan kautta
var artMetadata = [];

//hakee rajapinnasta kuvan, id, otsikon, vuosiluvun
function onGetArt(json) {

    var yearSoFar = [];

    for (var i = 0; i < json.records.length; ++i) {
        console.log('--------------');
        console.log(json.records[i].title);
        console.log(json.records[i].images);
        console.log(json.records[i].subjects[0][0]); //vuosi
        console.log(json.records[i].id);
        console.log(json.records[i].nonPresenterAuthors[0].name);

        var artist = json.records[i].nonPresenterAuthors[0].name;
        var id = json.records[i].id;
        var title = json.records[i].title;
        var image = json.records[i].images;
        var year = json.records[i].subjects[0][0];

        var artEntry = {};
 
        artEntry.artist = artist;
        artEntry.id = id;
        artEntry.title = title;
        artEntry.image = image;
        artEntry.year = year;

        // lisää "kokoelmaan", taulukkoon
        artMetadata.push(artEntry);
        

        //näyttää kuvat divin sisällä
        $('#photos').append('<img src="https://www.finna.fi' + image + '">');
        //näyttää kuvan otsikon ja tekijän
        $('#photos').append('<p>' + title + ' by ' + artist + '</p>');
        //$('.photos').append('<p>tekijä: ' + artist + '</p>');

        //lisää dropdown menuun vuosiluvut
        // jos vuosi ei vielä alasvetovalikossa
        if (!yearSoFar.includes(year)) {
            console.log(year);
            console.log(yearSoFar);
            yearSoFar.push(year);
        }
    }
    // lisää kerätyt vuodet, järjestyksessä
    yearSoFar.sort();
    for (var i = 0; i < yearSoFar.length; i++) {
        $('#yearmenu').append('<option>' + yearSoFar[i] + '</option>');
    }




    return false;
}
/*function getYear() {
    console.log(getYear);
    $.ajax({
        'url': 'https://api.finna.fi/v1/search?lookfor=syövytys&filter[]=format:%221/WorkOfArt/Graphic/%22&filter[]=building:%220/Nykytaiteen%20museo%20Kiasma/%22',
        'dataType': 'json',
        'success': addYearsToMenu
    });
}
function addYearsToMenu(id) {
    for (var i = 0; i < json.records.length; ++i) {
        console.log(json.records[i].subjects[0]);
        var year = json.records[i].subjects[0];
        $('.dropdown-menu').append('<a class="dropdown-item">' + year + '</a>');
    }
    return false;
}
function onGetYear(json) {
    for (var i = 0; i < json.records.length; ++i) {
        console.log(json.records[i].subjects[0]);
    }
    return false;
}
*/
//$('.photos').append('<p>otsikko: '+json.records[i].title+'</p>');

getArt();

//getYear();
