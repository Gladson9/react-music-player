import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import db, { auth } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUser(null);
    history.push("/");
    return auth.signOut();
  }

  function loadMusicToAccount(user) {
    // console.log(user);
    db.collection("music-list")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          db.collection("users")
            .doc(user.user.uid)
            .collection("music-list")
            .add(doc.data());
        });
      });
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    signup,
    loadMusicToAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
