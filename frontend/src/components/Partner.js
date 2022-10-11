import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Partner(props) {
  const { partner } = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/partners')
      .then(res => partners)
  })

  return (
    <Card>
      <div className="partner-info">
        <Card.Body>
          <Card.Title>{partner.payer}</Card.Title>
          <Card.Text>{partner.points} points</Card.Text>
          <Link to={`/partner/${partner.timestamp}`}>
            <div>
              <input type="number" min="0"/>
              <Button>
                Add Points
              </Button>
            </div>
            {partner.pointAmount === 0 ? (
              <Button variant="light" disabled>
                No points!
              </Button>
            ) : (
              <div>
                <input type="number" min="0"/>
                <Button>
                  Use Points
                </Button>
              </div>
            )}
          </Link>
        </Card.Body>
      </div>
    </Card>
  );
}

export default Partner;
