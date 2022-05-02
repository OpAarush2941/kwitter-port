var firebaseConfig = {
      apiKey: "AIzaSyCyalAk_NRJLiM7Pj3Vxo9ke6fPHfObXtA",
      authDomain: "kwitter-ff106.firebaseapp.com",
      databaseURL: "https://kwitter-ff106-default-rtdb.firebaseio.com",
      projectId: "kwitter-ff106",
      storageBucket: "kwitter-ff106.appspot.com",
      messagingSenderId: "769457823703",
      appId: "1:769457823703:web:604ce2882615671e337592"
    };

    firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");



function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

            console.log(firebase_message_id);
            console.log(message_data);
            name_data = message_data["name"];
            message = message_data['message'];
            like = message_data["like"];
            name_with_tag = "<h4>" + name_data + "<img src='tick.png' class='user_tick'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message +"</h4>";
            like_with_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>"
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>"
            row = name_with_tag + message_with_tag + like_with_tag + span_with_tag;
            document.getElementById("output").innerHTML += row;

      } });  }); } 
getData();

function updateLike(message_id){
      console.log("clicked_on_message_id"+message_id);
      likes = document.getElementById(message_id).value;
      updatedlikes = Number(likes) + 1;
      console.log("likes: "+ updatedlikes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updatedlikes
      });
}

function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            message:msg,
            name:user_name,
            like:0
      });
      document.getElementById("msg").value = "";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}