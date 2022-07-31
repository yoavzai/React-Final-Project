import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDWSe7x7q7WYpSD2id6v1CqKQdmE4Fcr3w",
  authDomain: "react-final-project-877a2.firebaseapp.com",
  projectId: "react-final-project-877a2",
  storageBucket: "react-final-project-877a2.appspot.com",
  messagingSenderId: "721503324136",
  appId: "1:721503324136:web:42b861d3a69ad10f4d865d"
};

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()

  export default db