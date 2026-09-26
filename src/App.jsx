import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import Guided from '@/pages/Guided';
import GuidedPause from '@/pages/GuidedPause';
import Tools from '@/pages/Tools';
import Book from '@/pages/Book';
import ToolPage from '@/pages/ToolPage';
import ThoughtMeeting from '@/pages/ThoughtMeeting';
import ThoughtDocument from '@/pages/ThoughtDocument';
import ThoughtAct from '@/pages/ThoughtAct';
import ThoughtRelease from '@/pages/ThoughtRelease';
import ThoughtUnclear from '@/pages/ThoughtUnclear';
import FatigueFlow from '@/pages/FatigueFlow';
import MemoryFlow from '@/pages/MemoryFlow';
import Safety from '@/pages/Safety';
import Commits from '@/pages/Commits';
import WriteGuide from '@/pages/WriteGuide';
import SavedMoments from '@/pages/SavedMoments';
import CreditLine from '@/components/CreditLine';
import RealVisitTracker from '@/components/RealVisitTracker';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route path="/" element={<Home />} />
      <Route path="/guided" element={<Guided />} />
      <Route path="/guided/pause" element={<GuidedPause />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/book" element={<Book />} />
      <Route path="/tool/:toolId" element={<ToolPage />} />
      <Route path="/thought" element={<ThoughtMeeting />} />
      <Route path="/thought/document" element={<ThoughtDocument />} />
      <Route path="/thought/act" element={<ThoughtAct />} />
      <Route path="/thought/release" element={<ThoughtRelease />} />
      <Route path="/thought/unclear" element={<ThoughtUnclear />} />
      <Route path="/flow/fatigue" element={<FatigueFlow />} />
      <Route path="/flow/memory" element={<MemoryFlow />} />
      <Route path="/safety" element={<Safety />} />
      <Route path="/commits" element={<Commits />} />
      <Route path="/write" element={<WriteGuide />} />
      <Route path="/saved" element={<SavedMoments />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


// Pages that render the credit inside their own single-screen layout.
const OWN_CREDIT_ROUTES = ["/guided/pause"];

function GlobalCreditLine() {
  const { pathname } = useLocation();
  if (OWN_CREDIT_ROUTES.includes(pathname)) return null;
  return <CreditLine className="pb-28 pt-2" />;
}

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <RealVisitTracker />
          <AuthenticatedApp />
          <GlobalCreditLine />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App