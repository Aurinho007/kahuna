import * as React from "react";
import { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import './index.css'

function Investiment() {
  const [favorite, setFavorite] = useState<boolean>(false);

  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header className="closed-card">
        {
        favorite ? 

          <AiOutlineStar
            className="btn-fav"
            onClick={() => setFavorite(!favorite)}
          />
         : 
          <AiFillStar
            className="btn-fav"
            onClick={() => setFavorite(!favorite)}
          />
        }
        <p className="coin-name">
         BTC
        </p>
      </Accordion.Header>
      <Accordion.Body className="openned-card"></Accordion.Body>
    </Accordion.Item>
  );
}

export default Investiment;
