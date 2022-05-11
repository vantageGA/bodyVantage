import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeView from './views/HomeView/HomeView';
import ContactFormView from './views/contactFormView/ContactFormView';
import LoginFormView from './views/loginFormView/LoginFormView';
import ErrorView from './views/errorView/ErrorView';
import RegistrationView from './views/registrationView/RegistrationView';
import FullProfileView from './views/fullProfile/FullProfileView';
import UserProfileEditView from './views/userProfileEditView/UserProfileEditView';
import ProfileEditView from './views/profileEditView/ProfileEditView';
import AdminUserView from './views/adminUserView/AdminUserView';
import AdminProfileView from './views/adminProfileView/AdminProfileView';
import AdminReviewersView from './views/adminReviewersView/AdminReviewersView';
import ReviewerLoginView from './views/reviewerLoginView/ReviewerLoginView';
import ReviewerRegisterView from './views/reviewerRegisterView/ReviewerRegisterView';
import CookiesView from './views/cookiesView/CookiesView';
import PrivacyView from './views/privacyView/PrivacyView';
import Cookies from './components/cookies/Cookies';
import AboutView from './views/aboutView/AboutView';
import FaqsView from './views/faqsView/FaqsView';

// Change the display width by removing the --fluid after the container class
const App = () => {
  return (
    <Router>
      <div className="container--fluid">
        <Header />
        <div className="content-wrapper">
          <Cookies />
          <Routes>
            <Route path="/" element={<HomeView />} exact />

            <Route
              path="/user-profile-edit"
              element={<UserProfileEditView />}
              exact
            />
            <Route path="/profile-edit" element={<ProfileEditView />} exact />
            <Route
              path="/fullProfile/:id"
              element={<FullProfileView />}
              exact
            />
            <Route path="/contact" element={<ContactFormView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/faq" element={<FaqsView />} />
            <Route path="/cookies" element={<CookiesView />} />
            <Route path="/privacy" element={<PrivacyView />} />
            <Route path="/login" element={<LoginFormView />} />
            <Route path="/registration" element={<RegistrationView />} />

            <Route path="/admin-users" element={<AdminUserView />} />
            <Route path="/admin-profiles" element={<AdminProfileView />} />
            <Route path="/admin-reviewers" element={<AdminReviewersView />} />
            <Route path="/reviewer-login" element={<ReviewerLoginView />} />
            <Route
              path="/reviewer-register"
              element={<ReviewerRegisterView />}
            />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
