import { Link } from "react-router-dom"; // Import Link
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import PieChartComponent from "./charts/ChartComponent.js";
import BarChartForStatusComponent from "./charts/BarChartForStatus.js";
import CombinationChartComponent from "./charts/CombinationChartComponent.js";
import DoctorDiagnosisPieChart from "./charts/DoctorDiagnosisPieChart.js";

const DataAnalysis = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState("All");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "predictions"));
        console.log("awa");
        if (!querySnapshot.empty) {
          const reportData = [];
          querySnapshot.forEach((doc) => {
            const report = doc.data();
            reportData.push({
              id: doc.id,
              pationID: report.pationID,
              comment: report.comment,
              results: report.results,
              image_url: report.image_url,
              date: report.date,
              type: report.type,
              status: report.staus,
            });
          });

          setReports(reportData);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    const dateMatches =
      report.date && report.date.toString().includes(lowercaseSearchTerm);
    const commentMatches =
      report.comment &&
      report.comment.toLowerCase().includes(lowercaseSearchTerm);

    return dateMatches || commentMatches;
  });
  return (
    <>
      <div className="content">
        <Row>
          {/* <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Prediction Summary</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody>
                <Col>
                  <div>
                    <PieChartComponent data={reports} />
                  </div>
                </Col>
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col> */}

          <Col md="5">
            <Card className="">
              <CardHeader className="">
                <CardTitle tag="h5">Prediction Summary</CardTitle>
                <p className="card-category">Summery of all predictions</p>
              </CardHeader>
              <CardBody>
                <Col>
                  <div>
                    <DoctorDiagnosisPieChart data={reports} />
                  </div>
                </Col>
              </CardBody>
              <CardFooter>
                {/* <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div> */}
                {/* <hr /> */}
                {/* <div className="stats">
                  <i className="fa fa-calendar" />
                </div> */}
              </CardFooter>
            </Card>
          </Col>

          <Col md="">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Diagnosis report Summary</CardTitle>
                <p className="card-category">Summary of all report status</p>
              </CardHeader>
              <CardBody>
                <Col>
                  <div>
                    <BarChartForStatusComponent data={reports} />
                  </div>
                </Col>
              </CardBody>
              <CardFooter>
                {/* <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div> */}
                {/* <hr /> */}
                {/* <div className="stats">
                  <i className="fa fa-calendar" />
                </div> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DataAnalysis;
