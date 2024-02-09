
import './issues.css'
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import collectionRef from "../../firebase/issuesCollection";
import AddIssueRow from "../addIssueRow/addIssueRow";
import IssueViewer from '../issueViewer/issueViewer';
import { FaPaste } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { dateUtility } from '../../utils/dateUtils.js';
import { doc, updateDoc } from "firebase/firestore";
import fireDb from "../../firebase/connector";

const Issues = () => {

    const env = "collaudo";
    let docRef;
    const [releaseNumber, setReleaseNumber] = useState("24.03");
    const [issues, setIssues] = useState([]);
    const [docId, setDocId] = useState();
    const [textareaVisible, setTextAreaVisible] = useState(false);
    const [textareaValue, setTextAreaValue] = useState("");
    const [sessionOpened, setSessionOpened] = useState(false);
    const [documentData, setDocumentData] = useState({});


    /*useEffect(() => {
        getIssues();
    }, [])*/

    function getIssues(callback) {
        getDocs(collectionRef).then(
            (response) => {
                manageIssueList(response.docs, callback)
            }).catch(
                (error) => {
                    console.log(error.message);
                })
    }

    function manageIssueList(docs, callback) {
        let docTmp;
        docs.forEach(docElement => {
            setDocId(docElement.id);
            docRef = doc(fireDb, 'feu-releases', docElement.id);
            docTmp = docElement.data();
            setDocumentData(docTmp);
            let releaseNumber_ = releaseNumber.replace('.', '_');
            let releaseSessions = docTmp[env][releaseNumber_];
            if (releaseSessions) {
                //cerca le issues che hanno data odierna
                //setIssues(docTmp);
                let sessioneIdNum = dateUtility.getTodaySessionId();
                let filteredIssues = docTmp[env][releaseNumber_].filter(
                    (item) => { return item.sessioneId === sessioneIdNum; }
                );
                if (filteredIssues.length > 0) {
                    setIssues(filteredIssues[0].issues);
                }
                else {
                    addNewSession(releaseNumber_, releaseSessions);
                }
            }
            else {
                addNewSession(releaseNumber_);

            }
        });
        if (typeof callback === "function") {
            callback(issues);
        }
    }

    function addNewSession(releaseNumber_, releaseSessions) {
        let sessioneIdNum = dateUtility.getTodaySessionId();
        let releasePath = "collaudo." + releaseNumber_;
        if (releaseSessions && Array.isArray(releaseSessions)) {
            updateDoc(docRef, { [releasePath]: [...releaseSessions, { issues: [], sessioneId: sessioneIdNum }] }, docId).then(
                (response) => { toast.success("Sessione aggiunta correttamente! ") }
            )
        }
        else {
            updateDoc(docRef, { [releasePath]: [{ issues: [], sessioneId: sessioneIdNum }] }, docId).then(
                (response) => { toast.success("Sessione aggiunta correttamente! ") }
            )
        }
    }

    function onClickAggiorna() {
        getIssues();
    }

    function onClickFormatta() {
        let mergedIssueList = {}
        getIssues((issues) => {
            issues.forEach(
                (issue) => {
                    if (!mergedIssueList[issue.pod]) {
                        mergedIssueList[issue.pod] = [];
                    }
                    mergedIssueList[issue.pod].push(issue.issueNum);
                }
            )
            console.log("merged list", JSON.stringify(mergedIssueList));
            //read merged list and write string
            let textAreaString = "";
            Object.keys(mergedIssueList).forEach(
                (key) => {
                    textAreaString += key + " ";
                    let i = 0;
                    mergedIssueList[key].forEach((issueItem) => {
                        textAreaString = textAreaString + issueItem
                        if (i + 1 < mergedIssueList[key].length) {
                            textAreaString = textAreaString + "-";
                        }
                        else {
                            textAreaString = textAreaString + ",\n"
                        }
                        i += 1;
                    });
                }
            )
            textAreaString = textAreaString.substring(0, textAreaString.length - 2)


            setTextAreaVisible(true)
            setTextAreaValue(textAreaString);
        });
    }

    function onReleaseChange(evt) {
        setReleaseNumber(evt.target.value);
    }

    function onApriSessione(e) {
        e.preventDefault();
        getIssues(() => {
            setSessionOpened(true);
        })
    }

    function copyToClipBoard() {
        navigator.clipboard.writeText(textareaValue)
        toast.info('Issues nella text area copiate')
    }

    return (
        <div id="issues-container" className="container">
            <ToastContainer theme={'dark'}/>
            {!sessionOpened &&
                <div>
                    <input type='text' placeholder='release number' value={releaseNumber} onChange={onReleaseChange}></input>
                    <button className="btn btn-primary" onClick={onApriSessione}>Apri Una Sessione</button>
                </div>
            }
            {sessionOpened &&
                <span>
                    <h1><b>Inserimento Issues</b></h1>
                    {docId &&
                        <AddIssueRow env={env} releaseNumber={releaseNumber} issues={issues} docId={docId} document={documentData}></AddIssueRow>}
                    <IssueViewer env={env} releaseNumber={releaseNumber} issues={issues}></IssueViewer>
                    <button className="btn btn-primary" onClick={onClickAggiorna}>Aggiorna</button>
                    <button className="btn btn-secondary" onClick={onClickFormatta}>Formatta</button>

                    {textareaVisible &&
                        <div className='col-12 mt-5'>
                            <div className="form-group">
                                <div>
                                    <textarea id='textAreaIssues' rows="10" cols="50" type="text"
                                        value={textareaValue} readOnly>
                                    </textarea>
                                </div>
                                <div>
                                    <button className='btn btn-primary' type='button' onClick={() => copyToClipBoard()}>Copia</button>
                                </div>
                            </div>
                        </div>}
                </span>
            }
        </div>
    )
}

export default Issues