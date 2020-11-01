const Twitter = require ('twitter')
//Constante que guarda as funções da lib do Twitter
require ('dotenv').config()
//Constante das variáveis de ambiente]

const Tweet = new Twitter({
    consumer_key:           process.env.BOT_CONSUMER_KEY,
    consumer_secret:        process.env.BOT_CONSUMER_SECRET,
    access_token_key:       process.env.access_token_key,
    access_token_secret:    process.env.access_token_secret,
})
//Constante que armazena uma nova instância autentica da lib, com funções.

function action(event){
    const {retweeted_status, id_str, screen_name, is_quote_status} = event;
    const {name} = event.user;
}

// Condição para Retweet
if(!retweeted_status && !is_quote_status){ // Se o status não for um retweet normal, nem um retweet com comentário
    Tweet.post(`statuses/retweet/${id_str}`, erro => { 
      if(erro){
        console.log("Erro no retweet: " + erro)
      }else {
        console.log("RETWEETADO: ", `https://twitter.com/${name}/status/${id_str}`)
      }
    }) // Retweetar o tweet, e caso haja um erro, avisar no console. Se não, avisar no console que deu certo com o id do tweet 
  } else {
       return // Caso as condições não sejam atendidas, retornar a função vazia, indo para o próximo tweet
     }
// Condição para dar like
if(!retweeted_status && !is_quote_status){ // Se o status não for um retweet normal, nem um retweet com comentário
    Tweet.post(`statuses/retweet/${id_str}`, erro => { 
      if(erro){
        console.log("Erro no retweet: " + erro)
      }else {
        console.log("RETWEETADO: ", `https://twitter.com/${name}/status/${id_str}`)
      }
    }) // Retweetar o tweet, e caso haja um erro, avisar no console. Se não, avisar no console que deu certo com o id do tweet
    Tweet.post('favorites/create', {id: id_str}, erro => { // Dar like no tweet
      if(erro){
        return console.log("Erro no like: " + erro) // Caso haja algum erro, jogar no console para verificarmos.
      }else {
        return console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`) // Se der tudo certo, avisar no console com o URL do tweet original
      }
    }) 
  }else {
       return // Caso as condições não sejam atendidas, retornar a função vazia, indo para o próximo tweet
     }


var stream = Tweet.stream('statuses/filters', {track: 'teste'})
// Aqui dizemos para o programa a palavra que queremos procurar

stream.on('data', action)
//Ao receber as informações (`data`), passar elas para a função action e chamar a mesma

stream.on('error', erro => console.log("Erro: " + erro))
// Caso haja algum erro, jogar o erro no console para verificarmos.