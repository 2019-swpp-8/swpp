import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { HomePage, ProfilePage, ProfileEditPage, TutorListPage, RequestPage } from 'containers'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/profile/edit" component={ProfileEditPage} />
          <Route path="/profile/:id" component={ProfilePage} />
          <Route path="/tutors" component={TutorListPage} />
          <Route path="/request/:id" component={RequestPage} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
