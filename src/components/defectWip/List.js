import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import "./defectWip.css";
import { FcApproval } from "react-icons/fc";
import { FcVlc } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
const List = ({ list, setListCb }) => {

    function onClickBadge(defect,value,index){
        switch(defect.state){
            case "wip": setListCb(value,index);
                break;
            case "risolto": setListCb(value,index);
                break;
            case "rigettato": setListCb(value,index);
                break;
        }        
    }

    return (
        <div className='container'>
            {list.map((defect, index) => (
                <ListGroup key={index} as="ol" numbered={false} >
                    <ListGroup.Item
                        as="li"
                    >
                        <div className="row">
                            <div className="col-5 fw-bold">{defect.pod}</div>
                            <div className='col-2'>{defect.defectNumber}</div>
                            <div className='col-2'>{defect.owners.map((own, index) => (
                                <Badge className='border-round' key={index} bg="danger" pill>
                                    {own.name}
                                </Badge>
                            ))}</div>
                            <div className='col-3'>
                                {defect.state == 'wip' &&
                                    <button className='border-round' type='button' onClick={()=>onClickBadge(defect,'risolto',index)}>
                                        <FcVlc />
                                    </button>
                                }
                                {defect.state == 'risolto' &&
                                    <button className='border-round' type='button' onClick={()=>onClickBadge(defect,'rigettato',index)}>
                                        <FcApproval />
                                    </button>
                                }
                                {defect.state == 'rigettato' &&
                                    <button className='border-round' onClick={()=>onClickBadge(defect,'wip',index)}>
                                        <FcCancel />
                                    </button>
                                }
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            ))}

        </div>
    )
}

export default List