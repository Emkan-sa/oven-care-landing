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
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
