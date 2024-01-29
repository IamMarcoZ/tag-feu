
import './issues.css'
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import collectionRef from "../../firebase/issuesCollection";
import AddIssueRow from "../addIssueRow/addIssueRow";
import IssueViewer from '../issueViewer/issueViewer';

const Issues = () => {

    const env = "collaudo";
    const releaseNumber = "24.03"
    
    const [issues, setIssues] = useState({});
    const [docId, setDocId] = useState();
    const [textareaVisible, setTextAreaVisible] = useState(false);
    const [textareaValue, setTextAreaValue] = useState("");

    useEffect(()=>{
        getIssues();        
    }, [])

    function getIssues(callback){
        getDocs(collectionRef).then(
            (response) =>{
                manageIssueList(response.docs, callback)
            }).catch(
                (error) => {
                    console.log(error.message);
            })        
    }

    function manageIssueList(docs, callback){
        let docTmp;
        docs.forEach(docElement => {
            console.log(docElement.data());
            setDocId( docElement.id);
            docTmp = docElement.data();
            if(docTmp[env]){
                setIssues(docTmp);
            }
        });
        if(typeof callback === "function"){
            callback(issues);
        }
    }

    function onClickAggiorna(){
        getIssues();
    }

    function onClickFormatta(){
        let mergedIssueList = {}
        getIssues((issues)=>{
            issues[env][releaseNumber.replace('.','_')][0].issues.forEach(
                (issue)=>{
                    if(!mergedIssueList[issue.pod]){
                        mergedIssueList[issue.pod] = [];
                    }
                    mergedIssueList[issue.pod].push(issue.issueNum);
                }
            )
            console.log("merged list", JSON.stringify(mergedIssueList));
            //read merged list and write string
            let textAreaString = "";
            Object.keys(mergedIssueList).forEach(
                (key)=>{
                    textAreaString+=key+" ";
                    let i = 0;
                    mergedIssueList[key].forEach((issueItem)=>{
                        textAreaString = textAreaString+issueItem
                        if(i+1 < mergedIssueList[key].length){
                            textAreaString=textAreaString+"-";
                        }
                        else{
                            textAreaString=textAreaString+",\n"
                        }
                        i+=1;
                    });
                }
            )
            textAreaString = textAreaString.substring(0,textAreaString.length-2)

            
            setTextAreaVisible(true)
            setTextAreaValue(textAreaString);
        });
    }

    return (        
        <div id="issues-container" className="container">
            <h1><b>Inserimento Issues</b></h1>
            {docId && <AddIssueRow issues={issues} docId={docId}></AddIssueRow>}
            <IssueViewer env={env} releaseNumber={releaseNumber} issues={issues}></IssueViewer>
            <button className="btn btn-primary" onClick={onClickAggiorna}>Aggiorna</button>
            <button className="btn btn-secondary" onClick={onClickFormatta}>Formatta</button>

            {textareaVisible && <div className='col-12 mt-5'>
                <div className="form-group">
                    <textarea rows="10" cols="50" type="text"
                     value={textareaValue}></textarea>
                </div>               
            </div>}
        </div>
    )
}

export default Issues