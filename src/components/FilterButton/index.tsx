import * as React from "react";
import { useEffect, useState } from "react";
import Controller from "../../controllers/Controller";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { BsFilter } from "react-icons/bs";
import { TiSortAlphabetically } from "react-icons/ti";
import { MdAttachMoney } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import "./index.css";
import Investiment from "../../types/Investiment";

function FilterButton() {

    const [type, setType] = useState<string>('name')

    useEffect(() => {
        
      }, [type]);


    function gambi(type: string){

        Controller.filterInvestments(type)
    }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <BsFilter id="btn-filter" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setType('name')}>
          <TiSortAlphabetically className="filter-icon alpha"/>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setType('price')}>
          <MdAttachMoney className="filter-icon price"/>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setType('favorite')}>
          <AiFillStar className="filter-icon favorite"/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterButton;
