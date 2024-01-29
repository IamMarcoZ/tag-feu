import React from 'react';
import { sendMail } from '../../utils/api';
import { FaPaste } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TableForEmail = ({ hemlTags, ocpTags, riepilogoVisibile, closeRiepilogo, openToast}) => {

    function handleCloseRiepilogo() {
        closeRiepilogo();
    }

    function sendEMail() {
        let ocpTable = document.getElementById("tableOcp").outerHTML;
        let helmTable = document.getElementById("tableHelm").outerHTML;
        sessionStorage.setItem("table", helmTable)
        console.log(helmTable);
        console.log(ocpTable);
        // sendMail("marco.cicerano@hotmail.com", helmTable);
    }

    function copyToClipBoard(id) {

        const elTable = document.getElementById(id);
        let range, sel;

        if (document.createRange && window.getSelection) {

            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();

            try {
                range.selectNodeContents(elTable);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(elTable);
                sel.addRange(range);
            }
            if(id == "tableHelm"){
                openToast('Tabella helm copiata!',"OK");
            }else{
                openToast('Tabella ocp copiata!',"OK");
            }
            document.execCommand('copy');
        }

        sel.removeAllRanges();
        
    }

    if (!riepilogoVisibile) {
        return null;
    }
    return (
        <div>
            <div>
                {hemlTags &&
                    <div>
                        <button className='mt-5' type='button' style={{borderRadius:"5px"}} onClick={() => copyToClipBoard("tableHelm")} ><FaPaste />
                        </button>
                        <table id='tableHelm' style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>ISSUE</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>PROGETTO</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>PIPELINE DI MERGE REQUEST</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>SOURCE REPOSITORY</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>PIPELINE DI RELEASE</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>BUILD DOCKER IMAGE</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>UPSTREAM DEPLOY</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>TAG NAME</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>ATTIVITA' MANUALI</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>NOTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hemlTags && hemlTags.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.issues}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.pod}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.pipeLineMergeRequest}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.sourceRepository}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.pipeLineRelease}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.buildDockerImage}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.upstreamDeploy}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.tagNumber}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.manualActivity}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                {ocpTags &&
                    <div>
                        <button className='mt-5' style={{borderRadius:"5px"}} type='button' onClick={() => copyToClipBoard("tableOcp")} ><FaPaste />
                        </button>
                        <table className='mb-5' id='tableOcp' style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>ISSUE</th>
                                    <th className='small-td' style={{ border: '1px solid black !important', textAlign: 'center', width: '170px !important' }}>PROGETTO</th>
                                    <th className='small-td' style={{ border: '1px solid black !important', textAlign: 'center', width: '170px !important' }}>UPSTREAM RELEASE</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>UPSTREAM DEPLOY</th>
                                    <th className='small-td' style={{ border: '1px solid black !important', textAlign: 'center', width: '170px !important' }}>OVERWRITE DEPLOYMENT CONFIG</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>BUILD DOCKER IMAGE</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>TAG NAME</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>BRANCH CONFIGURATIONS</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>ATTIVITA' MANUALI</th>
                                    <th style={{ border: '1px solid black !important', textAlign: 'center', backgroundColor: '#f2f2f2', fontSize: 'small', width: '180px !important' }}>NOTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ocpTags && ocpTags.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.issues}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '170px !important' }}>{item.pod}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '170px !important' }}>{item.upstreamRelease}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.upstreamDeploy}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.overwriteDeploymentConfig}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.buildDockerImage}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.tagNumber}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.branchConfigurations}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.manualActivity}</td>
                                        <td style={{ border: '1px solid black !important', textAlign: 'center', width: '180px !important' }}>{item.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                <button className='btn btn-success' onClick={handleCloseRiepilogo}>
                    Chiudi
                </button>
            </div>
        </div>
    );
};

export default TableForEmail;
