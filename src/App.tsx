import { useMemo, useState } from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import routes from "routes/routes";
import SiteHeader from "components/SiteHeader/siteHeader.component";
import SiteFooter from "components/SiteFooter/siteFooter.component";
import {
  FlightData,
  TransportlyContext,
  TransportlyContextValues,
} from "interfaces/interface";

// Initialize the History Browser History.
const history = createBrowserHistory();

// Initialize the Query Client.
const queryClient = new QueryClient();

const App: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flightOrderData, setFlightOrderData] = useState([]);
  const [combinedFlightOrderData, setCombinedFlightOrderData] = useState<
    FlightData[] | null
  >(null);

  const values: TransportlyContextValues = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      flightOrderData,
      setFlightOrderData,
      combinedFlightOrderData,
      setCombinedFlightOrderData,
    }),
    [
      isLoading,
      setIsLoading,
      flightOrderData,
      setFlightOrderData,
      combinedFlightOrderData,
      setCombinedFlightOrderData,
    ]
  );

  return (
    <TransportlyContext.Provider value={values}>
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <div className="App">
            <SiteHeader />
            <section>
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
            </section>
            <SiteFooter />
          </div>
        </Router>
      </QueryClientProvider>
    </TransportlyContext.Provider>
  );
};

export default App;
