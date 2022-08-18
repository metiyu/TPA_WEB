import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CurrentUserProvider, { UseCurrentUser } from './contexts/userCtx'
import Homepage from './pages/homepage/Homepage'
import Message from './pages/message/Message'
import MyNetwork from './pages/my-network/MyNetwork'
import Profile from './pages/profile/Profile'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'

function App() {
  const { user } = UseCurrentUser()

  const auth_link = new ApolloLink((operation: any, forward: any) => {
    if (user && user.token !== undefined) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${user.token}`
        },
      });
    }
    return forward(operation)
  })

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/query'
  })

  const client = new ApolloClient({
    link: auth_link.concat(httpLink),
    cache: new InMemoryCache({}),
  })

  function MakeHomepage(){
    return(
      <CurrentUserProvider>
        <Homepage />
      </CurrentUserProvider>
    )
  }

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          {/* <Route path='' element={< />} /> */}
          <Route path='/' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/feed' element={MakeHomepage()} />
          <Route path='/mynetwork' element={<MyNetwork />} />
          <Route path='/message' element={<Message />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter >
  )
}

export default App
