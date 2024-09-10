/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import PredictedReports from "views/PredictedReports";
import Prediction from "views/Prediction";
import PredictedReportDetails from "views/PredictedReportDetails";
import PatientDetailsForReport from "views/Subcomponents/PatientDetailsForReport";
import IndividualReport from "views/IndividualReport";
import DataAnalysis from "views/DataAnalysis";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/prediction",
    name: "Prediction",
    icon: "nc-icon nc-vector",
    component: <Prediction />,
    layout: "/admin",
  },

  {
    path: "/PredictedReports",
    name: "Predicted Reports",
    icon: "nc-icon nc-single-copy-04",
    component: <PredictedReports />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Patient Management",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Data Analysis",
    icon: "nc-icon nc-chart-pie-36",
    component: <DataAnalysis />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <Typography />,
    layout: "/admin",
  },
  {
    path: "/predictedReportDetails/:id",
    name: "Predicted reports details",
    icon: "nc-icon nc-caps-small",
    component: <PredictedReportDetails/>,
    layout: "/admin",
  },

  {
    path: "/individualreport/:id",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <IndividualReport/>,
    layout: "/admin",
  },
  {
    path: "/patientDetailsForReport",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <PatientDetailsForReport/>,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },

];
export default routes;
