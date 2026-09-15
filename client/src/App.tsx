import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import Legal from "./pages/Legal";

function Router() {
  return (
    <Switch>
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/privacy" component={() => <Legal type="privacy" />} />
      <Route path="/terms" component={() => <Legal type="terms" />} />
      <Route path="/cookies" component={() => <Legal type="cookies" />} />
      <Route path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 650); return () => window.clearTimeout(timer); }, []);
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {loading && <div className="site-loader" role="status" aria-label="جارٍ تحميل الموقع"><div className="loader-mark">⌂</div><div className="loader-ring" /><p>المجموعة المثالية</p><span>نجهّز لك تجربة مثالية</span></div>}
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
