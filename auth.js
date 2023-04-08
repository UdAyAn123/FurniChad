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

document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault()
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        location.replace("webpage.html");
    }
});

function login() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            document.getElementById("error").innerHTML = error.message
        })
}

function signUp() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
    alert("Please update your profile.....")

    .catch((error) => {
        document.getElementById("error").innerHTML = error.message

    });

    const ref = firebase.storage().ref()
    const file = document.querySelector('#photo').files[0];
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
        contentType: file.type
    }
    const task = ref.child(name).put(file, metadata)
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url)
            alert("Image uploaded ")
            const image = document.querySelector('#myimg');
            image.src = url;
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref("profile").child(userId).set({
                MyImage: url
            })
        })
        .catch(console.error);

}

function forgotPass() {
    const email = document.getElementById("email").value

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Reset link sent to your email id")
        })
        .catch((error) => {
            document.getElementById("error").innerHTML = error.message

        });
}

function loginWithGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // IdP data available in result.additionalUserInfo.profile.
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });


}