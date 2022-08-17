import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CardBody from "../CardBody";
import { Accordion } from "react-bootstrap";
import Investiment from "../../types/Investiment";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { dateToLiteralDate } from "../../helpers/Helper";
import './index.css'
import Controller from "../../controllers/Controller";

interface InvestimentItemProps {
	props: Investiment,
	setUpdateView: Dispatch<SetStateAction<number | undefined>>
}

function InvestimentItem(params: InvestimentItemProps) {
	const [favorite, setFavorite] = useState<boolean>(params.props.favorite);

	useEffect(() => {
		const inv: Investiment = {
			id: params.props.id,
			amount: params.props.amount,
			purchasePrice: params.props.purchasePrice,
			purchaseDate: params.props.purchaseDate,
			favorite: favorite,
			ticker: params.props.ticker,
			name: params.props.name
		}

		Controller.updateInvestiment(inv);
	}, [favorite])

	return (
		<Accordion.Item eventKey={params.props.id.toString()}>
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
					<p className="coin-ticker">{params.props.ticker}</p>
					<p className="coin-name">{params.props.name}</p>
				</div>

				<div className="coin-date">
					<p>{dateToLiteralDate(new Date(params.props.purchaseDate))}</p>
				</div>

			</Accordion.Header>
			<Accordion.Body className="openned-card">
				<CardBody props={params.props} setUpdateView={params.setUpdateView} />
			</Accordion.Body>
		</Accordion.Item>
	);
}

export default InvestimentItem;
