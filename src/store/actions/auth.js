import Auth from '../../models/auth';


export const login = ({uid, isDemo}) => ({
  type: 'LOGIN',
  uid,
  isDemo
});

export const startGoogleLogin = () => {
  return () => {
    Auth.signInWithGoogle();
  };
};

export const startDemoLogin = () => {
  return () => {
    Auth.signInWithDemo();
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return Auth.signOut();
  };
};