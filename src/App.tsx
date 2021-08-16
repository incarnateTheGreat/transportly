import { useMemo, useState } from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import routes from "routes/routes";
import SiteHeader from "components/SiteHeader/siteHeader.component";
import SiteFooter from "components/SiteFooter/siteFooter.component";
import {
  TransportlyContext,
  TransportlyContextValues,
} from "interfaces/interface";

// Initialize the History Browser History.
const history = createBrowserHistory();

// Initialize the Query Client.
const queryClient = new QueryClient();

const App: React.FC = (): JSX.Element => {
  const [flightOrderData, setFlightOrderData] = useState([]);

  const values: TransportlyContextValues = useMemo(
    () => ({
      flightOrderData,
      setFlightOrderData,
    }),
    [flightOrderData, setFlightOrderData]
  );

  return (
    <TransportlyContext.Provider value={values}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <SiteHeader />
          <section>
            <Router history={history}>
              <article>
                <Switch>
                  {routes.map((route, key) => {
                    return (
                      <Route
                        key={key}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                      />
                    );
                  })}
                </Switch>
              </article>
            </Router>
          </section>
          <SiteFooter />
        </div>
      </QueryClientProvider>
    </TransportlyContext.Provider>
  );
};

export default App;
