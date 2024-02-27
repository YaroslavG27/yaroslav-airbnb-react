import { BrowserRouter, Routes, Route } from 'react-router-dom'

import House from './components/House'
import Houses from './components/Houses'
import Listings from './components/Listings'
import Login  from './components/Login'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Houses />} />
                <Route path='/houses/:id' element={<House />} />
                <Route path='/listings' element={<Listings />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router