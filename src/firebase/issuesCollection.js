import fireDb from "./connector.js";
import { collection } from "firebase/firestore";

const collectionRef = collection(fireDb, 'feu-releases')


export default collectionRef;