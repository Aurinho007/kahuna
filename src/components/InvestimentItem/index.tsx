import * as React from "react";
import { useState } from "react";
import CardBody from "../CardBody";
import { Accordion } from "react-bootstrap";
import Investiment from "../../types/Investiment";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { dateToLiteralDate } from "../../helpers/DateHelper";
import './index.css'

function InvestimentItem(props: Investiment) {
  const [favorite, setFavorite] = useState<boolean>(false);

  return (  
    <Accordion.Item eventKey={props.ticker}>
      <Accordion.Header className="closed-card">
        {
        favorite ? 
          <AiFillStar
            title="Favoritar moeda"
            className="btn-fav"
            onClick={() => setFavorite(!favorite)}
          />
          : 
          <AiOutlineStar
            title="Favoritar moeda"
            className="btn-fav"
            onClick={() => setFavorite(!favorite)}
          />
        }
        <div className="coin-description">
          <p className="coin-ticker">{props.ticker}</p>
          <p className="coin-name">{props.name}</p>
        </div>

        <div className="coin-date">
          <p>{dateToLiteralDate(new Date(props.purchaseDate))}</p>
        </div>

      </Accordion.Header>
      <Accordion.Body className="openned-card">
        <CardBody {...props}/>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default InvestimentItem;
