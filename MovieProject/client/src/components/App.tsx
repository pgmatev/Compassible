import "bulma"
import { MovieLibrary } from '../pages/MovieLibrary'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MovieService } from '../services/movie-service';
import { Header } from './Header';
import { LoginForm } from './auth/LoginForm';
import { PrivateOutlet } from './auth/PrivateOutlet';
import { Home } from './Home';
import { useEffect, useState } from 'react';
import { authService, User } from '../services/auth';
import { PublicOutlet } from './auth/PublicOutlet';
import { RegisterForm } from './auth/RegisterForm';
import { MoviePage } from '../pages/Movie';

const movieService = new MovieService();

function App() {

  const [user, setUser] = useState<User | null>(authService.getSavedUser());

  useEffect(() => {
    authService.setHandler(setUser);

    return () => {
      authService.setHandler(null);
    };
  }, []);


  return (
    <>
    <BrowserRouter>
      <Header user={user}/>
    <div className="container p-6">

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/" element={<PublicOutlet user={user} />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>

          <Route path="/" element={<PrivateOutlet user={user} />}>
            <Route path="/movies" element={<MovieLibrary />} />
            <Route path="/movies/:id" element={<MoviePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
    </BrowserRouter>
    </>
  )

}

export default App
