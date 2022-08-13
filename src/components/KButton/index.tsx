import * as React from 'react';
import './index.css'

function KButton(props: any) {
    return <div className='kbutton'>
        <button className="btn" id={props.id} onClick={props.onClick}>{props.text}</button>
    </div>;
}

export default KButton;