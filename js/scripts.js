let pokemonList=[
    {name:'Bulbasaur',height:0.7,weight:6.9,types:['grass','poison']},
    {name:'Ivysaur',height:1.0,weight:13.0,types:['grass','poision']},
    {name:'Venusaur',height:2.0,weight:100.0,types:['grass','poison']},
    {name:'Charmander',height:0.6,weight:8.5,types:'fire'},
    {name:'Charmeleon',height:1.1,weight:19.0,types:'fire'},
    {name:'Charizard',height:1.7,weight:90.5,types:['fire','flying']},
    {name:'Squirtle',height:0.5,weight:9.0,types:'water'},
    {name:'Wartortle',height:1.0,weight:22.5,types:'water'},
    {name:'Blastoise',height:1.6,weight:85.5,types:'water'}
];
console.log(pokemonList);

//prints on screen all the Pokemon's names and height from the list
//if height is over 1.7(m),add note to highlight special Pokemon
pokemonList.forEach(function(pokemon){
    if(pokemon.height>1.7){
        document.write('<p>'+pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!'+'</p>')
    }else{
        document.write('<p>'+pokemon.name + ' (height: ' + pokemon.height+')'+'</p>')
    }
});