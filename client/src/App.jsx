import './App.css';
import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Navtab from './components/navbar/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

// import Header from './components/Header';
// import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const location = useLocation();
  // const {onOpen, onOpenChange, onClose} = useDisclosure();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  function handleShowForm(e){
    if(e.target.name === "login"){
      setShowLogin(!showLogin)
      // onOpen()
    }else{
      setShowSignup(!showSignup)
      // onOpen()
    }
    
  }
  // function redirectModal(e){
  //   if(e.target.name === "login"){
  //     setShowLogin(!showLogin)
  //     // onOpen()
  //   }else{
  //     setShowSignup(!showSignup)
  //     // onOpen()
  //   }
  // }
  function closeModal(e){
    if(e.target.name === "closeLogin"){
      setShowLogin(!showLogin)
      console.log('clicked from login') 
      
    }
    if(e.target.name === "closeSignup"){
      setShowSignup(!showSignup)
      console.log('clicked from login')
      
    }
  }

  // const [showSignup, setShowSignup] = useState(false);
  return (
    <ApolloProvider client={client}>
      <Navtab onOpen={handleShowForm}/>
      <Login isOpen={showLogin}   onClose={closeModal} handleShowForm={handleShowForm}/>
      
      <Signup isOpen={showSignup}  onClose={closeModal} />

      <div >
        <div className='purple-dark h-full w-full flex justify-center'>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
