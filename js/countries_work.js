function add() {
    let country = prompt('введите название страны');
    let capital = prompt('введите название столицы');

    addCountry(country, capital);

    console.log(countrysH);
}

function info() {
    let country = prompt('введите название страны');
    let info = getCountryInfo(country);

    console.log(info);
}

function list() {
    console.log( "список стран:" + listCountrys() );
}

function del() {
    let country = prompt('введите название страны');

    deleteCountry(country);

    console.log(countrysH);
}    