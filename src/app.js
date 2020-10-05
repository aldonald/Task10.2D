import React, { useState, useEffect } from 'react'
import {
  Route,
  BrowserRouter
} from 'react-router-dom'
import Header from './header'
import TaskList from './tasklist'
import Home from './home'
import NewTask from './newtask'
import MyWork from './mywork'
// import { useHistory } from "react-router-dom"


const App = () => {
  const [loggedin, setLoggedin] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // const history = useHistory()

  const fetchUser = () => {
    const url = `/api/user/`
    fetch(url, {
      credentials: 'include'
    }).then((response) => {
      if (response.status !== 200) logout()
      else return response.json()
    }).then((user) => {
      if (user) {
        setLoggedin(true)
        setUser(user)
      }
    }).catch((err) => {
    }).finally(() => setLoading(false))
  }

  useEffect(fetchUser, [])

  const logout = (ev) => {
    if (ev) ev.preventDefault()
    setLoggedin(false)
    fetch('/api/logout/', {method: 'POST', credentials: 'include'})
    .then((res) => {
      setUser(null)
      window.location.href = `${window.location.origin}/api/reqlogin`

      // history.push("/login")
    })
  }

  const checkLoggedIn = () => {
    if (!loading && !loggedin) {
      return logout()
    }
  }

  useEffect(checkLoggedIn, [loading])

  // This is work in progress
  const requireAuth = (nextState, replace, next) => {
    if (!user) {
      fetchUser()
    }
  }

  return (
    <>
      {loggedin &&
        (<BrowserRouter>
          <Header loggedin={loggedin} logout={logout} user={user} />
          <div className="content">
            <Route exact path="/" component={Home} onEnter={requireAuth} />
            <Route path="/home" component={TaskList} onEnter={requireAuth} />
            <Route path="/newtask" component={NewTask} onEnter={requireAuth} />
            <Route path="/mywork" component={MyWork} onEnter={requireAuth} />
          </div>
        </BrowserRouter>)
      }
    </>
  )
}

export default App
