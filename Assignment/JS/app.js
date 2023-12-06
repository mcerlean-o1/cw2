//The URIs of media page
IUPS = "https://prod-88.eastus.logic.azure.com:443/workflows/bfe50ac439d34d40b27ff93b654d710c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rqBrSVJ1PzgVC746ewtoPGFEVdD-5nbvdSz00t0-SGY";
RAI = "https://prod-13.eastus.logic.azure.com:443/workflows/21a54c9ad0d144b99d25eb1a0664ad9c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8C-8_h6V70943GV2-jsypB-0h23Spe7C3EdV3US0IME";

BLOB_ACCOUNT = "https://gymmemberb00800485.blob.core.windows.net";

RAAURI = "https://prod-03.eastus.logic.azure.com/workflows/51cdd5aa537f49ea8181b5b62aeb9d18/triggers/manual/paths/invoke/rest/v1/members?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3zQzzd52DzwqoRRz6dK9wcEIK02TJnpe4pAiFyx-Pwc";

DIAURI0 = "https://prod-24.eastus.logic.azure.com/workflows/179393fbc1364680a13c3184e21c702c/triggers/manual/paths/invoke/rest/v1/members/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QdZdgZ9OQt8NVjkTn65kpbOC3XyvhoQAI5_rpvfua78";

UIAURI0 = "https://prod-09.eastus.logic.azure.com/workflows/c35ecc6e433f41cea7a1ae6636c87195/triggers/manual/paths/invoke/rest/v1/members/";
UIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HihiEPqEUK8OxlWXxIqQLGrgBCqda9BWVc6bRNbYw-4";


//The URI of the sign up page 
CIAURI = "https://prod-16.eastus.logic.azure.com/workflows/59739a78585842da85c92c59738074b4/triggers/manual/paths/invoke/rest/v1/members?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RS2XXN_8PTCYXPr3mC4qyH-l1cStm7HWOjH6TyNqp8k";


//A function to submit a new asset to the REST endpoint 
function submitNewMembers(){
  
  //Construct JSON Object for new item
  var subObj = {
    MemberUsername: $('#MemberUsername').val(),
    Password: $('#Password').val(),
    MemberName: $('#MemberName').val(),
    Gender: $('#Gender').val(),
    Address: $('#Address').val(),
    TrainingDesc: $('#TrainingDesc').val()
  }

  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8',
    success: function(data){
      console.log("Signup successful:", data),
      window.location.href = "media.html";
      alert("Sign-up was successful")
    }
  }).done(function (response){
    getMemberList();
  }) 

}






//Handlers for button clicks
$(document).ready(function() {



    //Handler for the new asset submission button
   $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewMembers();
      
  });

  
  //Handlers for login button clicks
  $("#Loginbtn").click(function(){

    memberLogin();

  
  });

  $("#retMembers").click(function(){

    //Run the get asset list function
    getMemberList();

  });
 
  $("#retImages").click(function(){

      //Run the get member list function
      getImages();

  }); 

  $("#retMedia").click(function(){

    //Run the get member list function
    getMedia();

}); 

$("#editMember").click(function(){

  //Run the get member list function
  updateMember();

}); 


   

   //Handler for the new member submission button
  $("#subNewForm").click(function(){

    //Execute the submit new member function
    submitNewImage();
    
  }); 
});

//A function to submit a new member to the REST endpoint 
function submitNewImage(){
  
  submitData = new FormData();

  submitData.append('FileName', $('#FileName').val());
  submitData.append('fileDesc', $('#fileDesc').val());
  submitData.append('memberID', $('#memberID').val());
  submitData.append('memberUsername', $('#memberUsername').val());
  submitData.append('File', $("#UpFile")[0].files[0]);
 

$.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){
 
  }
});


}

