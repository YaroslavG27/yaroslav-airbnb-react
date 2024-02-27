import { BrowserRouter, Routes, Route } from 'react-router-dom'

import House from './components/House'
import Houses from './components/Houses'
import HouseEdit from './components/HouseEdit'
import Listings from './components/Listings'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Houses />} />
                <Route path='/houses/:id/edit' element={<HouseEdit />} />
                <Route path='/houses/:id' element={<House />} />
                <Route path='/listings' element={<Listings />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router