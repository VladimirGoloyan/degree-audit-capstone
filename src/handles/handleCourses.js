import {collection, doc, getDoc} from "@firebase/firestore";
import {firestore} from "../firebase/firebase";

export const getCoursesByMajor = async (major) => {
    const ref = collection(firestore, "majors");
    try{
        const coursesRef = doc(ref, major);
        const dataSnap = await getDoc(coursesRef);
        if(dataSnap.exists()){
            return dataSnap.data()[major];
        }
    }catch(err){
        console.log(err);
    }
}

export const getStudentCompletedCourses = async (studentId) => {
    const ref = collection(firestore, "completedCourses");
    try{
        const coursesRef = doc(ref, studentId);
        const dataSnap = await getDoc(coursesRef);
        if(dataSnap.exists()){
            return dataSnap.data()[studentId];
        }
    }catch(err){
        console.log(err);
    }
}
