import { BrowserRouter, Routes, Route } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import LinkTreeView from "./views/LinkTreeView"
import ProfileView from "./views/ProfileView"
import HandleView from "./views/HandleView"
import NotFoundView from "./views/NotFoundView"
import PublicLayout from "./layouts/PublicLayout"
import HomeView from "./views/HomeView"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        <Route path="/:handle" element={<PublicLayout />}>
          <Route index={true} element={<HandleView />} />
        </Route>

        <Route path="/404" element={<PublicLayout />}>
          <Route index={true} element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
