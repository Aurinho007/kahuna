import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Controller from "../../controllers/Controller";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { BsFilter } from "react-icons/bs";
import { TiSortAlphabetically } from "react-icons/ti";
import { MdAttachMoney } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import "./index.css";
import { UserContext } from "../../contexts/UserContext";

interface FilterButtonProps {
    initialType: string
}

function FilterButton(props: FilterButtonProps) {
    const [type, setType] = useState<string>(props.initialType)
    const { setInvestimentsToShow } = useContext(UserContext);

    useEffect(() => {
        if(type !== "") {
            filterInvestiments();
            setType("");
        }
    }, [type]);


    function filterInvestiments() {
        Controller.filterInvestiments(type);
        
        if(setInvestimentsToShow)
            setInvestimentsToShow(Controller.getAllInvestiments())
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <BsFilter id="btn-filter" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setType('name')}>
                    <TiSortAlphabetically className="filter-icon alpha" />
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setType('price')}>
                    <MdAttachMoney className="filter-icon price" />
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setType('favorite')}>
                    <AiFillStar className="filter-icon favorite" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default FilterButton;
