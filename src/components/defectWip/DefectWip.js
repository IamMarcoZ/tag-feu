import React, { useState, useEffect } from 'react'
import { PODLIST, HELM_PODS, OCP_PODS, OWNERS } from "../../utils/CONSTANTS";
import List from './List';
import Badge from 'react-bootstrap/Badge';
import "./defectWip.css"

const DefectWip = () => {
    const [defectList, setDefectList] = useState([]);
    const [owners, setOwners] = useState(OWNERS);
    const [defect, setDefect] = useState({
        pod: "",
        owners: [],
        defectNumber: "",
        state: "wip",
    });

    function handleChange(field, value) {
        setDefect(prevState => ({
            ...prevState,
            [field]: value,
        }));
    }

    function onClickBadge(name) {
        var list = [...owners];
        list.map((item) => {
            if (item.name == name) {
                item.selected = !item.selected;
            }
        })
        setOwners(list);
        var ownersSelected = owners.filter((owner) => {
            if (owner.selected) {
                return owner.name
            }
        })
        setDefect(prevState => ({ ...prevState, owners: ownersSelected }))
    }

    function handleDefectList(value,index){
        setDefectList(prevDefectList => {
            const defectListTmp = [...prevDefectList];
            defectListTmp[index] = { ...defectListTmp[index], state: value };
            return defectListTmp;
        });
    }

    function addToList() {
        var list = [...defectList];
        list.push(defect);
        setDefectList(list);
    }

    function addBtnDisabled(){
        var enabled = true;
        enabled = enabled && defect.pod.length > 0 && defect.defectNumber.length > 0 && defect.owners.length > 0;
        return enabled;
    }

    return (
        <div className='container' style={{ backgroundColor: "gray" }}>
            <form className='row mt-5 mb-5'>
                <div className='col-6'>
                    <div className="form-group text-center">
                        <label className='text-uppercase'>issue</label>
                        <input type="text" className="form-control" onChange={(e) => handleChange('defectNumber', e.target.value)} value={defect.issues} placeholder="Nel caso di più defect sullo stesso pod, utilizzare - come separatore" />
                    </div>
                    <div className="form-group text-center">
                        <label className='text-uppercase'>owners</label>
                        <div>
                            {owners.map((owner, index) => (
                                <button className="badge-button" type='button' onClick={() => onClickBadge(owner.name)}>
                                    <Badge bg={`${owner.selected ? 'danger' : 'primary'} border-round`} key={index}>{owner.name}</Badge>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="form-group text-center">
                        <label className='text-uppercase'>Pod</label>
                        <select className="form-select" onChange={(e) => handleChange('pod', e.target.value)} value={defect.pod} aria-label="Default select example">
                            <option defaultValue>Seleziona</option>
                            {PODLIST.sort().map((item, index) => {
                                return (
                                    <>
                                        <option key={index} value={item}>{item}</option>
                                    </>
                                );
                            })}
                        </select>
                    </div>
                    <button className='btn btn-primary mt-3' disabled={!addBtnDisabled()} type='button' onClick={addToList}>+</button>
                </div>
            </form>
            <div>
                {defectList.length > 0 &&
                    <List list={defectList} setListCb={handleDefectList} />
                }
            </div>
        </div>
    )
}

export default DefectWip