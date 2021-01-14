import React, { useEffect, useContext } from "react";
import {
  Route,
  Switch,
  Redirect,
  RouteProps,
  useLocation,
} from "react-router-dom";
import {
  HeaderContainer,
  Footer,
  SignPageWrapper,
  SignPageType,
  Loader,
} from "./components";
import {
  MainPage,
  AboutPage,
  PRepDetailPage,
  EditProposalPageContainer,
  LatestProposalPage,
  ProfilePage,
  ProposalDetailPageContainer,
} from "./pages";
import SWR from "./apis/swr";
import { UserContext } from "./contexts/UserContext";

const Routes: React.SFC = () => {
  const { user } = useContext(UserContext);
  const { data, revalidate } = SWR.useGetViewer();
  const location = useLocation();
  useEffect(() => {
    revalidate();
    window.scrollTo(0, 0);
  }, [location, revalidate]);

  if (!data) {
    return <Loader height={"100vh"} />;
  }

  const isLoggedIn = !!user.username;

  return (
    <>
      <HeaderContainer />
      <div>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route path="/latest-proposals" component={LatestProposalPage} />
          <Route exact path="/proposals/:username" component={PRepDetailPage} />
          <PrivateRoute exact path="/proposal/edit" isLoggedIn={isLoggedIn}>
            <EditProposalPageContainer />
          </PrivateRoute>
          <Route
            exact
            path="/proposal/:username/:proposalId"
            component={ProposalDetailPageContainer}
          />
          <Route exact path="/signin">
            <SignPageWrapper signPageType={SignPageType.SIGN_IN} />
          </Route>
          <Route exact path="/signup">
            <SignPageWrapper signPageType={SignPageType.SIGN_UP} />
          </Route>
          <PrivateRoute exact path="/verify" isLoggedIn={isLoggedIn}>
            <SignPageWrapper signPageType={SignPageType.VERIFY} />
          </PrivateRoute>
          <PrivateRoute exact path="/profile" isLoggedIn={isLoggedIn}>
            <ProfilePage />
          </PrivateRoute>
        </Switch>
      </div>
      <Footer />
    </>
  );
};

function PrivateRoute({
  isLoggedIn,
  children,
  ...rest
}: RouteProps & { isLoggedIn: boolean; children: React.ReactNode }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Routes;
