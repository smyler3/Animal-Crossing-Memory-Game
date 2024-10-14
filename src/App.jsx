import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import GameArea from './components/GameArea'

function App() {

    return (
		<>
			<Header />
			<GameArea />
			<Footer />
		</>
    )
}

export default App
