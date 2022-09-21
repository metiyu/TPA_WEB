import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { UseCurrentUser } from './contexts/userCtx'
import Homepage from './pages/homepage/Homepage'
import Message from './pages/message/Message'
import MyNetwork from './pages/my-network/MyNetwork'
import Profile from './pages/profile/Profile'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'
import Activation from './pages/user_helper/Activation'
import ForgotPassword from './pages/user_helper/ForgotPassword'
import CodeFromEmail from './pages/user_helper/CodeFromEmail'
import ResetPassword from './pages/user_helper/ResetPassword'
import SearchFilter from './pages/search-filter/Search-Filter'
import { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_USER } from './query-queries'
import { ProtectedRoute, UnprotectedRoute } from './middleware/Middleware'
import { UseCurrentTheme } from './contexts/themeCtx'
import Jobs from './pages/jobs/Jobs'

export default function Middleman() {
    const { getUser, setUserToStorage } = UseCurrentUser()
    const { getTheme } = UseCurrentTheme()

    const [updateUser, { loading, called, data }] = useLazyQuery(GET_USER, {
        variables: {
            id: getUser().id
        }
    })

    if (!called) {
        if (window.performance) {
            if (performance.navigation.type == 1) {
                updateUser()
            }
        }
    }


    // useEffect(() => {
    //     if(data != undefined)
    //         setUserToStorage(data)
    // }, [data])

    const Protected = () => {
        return (
            <ProtectedRoute>
                <Outlet></Outlet>
            </ProtectedRoute>
        )
    }

    const Unprotected = () => {
        return (
            <UnprotectedRoute>
                <Outlet></Outlet>
            </UnprotectedRoute>
        )
    }

    return (
        <div style={{ ...getTheme() }}>
            <BrowserRouter>
                <Routes>
                    {/* <Route path='' element={< />} /> */}
                    <Route element={<Unprotected />}>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/sign-up' element={<SignUp />} />
                        <Route path='/:id' element={<Activation />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/code-verification/:id' element={<CodeFromEmail />} />
                        <Route path='/reset-password/:id' element={<ResetPassword />} />
                    </Route>
                    <Route element={<Protected />}>
                        <Route path='/feed:limit' element={<Homepage />} />
                        <Route path='/feed' element={<Homepage />} />
                        <Route path='/mynetwork' element={<MyNetwork />} />
                        <Route path='/message/:id' element={<Message />} />
                        <Route path='/message' element={<Message />} />
                        <Route path='/profile/:id' element={<Profile />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/search/:type/keyword=:keyword/page=:page' element={<SearchFilter />} />
                        <Route path='/jobs' element={<Jobs />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}