import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import Home from "@/pages/Home";
import Historia from "@/pages/Historia";
import Seletores from "@/pages/Seletores";
import Cascade from "@/pages/Cascade";
import BoxModel from "@/pages/BoxModel";
import Units from "@/pages/Units";
import Flexbox from "@/pages/Flexbox";
import Grid from "@/pages/Grid";
import Positioning from "@/pages/Positioning";
import Responsive from "@/pages/Responsive";
import Colors from "@/pages/Colors";
import Typography from "@/pages/Typography";
import Animations from "@/pages/Animations";
import CustomProperties from "@/pages/CustomProperties";
import Nesting from "@/pages/Nesting";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location] = useHashLocation();
  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/historia" component={Historia} />
        <Route path="/seletores" component={Seletores} />
        <Route path="/cascade" component={Cascade} />
        <Route path="/box-model" component={BoxModel} />
        <Route path="/units" component={Units} />
        <Route path="/flexbox" component={Flexbox} />
        <Route path="/grid" component={Grid} />
        <Route path="/positioning" component={Positioning} />
        <Route path="/responsive" component={Responsive} />
        <Route path="/colors" component={Colors} />
        <Route path="/typography" component={Typography} />
        <Route path="/animations" component={Animations} />
        <Route path="/custom-properties" component={CustomProperties} />
        <Route path="/nesting" component={Nesting} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
