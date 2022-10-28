import './App.css';
import React, {useState, useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Posts from './Posts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [openSignin, setOpenSignin] = useState(false);
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const handleOpenSignin = () => setOpenSignin(true);
  const handleCloseSignin = () => setOpenSignin(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const usersCollectionRef = collection(db, 'posts');
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      }
      else {
        setUser(null)
      }
    });
    return () => {
      unsub();
    }
  }, [user, username])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }
    getUsers();
  }, [])
  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((currentUser) => {
        return currentUser.updateProfile({
          displayName: username
        })
      });
    } catch (error) {
      alert(error.message);
    }
    setOpen(false)
  };
  
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      alert(error.message);
    }
    setOpenSignin(false)
  };
  
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="App">
    {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <div className='login__container'>
        <Button onClick={handleOpenSignin}>Login</Button>
        <Button onClick={handleOpen}>Sign Up</Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <form className='app__signup'>
      <center>
      <img className="app__headerImage" 
      src='https://play-lh.googleusercontent.com/9ASiwrVdio0I2i2Sd1UzRczyL81piJoKfKKBoC8PUm2q6565NMQwUJCuNGwH-enhm00' alt='logo' />
      </center>
      <Input 
      placeholder='username'
      type='text'
      value={username}
      onChange={(e) => setUsername(e.target.value)} />
      <Input 
      placeholder='email'
      type='text'
      value={email}
      onChange={(e) => setEmail(e.target.value)} />
       <Input 
      placeholder='password'
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={signUp}>Sign Up</Button>
      </form>
        </Box>
      </Modal>
      <Modal
        open={openSignin}
        onClose={handleCloseSignin}
      >
        <Box sx={style}>
        <form className='app__signup'>
      <center>
      <img className="app__headerImage" 
      src='https://play-lh.googleusercontent.com/9ASiwrVdio0I2i2Sd1UzRczyL81piJoKfKKBoC8PUm2q6565NMQwUJCuNGwH-enhm00' alt='logo' />
      </center>
      <Input 
      placeholder='email'
      type='text'
      value={email}
      onChange={(e) => setEmail(e.target.value)} />
       <Input 
      placeholder='password'
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={login}>Login</Button>
      </form>
        </Box>
      </Modal>
    <div className='app__header'>
    
    </div>
    {users.map((user) => {
      return (
        <div>
        <Posts 
          username={user.username}
          imageUrl={user.imageUrl}
          caption={user.caption} />
        </div>
      )
    })}
    </div>
  );
}

export default App;
