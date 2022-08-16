import * as React from "react";
import { useEffect, useState } from "react";
import CardBody from "../CardBody";
import { Accordion } from "react-bootstrap";
import Investiment from "../../types/Investiment";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { dateToLiteralDate } from "../../helpers/DateHelper";
import './index.css'
import Controller from "../../controllers/Controller";

function InvestimentItem(props: Investiment) {
	const [favorite, setFavorite] = useState<boolean>(props.favorite);

	useEffect(() => {
		const inv: Investiment = {
			id: props.id,
			amount: props.amount,
			purchasePrice: props.purchasePrice,
			purchaseDate: props.purchaseDate,
			favorite: favorite,
			ticker: props.ticker,
			name: props.name
		}

		Controller.updateInvestiment(inv);
	}, [favorite])

	return (
		<Accordion.Item eventKey={props.id.toString()}>
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
				<CardBody {...props} />
			</Accordion.Body>
		</Accordion.Item>
	);
}

export default InvestimentItem;
