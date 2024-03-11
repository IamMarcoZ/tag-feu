import React from 'react';
import { toast, ToastContainer } from "react-toastify";

const TableForEmail = ({ helmTags, ocpTags, riepilogoVisibile, closeRiepilogo }) => {

    function handleCloseRiepilogo() {
        closeRiepilogo();
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

            document.execCommand('copy');
        }

        sel.removeAllRanges();
        if(id === "tableHelm"){
            toast.success('Tabella helm copiata!')
        }else{
            toast.success('Tabella ocp copiata!')
        }
    }

    if (!riepilogoVisibile) {
        return null;
    }

    return (
        <div>
            <ToastContainer theme={'dark'}/>
            <div>
                {Object.keys(helmTags).length > 0 &&
                    <div>
                        <table id='tableHelm' style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>ISSUE</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>PROGETTO</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>PIPELINE DI MERGE REQUEST</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>SOURCE REPOSITORY</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>PIPELINE DI RELEASE</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>BUILD DOCKER IMAGE</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>UPSTREAM DEPLOY</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>TAG NAME</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>ATTIVITA' MANUALI</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>NOTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {helmTags && helmTags.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.issues}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.pod}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.pipeLineMergeRequest}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.sourceRepository}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.pipeLineRelease}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.buildDockerImage}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.upstreamDeploy}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.tagNumber}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.manualActivity}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.notes !== '' ? item.notes : '\u00A0'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-danger" style={{ width: '75px' }} type='button' onClick={() => copyToClipBoard("tableHelm")} >Copia</button>
                    </div>
                }
                {Object.keys(ocpTags).length > 0 &&
                    <div>
                        <table id='tableOcp' style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>ISSUE</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>PROGETTO</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small',minWidth:'300px', width:'300px', maxWidth:'300px', border: '1px solid black', textAlign: 'center' }}>UPSTREAM RELEASE</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small',minWidth:'300px', width:'300px', maxWidth:'300px', border: '1px solid black', textAlign: 'center' }}>UPSTREAM DEPLOY</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>OVERWRITE DEPLOYMENT CONFIG</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>BUILD DOCKER IMAGE</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>TAG NAME</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>BRANCH CONFIGURATIONS</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>ATTIVITA' MANUALI</th>
                                    <th style={{ backgroundColor: '#DDEBF7', fontSize: 'small', maxWidth: '150px', border: '1px solid black', textAlign: 'center' }}>NOTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ocpTags && ocpTags.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.issues}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.pod}</td>
                                        <td style={{ minWidth:'300px',width:'300px', maxWidth:'300px', border: '1px solid black', textAlign: 'center' }}>{item.upstreamRelease}</td>
                                        <td style={{ minWidth:'300px',width:'300px', maxWidth:'300px', border: '1px solid black', textAlign: 'center' }}>{item.upstreamDeploy}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.overwriteDeploymentConfig}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.buildDockerImage}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.tagNumber}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.branchConfigurations}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.manualActivity}</td>
                                        <td style={{ width: '180px', border: '1px solid black', textAlign: 'center' }}>{item.notes !== '' ? item.notes : '\u00A0'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-danger" style={{ width: '75px' }} type='button' onClick={() => copyToClipBoard("tableOcp")} >Copia</button>
                    </div>
                }

                <button className='btn btn-success mt-5' onClick={handleCloseRiepilogo}>
                    Chiudi
                </button>
            </div>
        </div>
    );
};

export default TableForEmail;
