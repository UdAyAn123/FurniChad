const firebaseConfig = {
    apiKey: "AIzaSyD5oPX-ScDnniWVeb28YhJQdq0RC017_iY",
    authDomain: "hackfest-a71c4.firebaseapp.com",
    projectId: "hackfest-a71c4",
    storageBucket: "hackfest-a71c4.appspot.com",
    messagingSenderId: "226928990995",
    appId: "1:226928990995:web:645cf4645377b0f03818e6",
    measurementId: "G-PN39FBZ9HH"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("index.html");
    }
});

function logout() {
    firebase.auth().signOut()
};