//A function to get a list of all the members and write them to the Div with the MemberList Div
function getImages(){

  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
 
  $.getJSON(RAI, function( data ) {
    
    var items = [];

    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push("<img src="+BLOB_ACCOUNT + val["filePath"] + " width='400'/> <br/>")
      items.push("File: "+ val["fileName"] + "<br/>");
      items.push("File Description: "+ val["fileDesc"] + "<br/>");
      items.push("Uploaded by: "+ val["memberUsername"]+ " (member id: "+val["memberID"]+")<br/>");
      items.push("<hr />")

    });

    $("#ImageList").empty();

    $("<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#ImageList" )
  });
}



//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getMemberList(){

  //Replace the current HTML in that div with a loading message
  $('#MemberList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API 
  $.getJSON(RAAURI, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];
      
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val) {

      items.push( "Member ID: " + val["MemberID"] + "<br/>");
      items.push( "Member Username: " + val["MemberUsername"] + "</br>");
      items.push("Member Name: " + val["MemberName"] + "<br/>");
      items.push( "Gender: " + val["Gender"] + "<br/>");
      items.push( "Email: " + val["Address"] + "<br/>");
      items.push( "Training Description: " + val["TrainingDesc"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteMember('+val["MemberID"]
      +')">Delete</button> <br/>');
      items.push('<button type="button" id="updateMember" data-toggle="modal" data-target="#MemberModal" onclick="editMemberID=('+val["MemberID"]+')"class="btn btn-light"> Update </button> <br/>');

    });

      //Clear the assetlist div 
      $('#MemberList').empty();

      //Append the contents of the items array to the AssetList Div
      $("<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo('#MemberList')
    });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteMember(id){
  $.ajax({

    type: "DELETE",

    url: DIAURI0 + id + DIAURI1,

  }).done(function( msg ) {

    getMemberList();

  });
}

function updateMember(){
  
  var subObj = {
    MemberUsername: $('#editMemberUsername').val(),
    MemberName: $('#editMemberName').val(),
    Gender : $('#editGender').val(),
    Address : $('#editAddress').val(),
    TrainingDesc : $('#editTrainingDesc').val(),
  };

  subObj = JSON.stringify(subObj);
  
  $.ajax({

    type: "PUT",

    url: UIAURI0 + editMemberID + UIAURI1,

    data : subObj,

    contentType: "application/json; charset=utf-8"

  }).done(function( msg ) {

    getMemberList();

    //$('#editMemberModal').modal('hide');

  });
}


//ASK ABOUT THIS
function translateText() {

  var targetLanguage = document.getElementById("targetLanguage").value;
  traverseAndTranslate(document.body, targetLanguage);
}

function traverseAndTranslate(node, targetLanguage) {
  if(node.nodeType == Node.TEXT_NODE) {
    translateNodeText(node, targetLanguage);
  } else {
    for (var i = 0; i < node.childNodes.length; i++) {
      traverseAndTranslate(node.childNodes[i], targetLanguage);
    }
  }
}

function translateNodeText(node, targetLanguage) {
  var xhr = new XMLHttpRequest();
  var endpoint = "/translator-app.py"
  xhr.open("POST", endpoint, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      node.nodeValue = xhr.responseText;
    }
  };

  var data = {
    "text_to_translate": node.nodeValuel,
    "target_language": targetLanguage
  };
  xhr.send(JSON.stringify(data) );
}


function memberLogin() {
  
  var userData = {
    MemberUsername: $('#MemberUsername').val(),
    Password: $('#Password').val()
  }

  //URI for Login
  uri = "https://prod-25.eastus.logic.azure.com:443/workflows/1fb66e987c2d40d1ace9c535a084000f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DOugHcgJ6klb-dBweA-FHElruQYN4LDfoPZjBu7yulM"

  $.ajax({
    url: uri,
    data: JSON.stringify(userData),
    cache: false,
    contentType: 'application/json',
    processData: false,
    type: 'POST',
    success: function(data){
      console.log("Login successful:", data),
      window.location.href = "https://brave-mud-0114af310.4.azurestaticapps.net/media.html";
      alert("Login was successful")
    },
    error: function(xhr, status, error) {
      console.error("Login failed", error);
    }
  
}
)}

