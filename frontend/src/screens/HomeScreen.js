import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Partner from "../components/Partner";
import { Helmet } from "react-helmet-async";
// import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, partners: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, partners }, dispatch] = useReducer(logger(reducer), {
    partners: [],
    loading: true,
    error: "",
  });
  //   const [partners, setPartners] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/partners");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      //   setPartners(result.data);
    };
    fetchData();
  }, []);
  
  return (
    <div>
        <Helmet>
            <title>Fetch Rewards Exercise</title>
        </Helmet>
      <h2 className="description">List of Partners</h2>
      <div className="partners">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {partners.map((partner) => (
              <Col key={partner.timestamp} sm={6} md={4} lg={3} className="mb-3">
                <Partner partner={partner}></Partner>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
