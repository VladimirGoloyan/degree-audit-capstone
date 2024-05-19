import {addDoc, collection, doc, setDoc, getDoc} from "@firebase/firestore";
import {firestore} from "../firebase/firebase";

const ref = collection(firestore, "users")

export const addUser = (userInfo) => {
    try {
        const studentRef = doc(ref, userInfo.email);
        setDoc(studentRef, userInfo)
    } catch(err) {
        console.log(err)
    }
}

export const getUser = async (email) => {
    try{
        const studentRef = doc(ref, email);
        const dataSnap = await getDoc(studentRef);
        if(dataSnap.exists()){
            return dataSnap.data();
        }
    }catch(err){
        console.log(err);
    }
}
