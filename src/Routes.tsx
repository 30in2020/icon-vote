import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { Header, Footer } from "./components";
import { MainPage, PRepDetailPage } from "./pages";
import EditProposalPage from "./pages/EditProposalPage";
import ProposalDetailPage from "./pages/ProposalDetailPage";

function Routes() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/proposals/:pRepId">
            <PRepDetailPage />
          </Route>
          <PrivateRoute exact path="/proposal/:pRepId/edit">
            <EditProposalPage />
          </PrivateRoute>
          <Route exact path="/proposal/:pRepId/:proposalId">
            <ProposalDetailPage
              options={[
                {
                  name: "Dapp.com",
                  percent: 10,
                },
                {
                  name: "State of the DApps",
                  percent: 70,
                },
                {
                  name: "DApp.Review",
                  percent: 5,
                },
                {
                  name: "DAppRadar",
                  percent: 20,
                },
              ]}
            />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

function PrivateRoute({
  children,
  ...rest
}: RouteProps & { children: React.ReactNode }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Routes;
