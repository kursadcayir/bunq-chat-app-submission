import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Login from './pages/login/Login';
import Main from './pages/main/Main';
import GuardedRoute from './components/guardedRoute/GuardedRoute';

const ProtectedRoutes = () => {
  return (
    <GuardedRoute>
      <Outlet />
    </GuardedRoute>
  )
}

//TODO Guarded Route for chat and chatlist
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/' element={<ProtectedRoutes />}>
          <Route exact path="/main" element={<Main />} />
          {/* <Route exact path="/chat" element={<Chat />} /> */}
          {/* <Route exact path="/conversationlist" element={<ConversationList />} /> */}
        </Route>
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
