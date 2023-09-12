import './App.css'

import { Footer } from './components/header-footer/footer/footer'
import { Header } from './components/header-footer/header/header'
import { MainBar } from './components/main bar/main-bar'
import { StakeMenu } from './components/stake manu/stake-menu'

export const App = () => {
  return (
    <>
      <Header/>
      <MainBar/>
      <StakeMenu/>
      <Footer/>
    </>
  )
}

