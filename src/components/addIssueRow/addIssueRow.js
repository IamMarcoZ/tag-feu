import { useEffect, useState } from "react";
import { PODLIST } from "../../utils/CONSTANTS";
import { doc, updateDoc } from "firebase/firestore";
import fireDb from "../../firebase/connector";


const AddIssueRow = ({issues, docId}) =>{

    const [docRef, setDocRef] = useState();
    const [issueNumber, setIssueNumber] = useState();
    const [pod, setPod] = useState('');

    useEffect(()=>{
        if(docId){
            setDocRef(doc(fireDb, 'feu-releases',docId));
        }        
    },[docId])

    function onClickAddggiungi(e){
        e.preventDefault();
        alert("aggiunta issue "+issueNumber+" su "+ pod);
        if(docId){
            let newArray = [...issues.collaudo["24_03"][0].issues, {issueNum:issueNumber, pod:pod}]
            updateDoc(docRef, {'collaudo.24_03.0.issues' : newArray},docId ).then(
                (response) => {alert("issue aggiunta correttamente! aggiorna la lista")}
            )
        }
    }

    function onIssueChange(evt){
        var value = evt.target.value;
        value = value.replace(/[^0-9]/g, "");
        setIssueNumber(value);
        
    }

    function onPodChange(evt){
        setPod(prevState => ({...prevState + evt.target.value}));
    }

    function isAggiungiDisabled(){
        let disabled = false;
        if(!pod || !issueNumber){
            disabled = true;
        }
        return disabled
    }

    return (
        <form onSubmit={onClickAddggiungi}>
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
                    <button type="submit" disabled={isAggiungiDisabled()} className="btn btn-success mt-3">Aggiungi</button>
                </div>            
            </div>
        </form>
    )

}

export default AddIssueRow;