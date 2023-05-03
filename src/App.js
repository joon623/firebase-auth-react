import "./App.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "./firebase";
import { useState } from "react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSignUp = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        result.user
          .getIdToken()
          .then((idToken) => {
            // TODO: Send the ID token to the server
            console.log("idToken", idToken);
            fetch("https://winners-high-be-test.herokuapp.com/auth/sign-in", {
              method: "post",
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            })
              .then((res) => {
                if (res.ok) {
                  setLoggedIn(true);
                }
              })
              .catch((error) => {
                window.alert(error);
                window.alert("error check please");
              });
          })
          .catch((error) => {
            console.log(error);
          });
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
      {isLoggedIn ? (
        <div>"login 성공"</div>
      ) : (
        <button onClick={handleSignUp}>sign up throught google</button>
      )}
    </div>
  );
}

export default App;
