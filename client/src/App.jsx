import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  About,
  ApplicationHistory,
  AuthPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
  ViewApplication,
} from "./pages";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";

function Layout({ user }) {
  const location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main>
      <Navbar />
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route
            path="/"
            element={<Navigate to="find-jobs" replace={true} />}
          />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/company" element={<Companies />} />
          <Route path="/view-application/:id" element={<ViewApplication />} />

          {user?.accountType === ACCOUNT_TYPE.SEEKER ? (
            <Route path="/user-profile" element={<UserProfile />} />
          ) : (
            <Route path="/user-profile/:id" element={<UserProfile />} />
          )}

          <Route path="/apply-history" element={<ApplicationHistory />} />

          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />
        </Route>
        <Route path="/about-us" element={<About />} />
        <Route path="/user-auth" element={<AuthPage />} />
      </Routes>
      {user && <Footer />}
    </main>
  );
}

export default App;
