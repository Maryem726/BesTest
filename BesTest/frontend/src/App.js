import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, {useEffect} from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";
import ParentLandingPage from "demos/ParentLandingPage";
import TeacherLandingPage from "demos/TeacherLandingPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

export default function App() {


  return (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/components/:type/:subtype/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/components/:type/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/thank-you">
          <ThankYouPage />
        </Route>
        <Route path="/ParentLandingPage">
          <ParentLandingPage />
        </Route>
        <Route path="/TeacherLandingPage">
          <TeacherLandingPage />
        </Route>
        <Route path="/">
          <MainLandingPage />
        </Route>
        
      </Switch>
    </Router>
    </Provider>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
