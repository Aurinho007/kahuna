import * as React from "react";
import { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import CoinInterface from "../../types/CoinInterface";
import './index.css'

function Investiment({ ticker, name }: CoinInterface) {
  const [favorite, setFavorite] = useState<boolean>(false);

  return (
    <Accordion.Item eventKey={ticker}>
      <Accordion.Header className="closed-card">
        {
        favorite ? 
          <AiFillStar
            className="btn-fav"
            onClick={() => setFavorite(!favorite)}
          />
          : 
          <AiOutlineStar
            className="btn-fav"
            onClick={() => setFavorite(!favorite)}
          />
        }
        <div className="coin-description">
          <p className="coin-ticker">{ticker}</p>
          <p className="coin-name">{name}</p>
        </div>

      </Accordion.Header>
      <Accordion.Body className="openned-card"></Accordion.Body>
    </Accordion.Item>
  );
}

export default Investiment;
