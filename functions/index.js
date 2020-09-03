const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();

const config = {
  apiKey: "AIzaSyCbiNIhP030IgJwqk97yElx9iT2Y_XgO7g",
  authDomain: "socialape-75cc1.firebaseapp.com",
  databaseURL: "https://socialape-75cc1.firebaseio.com",
  projectId: "socialape-75cc1",
  storageBucket: "socialape-75cc1.appspot.com",
  messagingSenderId: "947673988292",
  appId: "1:947673988292:web:cd372c80b4895c1acb5d91",
  measurementId: "G-0M72K1SQDB",
}


const firebase = require("firebase");
const { user } = require('firebase-functions/lib/providers/auth');
firebase.initializeApp(config);

const db = admin.firestore();

app.get("/screams", (req, res) => { //1st param is the name of route & 2nd param is the handler
 db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.err(err));
})

app.post("/scream",(req, res) => {

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  }

  db.collection("screams")
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong"});
      console.error(err);
    })
});

const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  return email.match(regEx) ? true : false;
}

const isEmpty = string => string.trim() === "";

// Signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let errors = {}

  if(isEmpty(newUser.email)){
    errors.email = "Must not be empty"
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address"
  }

  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords must match";
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

  if(Object.keys(errors).length > 0 ) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken"})
      } else {
        return firebase.
          auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
      
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if(err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: 'Email is already in use'});
      } else {
        return res.status(500).json({ error: err.code });
      }
      
    });
});

// Login
app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  let errors = {}

  if(isEmpty(user.email)) errors.email = "Must not be empty";
  if(isEmpty(user.password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.p)
})


exports.api = functions.region("europe-west1").https.onRequest(app);