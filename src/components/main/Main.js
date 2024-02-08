import React, { useState,useEffect } from 'react';
import Table from '../table/Table';
import { PODLIST, HELM_PODS, OCP_PODS } from "../../utils/CONSTANTS";
import TableForEmail from '../tableForEmail/TableForEmail';
import { toast, ToastContainer } from "react-toastify";
import './main.css'

const Main = () => {
    const [tagHelmArray, setTagHelmArray] = useState([]);
    const [tagOcpArray, setTagOcpArray] = useState([]);
    const [textareaValue, setTextAreaValue] = useState("");
    const [textareaVisible, setTextAreaVisible] = useState(true);
    const [riepilogoVisibile, setRiepilogoVisible] = useState(false);
    const [isHelm, setIsHelm] = useState(true);
    const [tagHelm, setTagHelm] = useState({
        issues: "",
        pod: "",
        pipeLineMergeRequest: "",
        sourceRepository: "",
        pipeLineRelease: "",
        buildDockerImage: "SI",
        upstreamDeploy: "",
        tagNumber: "",
        manualActivity: "NO",
        notes: " ",
        inputEnabled: false
    });
    const [tagOcp, setTagOcp] = useState({
        issues: "",
        pod: "",
        upstreamRelease: "",
        upstreamDeploy: "",
        overwriteDeploymentConfig: "",
        buildDockerImage: "",
        tagNumber: "",
        branchConfigurations: "release/",
        manualActivity: "NO",
        notes: " ",
        inputEnabled: false
    });

    useEffect(() => {

      return () => {
        recoverSession()
      }
    }, [])
    

    const HELM_POD_NAMES = HELM_PODS.map(el => el.pod);
    const HELM_SOURCE_REPO = HELM_PODS.map(el => el.sourceRepository);
    const HELM_PIPELINE_RELEASE = HELM_PODS.map(el => el.pipeLineRelease);
    const HELM_UPSTREAM_DEPLOY = HELM_PODS.map(el => el.upstreamDeploy);
    const OCP_POD_NAMES = OCP_PODS.map(el => el.pod);
    const OCP_UPSTREAM_RELEASE = OCP_PODS.map(el => el.upstreamRelease);
    const OCP_UPSTREAM_DEPLOY = OCP_PODS.map(el => el.upstreamDeploy);

    function recoverSession(){
        var sessionTextArea = sessionStorage.getItem('textAreaIssues');
        if(sessionTextArea && sessionTextArea.length > 0){
            setTextAreaValue(sessionTextArea);
        }
    }

    function allFieldsValued() {

        if (isHelm) {
            let keys = Object.keys(tagHelm);
            let valid = true;
            keys.forEach((key) => {
                if (key != "inputEnabled" && key != "notes" && key != 'pipeLineMergeRequest') {
                    valid = valid && tagHelm[key].length > 0;
                }
            })
            return valid
        } else {
            let keys = Object.keys(tagOcp);
            let valid = true;
            keys.forEach((key) => {
                if (key != "inputEnabled" && key != "notes") {
                    valid = valid && tagOcp[key].length > 0;
                }
            })
            return valid
        }

    }

    function fieldsValidation() {
        return true
    }

    function handleChange(helm, field, value) {
        if (helm) {
            setTagHelm(prevTagItem => ({
                ...prevTagItem,
                [field]: value,
            }));
        } else {
            setTagOcp(prevTagItem => ({
                ...prevTagItem,
                [field]: value
            }));
        }

        if (field === 'pod' && value) {
            const selectedPodObject = isHelm ? HELM_PODS.find((pod) => pod.pod === value) : OCP_PODS.find((pod) => pod.pod === value);
            if (selectedPodObject) {

                if (helm) {
                    setTagHelm((prevTagItem) => ({
                        ...prevTagItem,
                        sourceRepository: selectedPodObject.sourceRepository,
                        pipeLineRelease: selectedPodObject.pipeLineRelease,
                        upstreamDeploy: selectedPodObject.upstreamDeploy,
                    }));
                } else {
                    setTagOcp((prevTagItem) => ({
                        ...prevTagItem,
                        upstreamRelease: selectedPodObject.upstreamRelease,
                        upstreamDeploy: selectedPodObject.upstreamDeploy
                    }));
                }
            }
        }
    }

    function checkIfPodIsHeml(pod) {
        pod = pod.toLowerCase();
        var helm = HELM_POD_NAMES.includes(pod) ? true : false;
        return helm;
    }

    function checkIfPodIsPresent() {
        let isPresent = false;
        if (isHelm) {
            tagHelmArray.forEach((item) => {
                if (item.pod == tagHelm.pod) {
                    isPresent = true;
                }
            })
        } else {
            tagOcpArray.forEach((item) => {
                if (item.pod == tagOcp.pod) {
                    isPresent = true;
                }
            })
        }
        return isPresent
    }

    function handleRemove(index, helmTable) {
        if (helmTable) {
            var tmpArr = tagHelmArray.filter((item) => {
                let idx = tagHelmArray.indexOf(item);
                if (idx != index) {
                    return item
                }
            })
            setTagHelmArray(tmpArr)
        } else {
            var tmpArr = tagOcpArray.filter((item) => {
                let idx = tagOcpArray.indexOf(item);
                if (idx != index) {
                    return item
                }
            })
            setTagOcpArray(tmpArr)
        }

    }

    function handleSubmit() {
        if (!checkIfPodIsPresent()) {
            if (isHelm) {
                let arr = [...tagHelmArray];
                arr.push(tagHelm);
                setTagHelmArray(arr)
                var cleanUpItem = {
                    issues: "",
                    pod: "",
                    pipeLineMergeRequest: "",
                    sourceRepository: "",
                    pipeLineRelease: "",
                    buildDockerImage: "",
                    upstreamDeploy: "",
                    tagNumber: "",
                    manualActivity: "NO",
                    notes: "",
                    inputEnabled: false
                }
                setTagHelm(cleanUpItem);
            } else {
                let arr = [...tagOcpArray];
                arr.push(tagOcp);
                setTagOcpArray(arr);

                var cleanUpItem = {
                    issues: "",
                    pod: "",
                    upstreamRelease: "",
                    upstreamDeploy: "",
                    overwriteDeploymentConfig: "",
                    buildDockerImage: "",
                    tagNumber: "",
                    branchConfigurations: "NO",
                    manualActivity: "NO",
                    notes: "",
                    inputEnabled: false
                }
                setTagOcp(cleanUpItem);
            }

        } else {
            toast.error(`${tagHelm.pod} è già presente, utilizza il pulsante di modifica`)
        }
    }

    function handleSetTagItems(arr) {
        setTagHelmArray(arr);
    }

    function showRiepilogo() {
        setRiepilogoVisible(true);
    }

    function closeRiepilogo() {
        setRiepilogoVisible(false);
    }

    function textAreaOnChange(value) {
        setTextAreaValue(value);
        sessionStorage.setItem("textAreaIssues",value)
    }

    function isTagPresentInTextArea(tag) {
        let isTagPresent = false;
        if ((/^\d\.\d{2}\.\d{1,3}$/).test(tag)) {
            isTagPresent = true;
        }
        return isTagPresent
    }

    function goToTextArea() {
        setTextAreaVisible(true);
    }

    function textAreaClick() {
        var value = textareaValue;
        let hemlArrayToPush = [];
        let ocpArrayToPush = [];
        if (value) {
            var arr = value.split(",");
            arr.forEach((el) => {
                el = el.trim().replace(/^(?:\n)+/, '');
                let tmpObj = {
                    pod: el.split(" ")[0] ? el.split(" ")[0] : "",
                }
                if (checkIfPodIsHeml(tmpObj.pod)) {
                    let tmpHelm = {
                        ...tmpObj,
                        tagNumber: isTagPresentInTextArea(el.split(" ")[1]) ? el.split(" ")[1] : "",
                        issues: isTagPresentInTextArea(el.split(" ")[1]) ?
                            (el.split(" ")[2] ? el.split(" ")[2] : "") :
                            el.split(" ")[1]
                    }
                    let helmFound = HELM_PODS.find((pod) => pod.pod.toLowerCase() === tmpHelm.pod.toLowerCase())
                    let item = {
                        issues: tmpHelm.issues,
                        pod: tmpHelm.pod,
                        pipeLineMergeRequest: "",
                        sourceRepository: helmFound.sourceRepository ? helmFound.sourceRepository : "",
                        pipeLineRelease: helmFound.pipeLineRelease ? helmFound.pipeLineRelease : "",
                        buildDockerImage: "SI",
                        upstreamDeploy: helmFound.upstreamDeploy ? helmFound.upstreamDeploy : "",
                        tagNumber: tmpHelm.tagNumber,
                        manualActivity: "NO",
                        notes: "",
                        inputEnabled: false
                    };
                    hemlArrayToPush.push(item);
                } else {
                    let tmpOcp = {
                        ...tmpObj,
                        tagNumber: isTagPresentInTextArea(el.split(" ")[1]) ? el.split(" ")[1] : "",
                        issues: isTagPresentInTextArea(el.split(" ")[1]) ?
                            (el.split(" ")[2] ? el.split(" ")[2] : "") :
                            el.split(" ")[1],
                    }
                    let ocpFound = OCP_PODS.find((pod) => pod.pod.toLowerCase() === tmpOcp.pod.toLowerCase());
                    let item = {
                        issues: tmpOcp.issues,
                        pod: tmpOcp.pod,
                        upstreamRelease: ocpFound.upstreamRelease ? ocpFound.upstreamRelease : "",
                        upstreamDeploy: ocpFound.upstreamDeploy ? ocpFound.upstreamDeploy : "",
                        overwriteDeploymentConfig: "SI",
                        buildDockerImage: "",
                        tagNumber: tmpOcp.tagNumber,
                        branchConfigurations: "NO",
                        manualActivity: "NO",
                        notes: "",
                        inputEnabled: false,
                    };
                    ocpArrayToPush.push(item);
                }
            })
        }
        if (hemlArrayToPush) {
            setTagHelmArray(hemlArrayToPush);
        }
        if (ocpArrayToPush) {
            setTagOcpArray(ocpArrayToPush);
        }
        setTextAreaVisible(false);
    }

    return (
        <div className='container'>
            <ToastContainer theme={'dark'} />
            <div className='row'>
                {textareaVisible &&
                    <div className='col-12 mt-5'>
                        <div className="form-group">
                            <textarea
                                placeholder='Seguire il seguente pattern:
                            associazione-ruoli-pf 1.44.2 25106-25105,
                            frontEnd-carte 25111,
                            riepilogo-operazione-cdm 1.44.3'
                                rows="10" cols="50" type="text" value={textareaValue} onChange={(e) => textAreaOnChange(e.target.value)}></textarea>
                        </div>
                        <div>
                            <button type="button" onClick={textAreaClick} className="btn btn-success mt-3 add-btn">{textareaValue.length == 0 ? 'Inserimento tramite form' : 'Aggiungi'}</button>
                        </div>
                    </div>
                }
                {!textareaVisible &&
                    <div className='row'>
                        <h3 className='mb-3 text-uppercase'><b>Scegli il tipo di pod</b></h3>
                        <div className='col-12'>
                            <span className='goback-add-btn text-uppercase'><small><b>Helm</b></small>
                                <input
                                    type="radio"
                                    value={true}
                                    checked={isHelm}
                                    onChange={() => setIsHelm(true)}
                                    name="podType"
                                /></span><span className='goback-add-btn'><small><b>OCP</b></small>
                                <input
                                    type="radio"
                                    value={false}
                                    checked={!isHelm}
                                    onChange={() => setIsHelm(false)}
                                    name="podType"
                                /></span></div>
                    </div>}
                {!textareaVisible && isHelm &&
                    <><div className='col-4 mt-5'>
                        <form>
                            <div className="form-group">
                                <label className='text-uppercase'>issues</label>
                                <input type="text" className="form-control" onChange={(e) => handleChange(true, 'issues', e.target.value)} value={tagHelm.issues} placeholder="Aggiungere tutti i defect associati al pod" />
                            </div>
                            <div className="form-group">
                                <label className='text-uppercase'>Pod</label>
                                <select className="form-select" onChange={(e) => handleChange(true, 'pod', e.target.value)} value={tagHelm.pod} aria-label="Default select example">
                                    <option defaultValue>Seleziona</option>
                                    {HELM_POD_NAMES.sort().map((item, index) => {
                                        return (
                                            <>
                                                <option key={index} value={item}>{item}</option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className='text-uppercase'>Pipeline di merge request</label>
                                <input onChange={(e) => handleChange(true, 'pipeLineMergeRequest', e.target.value)} value={tagHelm.pipeLineMergeRequest} type="text" className="form-control" />
                            </div>
                        </form>
                    </div><div className='col-4 mt-5'>
                            <form>
                                <div className="form-group">
                                    <label className='text-uppercase'>pipeline release</label>
                                    <select className="form-select" disabled onChange={(e) => handleChange(true, 'pipeLineRelease', e.target.value)} value={tagHelm.pipeLineRelease} aria-label="Default select example">
                                        <option defaultValue>Seleziona</option>
                                        {HELM_PIPELINE_RELEASE.sort().map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item}>{item}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>source repository</label>
                                    <select className="form-select" disabled onChange={(e) => handleChange(true, 'sourceRepository', e.target.value)} value={tagHelm.sourceRepository} aria-label="Default select example">
                                        <option defaultValue>Seleziona</option>
                                        {HELM_SOURCE_REPO.sort().map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item}>{item}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>build docker image</label>
                                    <input onChange={(e) => handleChange(true, 'buildDockerImage', e.target.value)} type="text" value={tagHelm.buildDockerImage} className="form-control" />
                                </div>
                            </form>
                        </div><div className='col-4 mt-5'>
                            <form>
                                <div className="form-group">
                                    <label className='text-uppercase'>tag</label>
                                    <input onChange={(e) => handleChange(true, 'tagNumber', e.target.value)} value={tagHelm.tagNumber} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>attività manuali</label>
                                    <input onChange={(e) => handleChange(true, 'manualActivity', e.target.value)} value={tagHelm.manualActivity} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>upstream deploy</label>
                                    <select className="form-select" onChange={(e) => handleChange(true, 'upstreamDeploy', e.target.value)} disabled value={tagHelm.upstreamDeploy} aria-label="Default select example">
                                        <option defaultValue>Seleziona</option>
                                        {HELM_UPSTREAM_DEPLOY.sort().map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item}>{item}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>note</label>
                                    <input type="text" onChange={(e) => handleChange(true, 'notes', e.target.value)} value={tagHelm.notes} className="form-control" />
                                </div>
                            </form>
                        </div></>
                }
                {!textareaVisible && !isHelm &&
                    <><div className='col-4 mt-5'>
                        <form>
                            <div className="form-group">
                                <label className='text-uppercase'>issues</label>
                                <input type="text" className="form-control" onChange={(e) => handleChange(false, 'issues', e.target.value)} value={tagOcp.issues} placeholder="Aggiungere tutti i defect associati al pod" />
                            </div>
                            <div className="form-group">
                                <label className='text-uppercase'>Pod</label>
                                <select className="form-select" onChange={(e) => handleChange(false, 'pod', e.target.value)} value={tagOcp.pod} aria-label="Default select example">
                                    <option defaultValue>Seleziona</option>
                                    {OCP_POD_NAMES.sort().map((item, index) => {
                                        return (
                                            <>
                                                <option key={index} value={item}>{item}</option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className='text-uppercase'>Upstream Release</label>
                                <select className="form-select" disabled onChange={(e) => handleChange(false, 'upstreamRelease', e.target.value)} value={tagOcp.upstreamRelease} aria-label="Default select example">
                                    <option defaultValue>Seleziona</option>
                                    {OCP_UPSTREAM_RELEASE.sort().map((item, index) => {
                                        return (
                                            <>
                                                <option key={index} value={item}>{item}</option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                        </form>
                    </div><div className='col-4 mt-5'>
                            <form>
                                <div className="form-group">
                                    <label className='text-uppercase'>Overwrite Deployment Config</label>
                                    <input onChange={(e) => handleChange(false, 'overwriteDeploymentConfig', e.target.value)} value={tagOcp.overwriteDeploymentConfig} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>build docker image</label>
                                    <input onChange={(e) => handleChange(false, 'buildDockerImage', e.target.value)} type="text" value={tagOcp.buildDockerImage} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>upstream deploy</label>
                                    <select className="form-select" disabled onChange={(e) => handleChange(false, 'upstreamDeploy', e.target.value)} value={tagOcp.upstreamDeploy} aria-label="Default select example">
                                        <option defaultValue>Seleziona</option>
                                        {OCP_UPSTREAM_DEPLOY.sort().map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item}>{item}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>
                            </form>
                        </div><div className='col-4 mt-5'>
                            <form>
                                <div className="form-group">
                                    <label className='text-uppercase'>tag</label>
                                    <input onChange={(e) => handleChange(false, 'tagNumber', e.target.value)} value={tagOcp.tagNumber} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>attività manuali</label>
                                    <input onChange={(e) => handleChange(false, 'manualActivity', e.target.value)} value={tagOcp.manualActivity} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>branch Configurations</label>
                                    <input onChange={(e) => handleChange(false, 'branchConfigurations', e.target.value)} value={tagOcp.branchConfigurations} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className='text-uppercase'>note</label>
                                    <input type="text" onChange={(e) => handleChange(false, 'notes', e.target.value)} value={tagOcp.notes} className="form-control" />
                                </div>
                            </form>
                        </div></>
                }
            </div>

            {!textareaVisible &&
                <><div className='row'>
                    <div className='col-12'>
                        <button type="button" onClick={() => goToTextArea()} className="btn btn-success mt-3 goback-add-btn">Indietro</button>
                        <button type="button" disabled={!allFieldsValued() || !fieldsValidation()} onClick={() => handleSubmit()} className="btn btn-success mt-3 goback-add-btn">Aggiungi</button>
                    </div>
                </div><div className='container'>
                        <div>
                            {!riepilogoVisibile && <>
                                <Table hemlArray={tagHelmArray} ocpArray={tagOcpArray} removeFn={handleRemove} modifyTagCb={handleSetTagItems} /><button type="button" onClick={showRiepilogo} className="btn btn-success mt-3">Guarda il riepilogo e copia le tabelle</button></>}
                            <TableForEmail hemlTags={tagHelmArray} ocpTags={tagOcpArray} riepilogoVisibile={riepilogoVisibile} closeRiepilogo={closeRiepilogo} />
                        </div>
                    </div></>
            }
        </div>
    )
}

export default Main