var firebaseConfig = {
      apiKey: "AIzaSyDVT0x4Y6mhzR5Ye9r0LK2DnpAUqRXCjfM",
      authDomain: "portfolio-73ccf.firebaseapp.com",
      databaseURL: "https://portfolio-73ccf-default-rtdb.firebaseio.com",
      projectId: "portfolio-73ccf",
      storageBucket: "portfolio-73ccf.appspot.com",
      messagingSenderId: "393292072370",
      appId: "1:393292072370:web:92d7ca790fe5c5c97f50ab",
      measurementId: "G-3QKGY0J6DQ"
    };
    
    
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("room_names"+Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(room_name){
      console.log(room_name);
      localStorage.setItem("room_name",room_name);
      window.location = "kwitter_page.html"
}

function add_room(){
      room_name = document.getElementById("room_name").value;
      localStorage.setItem("room_name",room_name);
      firebase.database().ref("/").child(room_name).update({
            porpose:"adding room name"
      });
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name",user_name);
      window.location = "index.html"
}