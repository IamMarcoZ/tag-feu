import { useState } from "react";
import { PODLIST } from "../../utils/CONSTANTS";

const AddIssueRow = (onAggiungiClbk) =>{


    const [issueNumber, setIssueNumber] = useState();
    const [pod, setPod] = useState('');


    function onClickAddggiungi(){
        alert("aggiunta issue "+issueNumber+" su "+ pod);
        onAggiungiClbk(issueNumber, pod)
    }

    function onIssueChange(evt){
        if(/d/.test(evt.target.value)){
            setIssueNumber(evt.target.value);
        }
    }

    function onPodChange(evt){
        setPod(evt.target.value);
    }

    return (
        <div className="row">
            <div className="col-3">
                <label id="issue-number-label">numero defect</label>
                <input id="issue-number" className="form-control" type="text" placeholder="numero defect"
                onChange={onIssueChange} value={issueNumber}></input>
            </div>
            <div className="col-6">
                <label id="pod-label">pod</label>
                <select className="form-select" onChange={onPodChange} value={pod}>
                    <option key="0" defaultValue>Seleziona</option>
                    {PODLIST.sort().map((item, index) => {
                        return (
                            <>
                                <option key={index+1} value={item}>{item}</option>
                            </>
                        );
                    })}
                </select>
            </div>
            <div className="col-3">
                <button type="button" onClick={() => onClickAddggiungi()} className="btn btn-success mt-3">Aggiungi</button>
            </div>
        </div>
    )

}

export default AddIssueRow;