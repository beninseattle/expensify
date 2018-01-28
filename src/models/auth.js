import {firebase, googleAuthProvider} from '../firebase/firebase';

export default (() => {
  const demoEmail = 'demo@demo.net';
  const demoPass = 'demopass';
  const demoUID = 'p5W6RqpTjVRRSPmARUFK6NniovH2';
  let isInitialized = false;
  let subscribers = [];

  const firebaseAuthChange = (user) => {
    subscribers.forEach((callback) => {
      callback.call(null, user);
    })
  };

  if (!isInitialized) {
    firebase.auth().onAuthStateChanged(firebaseAuthChange);
    isInitialized = true;
  }

  return {
    onAuthStateChanged: (subscribeFunc) => {
      subscribers.push(subscribeFunc);
    },
    offAuthStateChanged: (subscribeFunc) => {
      const i = subscribers.indexOf(subscribeFunc);
      if (i !== -1) {
        subscribers.splice(i, 1);
      }
    },
    signInWithGoogle: () => {
      return firebase.auth().signInWithPopup(googleAuthProvider);
    },
    signInWithDemo: () => {
      return firebase.auth().signInWithEmailAndPassword(demoEmail, demoPass);
    },
    signOut: () => {
      return firebase.auth().signOut();
    },
    isDemo: (uid) => uid === demoUID
  };
})();