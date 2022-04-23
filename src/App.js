import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import persistedReducer from './reducers/persistConfig';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './pages/Home';
import Register from './pages/Register';
import Movies from './pages/Movies';
import Tvs from './pages/Tvs';
import WatchMovie from './pages/WatchMovie';
import WatchTV from './pages/WatchTv';
import PrivateRoute from './auth/PrivateRoute';
import persistStore from 'redux-persist/es/persistStore';

const store = createStore(persistedReducer);
const persistor = persistStore(store);

function App() {

  return (

    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <BrowserRouter>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='movies' element={<PrivateRoute> <Movies /> </PrivateRoute>} />
            <Route path='tvs' element={<PrivateRoute> <Tvs /> </PrivateRoute>} />
            <Route path='watch/movies/:id' element={<PrivateRoute> <WatchMovie /> </PrivateRoute>}/>
            <Route path='watch/tvs/:id' element={<PrivateRoute> <WatchTV /> </PrivateRoute>}/>
          </Routes>

        </BrowserRouter>

      </PersistGate>

    </Provider>

  );
}

export default App;
