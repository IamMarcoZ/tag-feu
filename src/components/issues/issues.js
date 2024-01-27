import { useState } from "react";
import { PODLIST, HELM_PODS, OCP_PODS } from "../../utils/CONSTANTS";
import './issues.css'
import AddIssueRow from "../addIssueRow/addIssueRow";

const Issues = () => {

    const aggiungiIssue =(issueNumber, pod) =>{
        //aggiunge la issue su database
    }

    return (        
        <div id="issues-container" className="container">
            <h1><b>Inserimento Issues</b></h1>

            <AddIssueRow onAggiungCallback={aggiungiIssue}></AddIssueRow>
        </div>
    )
}

export default Issues