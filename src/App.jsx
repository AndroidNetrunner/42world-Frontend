import * as React from 'react';
import { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  MainPage,
  ProfilePage,
  LikedArticlePage,
  AuthPage,
  SettingPage,
  MyArticlePage,
  MyCommentPage,
  CategoryPage,
  ArticlePage,
  CreateArticlePage,
  LoginPage,
  AlarmPage,
} from './Pages';
import { useContext } from 'react';
import UserService from './Network/UserService';

const ErrorPage = () => {
  return <>Error!</>;
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const initState = async () => {
      let response;
      try {
        response = await UserService.getUser();
      } catch (e) {
        console.log('app : ', e);
      }
      if (!response) setState(false);
      else setState(true);

      setIsLoading(false);
    };
    initState();
  }, []);

  return (
    <AuthContext.Provider value={{ state, isLoading, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);

  if (auth.isLoading) {
    return <p>loading</p>;
  } else {
    if (auth.state) return children;
    else return <Navigate to="/login" />;
  }
};
// 글 보기 : 모드view?글id=12 or view/글id
// 글 작성 : free?mode=write
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage isCallback={false} />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/auth/github/callback"
            element={<LoginPage isCallback={true} />}
          />
          <Route path="/alarm" element={<AlarmPage />} />

          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/category/:id/create" element={<CreateArticlePage />} />

          <Route path="/article/:id" element={<ArticlePage />} />

          {/* <Route path="/search" element={<MainPage />} /> */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/setting"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/liked-article"
            element={
              <PrivateRoute>
                <LikedArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/my-article"
            element={
              <PrivateRoute>
                <MyArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/my-comment"
            element={
              <PrivateRoute>
                <MyCommentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/auth"
            element={
              <PrivateRoute>
                <AuthPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <ErrorPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

// http://skyrich3.synology.me:9930/

// 42world.kr/
//  42world.kr/board
//    42world.kr/board/free
//    42world.kr/board/anony
//  42world.kr/profile

// const isLogin = () => {
//   const response = UserService.getUser();
//   if (response) return true;
//   return false;
// };
