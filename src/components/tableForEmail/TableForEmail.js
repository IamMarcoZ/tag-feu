import React from 'react';
import { FaPaste } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const TableForEmail = ({ hemlTags, ocpTags, riepilogoVisibile, closeRiepilogo }) => {

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
        if(id == "tableHelm"){
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
                {hemlTags &&
                    <div>
                        <table id='tableHelm'>
                            <thead>
                                <tr>
                                    <th>ISSUE</th>
                                    <th >PROGETTO</th>
                                    <th >PIPELINE DI MERGE REQUEST</th>
                                    <th >SOURCE REPOSITORY</th>
                                    <th >PIPELINE DI RELEASE</th>
                                    <th >BUILD DOCKER IMAGE</th>
                                    <th >UPSTREAM DEPLOY</th>
                                    <th >TAG NAME</th>
                                    <th >ATTIVITA' MANUALI</th>
                                    <th >NOTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hemlTags && hemlTags.map((item, index) => (
                                    <tr key={index}>
                                        <td >{item.issues}</td>
                                        <td >{item.pod}</td>
                                        <td >{item.pipeLineMergeRequest}</td>
                                        <td >{item.sourceRepository}</td>
                                        <td >{item.pipeLineRelease}</td>
                                        <td >{item.buildDockerImage}</td>
                                        <td >{item.upstreamDeploy}</td>
                                        <td >{item.tagNumber}</td>
                                        <td >{item.manualActivity}</td>
                                        <td >{item.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type='button' onClick={() => copyToClipBoard("tableHelm")} ><FaPaste />
                        </button>
                    </div>
                }
                {ocpTags &&
                    <div>
                        <table id='tableOcp'>
                            <thead>
                                <tr>
                                    <th>ISSUE</th>
                                    <th className='smaller-td'>PROGETTO</th>
                                    <th className='smaller-td'>UPSTREAM RELEASE</th>
                                    <th>UPSTREAM DEPLOY</th>
                                    <th className='smaller-td'>OVERWRITE DEPLOYMENT CONFIG</th>
                                    <th>BUILD DOCKER IMAGE</th>
                                    <th>TAG NAME</th>
                                    <th>BRANCH CONFIGURATIONS</th>
                                    <th>ATTIVITA' MANUALI</th>
                                    <th>NOTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ocpTags && ocpTags.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.issues}</td>
                                        <td className='smaller-td'>{item.pod}</td>
                                        <td className='smaller-td'>{item.upstreamRelease}</td>
                                        <td >{item.upstreamDeploy}</td>
                                        <td >{item.overwriteDeploymentConfig}</td>
                                        <td >{item.buildDockerImage}</td>
                                        <td >{item.tagNumber}</td>
                                        <td >{item.branchConfigurations}</td>
                                        <td >{item.manualActivity}</td>
                                        <td >{item.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table><button type='button' onClick={() => copyToClipBoard("tableOcp")} ><FaPaste />
                        </button>
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
