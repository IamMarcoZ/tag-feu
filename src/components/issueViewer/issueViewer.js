import { useEffect, useState } from "react";
import './issueViewer.css'

const IssueViewer = ({env, releaseNumber, issues}) => {

    let processedList;
    //inizializzazione lista issues

    let [issueRenderList, setIssueRenderList] = useState(<h3>nessun risultato</h3>)

    

    useEffect(()=>{
        
        if(issues && issues[env]){
            console.log("collaudo issues:", issues[env][releaseNumber.replace('.','_')][0].issues);
            console.log("collaudo issues:", JSON.stringify(issues[env][releaseNumber.replace('.','_')][0].issues));
            processedList = issues[env][releaseNumber.replace('.','_')][0].issues.map(
                (issueItem) => {
                   return <li key={issueItem.issueNum}>{issueItem.issueNum} - {issueItem.pod}</li>
                })
            console.log("processed list")
            console.log(processedList);
            setIssueRenderList(processedList)
        }
    },[issues])





    return (
        <div className="issue-list-container">
            <h1><b>Lista anomalie risolte in {env} per release/{releaseNumber}</b></h1>
            <ul>
                {issueRenderList}
            </ul>            
        </div>
    )

}

export default IssueViewer;