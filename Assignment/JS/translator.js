$(document).ready(function() {

    //Handler for the new asset submission button
   $("#translateText").click(function(){

    //Execute the submit new asset function
    translate();
      
  });
})

function translate(){
    let key = "a1e2f9f7537a46dbb20edd8de88646b3";
    let endpoint = "https://api.cognitive.microsofttranslator.com/";
    let location = "eastus";
    let language = document.getElementById('language').value;
    var items =[];
    const params ={
      'api-version': '3.0',
              'from': 'en',
              'to': [language]
    };
    const headers= {
      'Ocp-Apim-Subscription-Key': key,
      'Ocp-Apim-Subscription-Region': location,
      'Content-type':'application/json',
      'X-ClientTraceId': Date.now().toString()
    };
  
    var tranurl = endpoint + '/translate';
    var translateText = document.getElementById('textTranslate').value;
  
    var body = JSON.stringify([{ 'text': translateText}]); 
  
  
   fetch(tranurl + '?' + new URLSearchParams(params), {
      method: 'POST',
      headers: headers,
      body: body
   }).then((response) => {
     return response.json()
   }).then((data) => {
      $("#translationResult").empty();
      for (let i =0; i<data[0].translations.length; i++) {
        $('#translationResult').append(data[0].translations[i].text);
  
      }
   }).appendTo('translationResult')
  }