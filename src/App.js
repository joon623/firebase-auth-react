import "./App.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "./firebase";

function App() {
  const handleSignUp = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const idToken = credential.idToken;
        console.log("idToken", idToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="App">
      <button onClick={handleSignUp}>sign up throught google</button>
    </div>
  );
}

export default App;
