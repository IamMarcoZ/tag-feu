import React, { useState, useEffect } from 'react'
import './table.css'
import { FaCheck } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

const Table = ({ helmArray, ocpArray, removeFn, modifyTagCb }) => {
    const [helmFromParent, setHelmFromParent] = useState(null);
    const [ocpFromParent, setOcpFromParent] = useState(null);

    useEffect(() => {
        setHelmFromParent(helmArray);
        setOcpFromParent(ocpArray);
    }, [helmArray, ocpArray])

    function updateLine(idx, isHelm) {
        if (isHelm) {
            const newArray = [...helmFromParent];
            newArray[idx] = {
                ...newArray[idx],
                inputEnabled: !newArray[idx].inputEnabled
            };
            setHelmFromParent(newArray);
        } else {
            const newArray = [...ocpFromParent];
            newArray[idx] = {
                ...newArray[idx],
                inputEnabled: !newArray[idx].inputEnabled
            };
            setOcpFromParent(newArray);
        }

    }

    function callModifyTagCb(idx, isHelm) {
        if (isHelm) {
            const newArray = [...helmFromParent];
            newArray[idx] = {
                ...newArray[idx],
                inputEnabled: !newArray[idx].inputEnabled
            };
            setHelmFromParent(newArray);
        }else{
            const newArray = [...ocpFromParent];
            newArray[idx] = {
                ...newArray[idx],
                inputEnabled: !newArray[idx].inputEnabled
            };
            setOcpFromParent(newArray);
        }
    }

    function handleChange(field, value, idx, isHelm) {
        if(isHelm){
            const newArray = [...helmFromParent];
            newArray[idx] = {
                ...newArray[idx],
                [field]: value
            };
            setHelmFromParent(newArray);
        }else{
            const newArray = [...ocpFromParent];
            newArray[idx] = {
                ...newArray[idx],
                [field]: value
            };
            setOcpFromParent(newArray);
        }
    }

    return (
        <div id='showTable' className='container'>
            <table>
                <thead>
                    <tr>
                        <th>ISSUE</th>
                        <th className='small-td'>PROGETTO</th>
                        <th className='small-td'>PIPELINE DI MERGE REQUEST</th>
                        <th className='small-td'>SOURCE REPOSITORY</th>
                        <th className='small-td'>PIPELINE DI RELEASE</th>
                        <th className='small-td'>BUILD DOCKER IMAGE</th>
                        <th>UPSTREAM DEPLOY</th>
                        <th>TAG NAME</th>
                        <th>ATTIVITA' MANUALI</th>
                        <th>NOTE</th>    
                    </tr>
                </thead>
                <tbody>
                    {helmFromParent && helmFromParent.map((item, index) => {
                        return (
                            <tr key={index}>
                                {helmFromParent[index].inputEnabled ?
                                    <>
                                        <td><input onChange={(e) => handleChange('issues', e.target.value, index,true)} className='small-input' type="text" value={item.issues} /></td>
                                        <td><input onChange={(e) => handleChange('pod', e.target.value, index,true)} className='small-input' type="text" value={item.pod} /></td>
                                        <td><input onChange={(e) => handleChange('pipeLineMergeRequest', e.target.value, index,true)} className='small-input' type="text" value={item.pipeLineMergeRequest} /></td>
                                        <td><input onChange={(e) => handleChange('sourceRepository', e.target.value, index,true)} className='small-input' type="text" value={item.sourceRepository} /></td>
                                        <td><input onChange={(e) => handleChange('pipelineRelease', e.target.value, index,true)} className='small-input' type="text" value={item.pipelineRelease} /></td>
                                        <td><input onChange={(e) => handleChange('buildDockerImage', e.target.value, index,true)} className='small-input' type="text" value={item.buildDockerImage} /></td>
                                        <td><input onChange={(e) => handleChange('upstreamDeploy', e.target.value, index,true)} className='small-input' type="text" value={item.upstreamDeploy} /></td>
                                        <td><input onChange={(e) => handleChange('tagNumber', e.target.value, index,true)} className='small-input' type="text" value={item.tagNumber} /></td>
                                        <td><input onChange={(e) => handleChange('manualActivity', e.target.value, index,true)} className='small-input' type="text" value={item.manualActivity} /></td>
                                        <td><input onChange={(e) => handleChange('notes', e.target.value, index,true)} className='small-input' type="text" value={item.notes} /></td>
                                    </>
                                    :
                                    <>
                                        <td>{item.issues}</td>
                                        <td>{item.pod}</td>
                                        <td>{item.pipeLineMergeRequest}</td>
                                        <td>{item.sourceRepository}</td>
                                        <td>{item.pipelineRelease}</td>
                                        <td>{item.buildDockerImage}</td>
                                        <td>{item.upstreamDeploy}</td>
                                        <td>{item.tagNumber}</td>
                                        <td>{item.manualActivity}</td>
                                        <td>{item.notes}</td>
                                    </>
                                }

                                <td className='td-btn'>
                                    {!helmFromParent[index].inputEnabled ?
                                        <button type="button" onClick={() => updateLine(index,true)} className="btn btn-danger">
                                            <GrEdit />
                                        </button>
                                        :
                                        <button type="button" onClick={() => callModifyTagCb(index,true)} className="btn btn-danger">
                                            <FaCheck />
                                        </button>
                                    }
                                </td>
                                <td className='td-btn'>
                                    {!helmFromParent[index].inputEnabled ?
                                        <button type="button" onClick={() => removeFn(index,true)} className="btn btn-danger">
                                            <ImBin2 />
                                        </button>
                                        :
                                        <button type="button" onClick={() => updateLine(index,true)} className="btn btn-danger">
                                            <MdCancel />
                                        </button>
                                    }
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <table title='TABELLA POD OCP'>
                <thead>
                    <tr>
                        <th>ISSUE</th>
                        <th className='small-td'>PROGETTO</th>
                        <th className='small-td'>UPSTREAM RELEASE</th>
                        <th>UPSTREAM DEPLOY</th>
                        <th className='small-td'>OVERWRITE DEPLOYMENT CONFIG</th>
                        <th>BUILD DOCKER IMAGE</th>
                        <th>TAG NAME</th>
                        <th>BRANCH CONFIGURATIONS</th>
                        <th>ATTIVITA' MANUALI</th>
                        <th>NOTE</th>
                    </tr>
                </thead>
                <tbody>
                    {ocpFromParent && ocpFromParent.map((item, index) => {
                        return (
                            <tr key={index}>
                                {ocpFromParent[index].inputEnabled ?
                                    <>
                                        <td><input onChange={(e) => handleChange('issues', e.target.value, index,false)} className='small-input' type="text" value={item.issues} /></td>
                                        <td><input onChange={(e) => handleChange('pod', e.target.value, index,false)} className='small-input' type="text" value={item.pod} /></td>
                                        <td><input onChange={(e) => handleChange('upstreamRelease', e.target.value, index,false)} className='small-input' type="text" value={item.upstreamRelease} /></td>
                                        <td><input onChange={(e) => handleChange('upstreamDeploy', e.target.value, index,false)} className='small-input' type="text" value={item.upstreamDeploy} /></td>
                                        <td><input onChange={(e) => handleChange('overwriteDeploymentConfig', e.target.value, index,false)} className='small-input' type="text" value={item.overwriteDeploymentConfig} /></td>
                                        <td><input onChange={(e) => handleChange('buildDockerImage', e.target.value, index,false)} className='small-input' type="text" value={item.buildDockerImage} /></td>
                                        <td><input onChange={(e) => handleChange('tagNumber', e.target.value, index,false)} className='small-input' type="text" value={item.tagNumber} /></td>
                                        <td><input onChange={(e) => handleChange('branchConfigurations', e.target.value, index,false)} className='small-input' type="text" value={item.branchConfigurations} /></td>
                                        <td><input onChange={(e) => handleChange('manualActivity', e.target.value, index,false)} className='small-input' type="text" value={item.manualActivity} /></td>
                                        <td><input onChange={(e) => handleChange('notes', e.target.value, index,false)} className='small-input' type="text" value={item.notes} /></td>
                                    </>
                                    :
                                    <>
                                        <td>{item.issues}</td>
                                        <td>{item.pod}</td>
                                        <td>{item.upstreamRelease}</td>
                                        <td>{item.upstreamDeploy}</td>
                                        <td>{item.overwriteDeploymentConfig}</td>
                                        <td>{item.buildDockerImage}</td>
                                        <td>{item.tagNumber}</td>
                                        <td>{item.branchConfigurations}</td>
                                        <td>{item.manualActivity}</td>
                                        <td>{item.notes}</td>
                                    </>
                                }

                                <td className='td-btn'>
                                    {!ocpFromParent[index].inputEnabled ?
                                        <button type="button" onClick={() => updateLine(index,false)} className="btn btn-danger">
                                            <GrEdit />
                                        </button>
                                        :
                                        <button type="button" onClick={() => callModifyTagCb(index,false)} className="btn btn-danger">
                                            <FaCheck />
                                        </button>
                                    }
                                </td>
                                <td className='td-btn'>
                                    {!ocpFromParent[index].inputEnabled ?
                                        <button type="button" onClick={() => removeFn(index,false)} className="btn btn-danger">
                                            <ImBin2 />
                                        </button>
                                        :
                                        <button type="button" onClick={() => updateLine(index,false)} className="btn btn-danger">
                                            <MdCancel />
                                        </button>
                                    }
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Table