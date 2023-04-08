function uploadImage() {
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
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    firebase.database().ref("user").child(userId).set({
        Username: document.getElementById("username").value,
        Phone: document.getElementById("phone").value,
        Place: document.getElementById("place").value,

    })
}

firebase.auth().onAuthStateChanged((user) => {
    const dbRef = firebase.database().ref();

    if (user) {
        var uid = user.uid;
        console.log(uid);

        var userId = uid;
        console.log(userId);
        const dbRef = firebase.database().ref();

        dbRef.child("profile").child(userId).get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot)
                var user = snapshot.val();
                console.log(user);
                for (const key in user) {
                    document.getElementById("myimg").src = user['MyImage'];
                }
            } else {
                console.log("no image");
            }
        })

        dbRef.child("user").child(userId).get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot)
                var user = snapshot.val();
                console.log(user);
                for (const key in user) {
                    document.getElementById("username").value = user['Username'];
                    document.getElementById("phone").value = user['Phone'];
                    document.getElementById("place").value = user['Place'];

                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    } else {
        console.log('user not signed in')
    }
});

function copy() {
    // Get the text field
    var copyText = document.getElementById("box");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function copy3() {
    // Get the text field
    var copyText = document.getElementById("material");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    if (copyText.value == 'Plastic') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc2").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "block";
    } else if (copyText.value == 'Glass') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc2").style.display = "none";

        document.getElementById("abc").style.display = "none";
        document.getElementById("abc1").style.display = "block";
    } else if (copyText.value == 'Metal') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "none";
        document.getElementById("abc2").style.display = "block";
    } else if (copyText.value == 'Rubber') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "none";
        document.getElementById("abc2").style.display = "none";
        document.getElementById("abc3").style.display = "block";
    } else if (copyText.value == 'Fabric') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "none";
        document.getElementById("abc2").style.display = "none";
        document.getElementById("abc4").style.display = "block";
    } else if (copyText.value == 'Wood') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "none";
        document.getElementById("abc2").style.display = "none";
        document.getElementById("abc5").style.display = "block";
    } else if (copyText.value == 'Marble') {
        document.getElementById("abc7").style.display = "none";
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "none";
        document.getElementById("abc2").style.display = "none";
        document.getElementById("abc6").style.display = "block";
    } else if (copyText.value == 'Stone') {
        document.getElementById("abc3").style.display = "none";
        document.getElementById("abc6").style.display = "none";
        document.getElementById("abc5").style.display = "none";
        document.getElementById("abc4").style.display = "none";
        document.getElementById("abc1").style.display = "none";
        document.getElementById("abc").style.display = "none";
        document.getElementById("abc2").style.display = "none";
        document.getElementById("abc7").style.display = "block";
    }
    // Alert the copied text

}

function copy2() {
    // Get the text field
    var copyText = document.getElementById("design");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c1() {
    // Get the text field
    var copyText = document.getElementById("material-1");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c2() {
    // Get the text field
    var copyText = document.getElementById("material-2");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c3() {
    // Get the text field
    var copyText = document.getElementById("material-3");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c4() {
    // Get the text field
    var copyText = document.getElementById("material-4");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c5() {
    // Get the text field
    var copyText = document.getElementById("material-5");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c6() {
    // Get the text field
    var copyText = document.getElementById("material-6");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c7() {
    // Get the text field
    var copyText = document.getElementById("material-7");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}

function c8() {
    // Get the text field
    var copyText = document.getElementById("material-8");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text

}