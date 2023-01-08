import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4bw9N4wP2_CYVC2UTX65MF43H42OBJcs",
  authDomain: "netflix-5d3da.firebaseapp.com",
  projectId: "netflix-5d3da",
  storageBucket: "netflix-5d3da.appspot.com",
  messagingSenderId: "451032111338",
  appId: "1:451032111338:web:37f29a999671c57c2bdf93",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { auth };
export default db;

async function addData(UID) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
