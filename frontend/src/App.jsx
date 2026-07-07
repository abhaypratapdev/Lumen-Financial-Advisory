import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BudgetPage } from './pages/BudgetPage.jsx'
import { ConsumerSupportPage } from './pages/ConsumerSupportPage.jsx'
import { ContactUsPage } from './pages/ContactUsPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { ITRModulePage } from './pages/ITRModulePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { ReportsPage } from './pages/ReportsPage.jsx'
import { TermsOfServicePage } from './pages/TermsOfServicePage.jsx'
import { Footer } from './footer.jsx'
import './styles/app.css'
import { useEffect } from "react";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/consumer-support" element={<ConsumerSupportPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/itr" element={<ITRModulePage />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  // useEffect(() => {
  //   fetch("https://financial-advisor-web-app.netlify.app")
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  // }, []);

  // return <h1>Check console</h1>;




  return (
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>
          <AppRoutes />
          <Footer />
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}




// export default function Home() {
//   useEffect(() => {
//     fetch("https://your-backend.netlify.app/.netlify/functions/api/data")
//       .then(res => res.json())
//       .then(data => console.log(data));
//   }, []);

//   return <h1>Check console</h1>;
// }


