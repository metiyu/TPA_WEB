import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { UseCurrentUser } from './contexts/userCtx'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/firebase'
import Middleman from './middleman'
import { offsetLimitPagination } from '@apollo/client/utilities'

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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: offsetLimitPagination()
          },
        },
      },
    })
  })

  initializeApp(firebaseConfig)

  return (
    <ApolloProvider client={client}>
      <Middleman />
    </ApolloProvider>
  )
}

export default App
