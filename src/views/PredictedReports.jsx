import { Link } from "react-router-dom"; // Import Link
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import PieChartComponent from "./charts/ChartComponent.js";
import BarChartForStatusComponent from "./charts/BarChartForStatus.js";
import CombinationChartComponent from "./charts/CombinationChartComponent.js";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Avatar } from "@mui/material";
const PredictedReports = () => {
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
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Predicted Reports</CardTitle>
              </CardHeader>
              <CardBody>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="All" value="All" />
                    <Tab label="Pending" value="Pending" />
                    <Tab label="Accepted" value="Accepted" />
                    {/* <Tab label="Rejected" value="Rejected" /> */}
                  </Tabs>
                  {/* <div>
                <h3>Content for {value} Tab</h3>
                <p>This is the content for the {value} tab.</p>
              </div> */}
                </Box>
                {value == "All" && (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Diagnosis</th>

                        <th>View</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports
                        .filter((report) => report.status != "decline")
                        .map((report) => (
                          <tr key={report.id}>
                            {/* <td style={{ width: 30 }}>{report.image_url}</td> */}
                            <td>
                              <Avatar
                                alt="Patient Thumbnail"
                                src={report.image_url}
                              />
                            </td>
                            <td>{report.date}</td>
                            <td>{report.type}</td>
                            <td>
                              {/* <Link
                              to={`/admin/predictedReportDetails/${report.id}`}
                            >
                              View
                            </Link> */}
                              {report.status == "pending" && (
                                <Link
                                  to={`/admin/predictedReportDetails/${report.id}`}
                                >
                                  Proceed
                                </Link>
                              )}
                              {report.status == "accept" && (
                                <Link
                                  to={`/admin/individualreport/${report.id}`}
                                >
                                  View Report
                                </Link>
                              )}
                            </td>
                            <td>{report.status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}

                {value == "Pending" && (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Diagnosis</th>

                        <th>View</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports
                        .filter((report) => report.status === "pending")
                        .map((report) => (
                          <tr key={report.id}>
                            {/* <td style={{ width: 30 }}>{report.image_url}</td> */}
                            <td>
                              <Avatar
                                alt="Patient Thumbnail"
                                src={report.image_url}
                              />
                            </td>
                            <td>{report.date}</td>
                            <td>{report.type}</td>
                            <td>
                              <Link
                                to={`/admin/predictedReportDetails/${report.id}`}
                              >
                                Proceed
                              </Link>
                            </td>
                            <td>{report.status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
                {value == "Accepted" && (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Diagnosis</th>

                        <th>View</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports
                        .filter((report) => report.status === "accept")
                        .map((report) => (
                          <tr key={report.id}>
                            {/* <td style={{ width: 30 }}>{report.image_url}</td> */}
                            <td>
                              <Avatar
                                alt="Patient Thumbnail"
                                src={report.image_url}
                              />
                            </td>
                            <td>{report.date}</td>
                            <td>{report.type}</td>
                            <td>
                              <Link to={`/admin/individualreport/${report.id}`}>
                                View Report
                              </Link>
                            </td>
                            <td>{report.status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
                {
                  // value == "Rejected" && (
                  //   <Table responsive>
                  //     <thead className="text-primary">
                  //       <tr>
                  //         <th>Image</th>
                  //         <th>Date</th>
                  //         <th>Diagnosis</th>
                  //         <th>View</th>
                  //         <th>Status</th>
                  //       </tr>
                  //     </thead>
                  //     <tbody>
                  //       {filteredReports
                  //         .filter((report) => report.status === "decline")
                  //         .map((report) => (
                  //           <tr key={report.id}>
                  //             {/* <td style={{ width: 30 }}>{report.image_url}</td> */}
                  //             <td>
                  //               <Avatar
                  //                 alt="Patient Thumbnail"
                  //                 src={report.image_url}
                  //               />
                  //             </td>
                  //             <td>{report.date}</td>
                  //             <td>{report.type}</td>
                  //             <td>
                  //               <Link
                  //                 to={`/admin/predictedReportDetails/${report.id}`}
                  //               >
                  //                 View
                  //               </Link>
                  //             </td>
                  //             <td>{report.status}</td>
                  //           </tr>
                  //         ))}
                  //     </tbody>
                  //   </Table>
                  // )
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <div style={{ height: "500px", width: "500px" }}>
              <h1>Object Type Distribution</h1>
              <PieChartComponent data={reports} />
            </div>
          </Col>

          <Col>
            <div style={{ height: "500px", width: "500px" }}>
              <h1>Object Type Distribution</h1>
              <BarChartForStatusComponent data={reports} />
            </div>
          </Col>

          <Col>
            <div style={{ height: "500px", width: "500px" }}>
              <h1>Object Type Distribution</h1>
              <CombinationChartComponent data={reports} />
            </div>
          </Col>
        </Row> */}
      </div>
    </>
  );
};

export default PredictedReports;
