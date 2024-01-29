import React, { useState } from 'react';
import Table from '../table/Table';
import { PODLIST, HELM_PODS, OCP_PODS } from "../../utils/CONSTANTS";
import TableForEmail from '../tableForEmail/TableForEmail';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";


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
        notes: "",
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
        notes: "",
        inputEnabled: false
    });

    const HELM_POD_NAMES = HELM_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.pod);
    const HELM_SOURCE_REPO = HELM_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.sourceRepository);
    const HELM_PIPELINE_RELEASE = HELM_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.pipeLineRelease);
    const HELM_UPSTREAM_DEPLOY = HELM_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.upstreamDeploy);

    const OCP_POD_NAMES = OCP_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.pod);

    const OCP_UPSTREAM_RELEASE = OCP_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.upstreamRelease);

    const OCP_UPSTREAM_DEPLOY = OCP_PODS
        .filter(el => PODLIST.includes(el.pod))
        .map(el => el.upstreamDeploy);

    function allFieldsValued() {

        if (isHelm) {
            let keys = Object.keys(tagHelm);
            let valid = true;
            keys.forEach((key) => {
                if (key != "inputEnabled" && key != "notes") {
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

    function showToast(msg, severity) {
        switch (severity) {
            case ("OK"): toast.done(msg);
                break;
            case ("KO"): toast.error(msg);
                break;
            case ("WARNING"): toast.warn(msg);
                break;
            default: toast.info(msg);
                break;
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
            if (isHelm) {
                showToast(`${tagHelm.pod} è già presente, utilizza il pulsante di modifica`, "KO")
            } else {
                showToast(`${tagOcp.pod} è già presente, utilizza il pulsante di modifica`, "KO")
            }
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
                        issues: el.split(" ")[2] ? el.split(" ")[2] : "",
                        tagNumber: el.split(" ")[1] ? el.split(" ")[1] : ""
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
                        issues: el.split(" ")[2] ? el.split(" ")[2] : "",
                        tagNumber: el.split(" ")[1] ? el.split(" ")[1] : ""
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
            <ToastContainer autoClose={2000} theme="dark" />
            <div className='row'>
                {textareaVisible &&
                    <div className='col-12 mt-5'>
                        <div className="form-group">
                            <textarea
                                placeholder='Seguire il seguente pattern:
                            associazione-ruoli-pf 25106-25105,
                            frontEnd-carte 25111,
                            riepilogo-operazione-cdm 25116-25220'
                                rows="10" cols="50" type="text" value={textareaValue} onChange={(e) => textAreaOnChange(e.target.value)}></textarea>
                        </div>
                        <div>
                            <button type="button" onClick={textAreaClick} className="btn btn-success mt-3">Aggiungi</button>
                        </div>
                    </div>
                }
                {!textareaVisible &&
                    <div className='row'>
                        <div className='col-12'>
                            <div><small>Pod Helm</small>
                                <input
                                    type="radio"
                                    value={true}
                                    checked={isHelm}
                                    onChange={() => setIsHelm(true)}
                                    name="podType"
                                /></div>
                            <div><small>Pod OCP </small>
                                <input
                                    type="radio"
                                    value={false}
                                    checked={!isHelm}
                                    onChange={() => setIsHelm(false)}
                                    name="podType"
                                /></div>
                        </div>
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

            {!textareaVisible && <button type="button" disabled={!allFieldsValued() || !fieldsValidation()} onClick={() => handleSubmit()} className="btn btn-success mt-3">Aggiungi</button>}
            <div className='container'>
                <div>
                    {!riepilogoVisibile && <>
                        <Table hemlArray={tagHelmArray} ocpArray={tagOcpArray} removeFn={handleRemove} modifyTagCb={handleSetTagItems} /><button type="button" onClick={showRiepilogo} className="btn btn-success mt-3">Guarda il riepilogo e invia la mail</button></>
                    }
                    {riepilogoVisibile &&
                        <TableForEmail hemlTags={tagHelmArray} ocpTags={tagOcpArray} riepilogoVisibile={riepilogoVisibile} closeRiepilogo={closeRiepilogo} openToast={showToast} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Main