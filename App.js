import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './component/Style/Home.css';

import AddHotelForm from 'component/Admin/Hotel';
import AddRoomForm from 'component/Admin/Room';
import HotelList from 'component/Admin/HotelList';
import RoomList from 'component/Admin/RoomList';
import HomePage from 'component/Web';
import LoginPage from 'component/Web/Login';
import MasterLayout from 'MaterLayout/MaterLayout';
import Register from 'component/Web/Register';
import RoomPage from 'component/Web/Rooms';
import HousePage from 'component/Web/House';
import BookedPage from 'component/Web/Booked';
import ContactPage from 'component/Web/Contact';
import RoomDetail from 'component/Web/RoomsDetail';
import MasterLayoutAdmin from 'MaterLayout/MaterLayoutAdmin';
import UpdateHotelForm from 'component/Admin/EditHotel';
import UpdateRoomForm from 'component/Admin/EditRoom';
import AboutPage from 'component/Web/About';
import CustomerPage from 'component/Admin/CustomerList';

function App() {
  return (
    <Router>
          <Routes>

            
            <Route path="/register" element={<Register />} />
            {/* Page Routes */}
            <Route path="*" element={<MasterLayout>
              <Routes>
                  {/* Add pages here which will be wrapped in the master layout */}
                  <Route path="/" element={<HomePage />} /> 
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/rooms" element={<RoomPage />} />
                  <Route path="/houses" element={<HousePage />} />
                  <Route path="/booked/:id" element={<BookedPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/rooms/:id" element={<RoomDetail />} />
                  <Route path="/login" element={<LoginPage />} />
                  {/* Add other routes within the layout */}
                </Routes>
            </MasterLayout>} />
              
            {/* Admin Routes */}
            <Route path="/admin" element={< MasterLayoutAdmin />} >
              <Route index element={<BookedPage />} />
              <Route path="/admin/add_hotel" element={<AddHotelForm />} />
              <Route path="/admin/add_rooms" element={<AddRoomForm />} />
              <Route path="/admin/hotel_list" element={<HotelList />} />
              <Route path="/admin/rooms_list" element={<RoomList />} />
              <Route path="/admin/hotel_list/:id" element={<UpdateHotelForm />} />
              <Route path="/admin/rooms_list/:id" element={<UpdateRoomForm />} />
              <Route path="/admin/customer" element={<CustomerPage />} />
            </Route>
            
            
          
          </Routes>
    </Router>
  );
}

export default App;
