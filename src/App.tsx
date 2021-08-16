import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SiteHeader from "components/SiteHeader/siteHeader.component";
import SiteFooter from "components/SiteFooter/siteFooter.component";

// Initialize the Query Client.
const queryClient = new QueryClient();

const App: React.FC = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <SiteHeader />
        <section>hello.</section>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
};

export default App;
