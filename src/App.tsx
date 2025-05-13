
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import LessonDetail from "./pages/LessonDetail";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UserProgressProvider } from "./contexts/UserProgressContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <UserProgressProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/lessons/:lessonId" element={<LessonDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProgressProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
