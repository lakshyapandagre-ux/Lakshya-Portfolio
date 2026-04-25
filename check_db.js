import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBekoYxgDiK2qgbQYKQyDpj8ISqSAULPOU",
  authDomain: "health-navigator-1b47a.firebaseapp.com",
  projectId: "health-navigator-1b47a",
  storageBucket: "health-navigator-1b47a.firebasestorage.app",
  messagingSenderId: "569899809798",
  appId: "1:569899809798:web:0a69a1383858b371f1d787"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  try {
    console.log("Fetching signatures...");
    const snap = await getDocs(collection(db, "signatures"));
    console.log("Found", snap.size, "signatures.");
    snap.forEach(doc => {
      console.log(doc.id, "=>", Object.keys(doc.data()));
    });
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

check();
