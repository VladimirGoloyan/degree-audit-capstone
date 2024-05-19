import {collection, doc, setDoc} from "@firebase/firestore"
import { firestore } from "../firebase/firebase"


// Admin util

// export const uploadMajorCourses = (major, courses) => {
// const ref = collection(firestore, "majors");
//     try {
//         const coursesRef = doc(ref, major);
//         setDoc(coursesRef, {[major]: courses})
//     } catch(err) {
//         console.log(err)
//     }
// }

export const uploadCompletedCourses = (studentId, courses) => {
    const ref = collection(firestore, "completedCourses");
    try {
        const coursesRef = doc(ref, studentId);
        setDoc(coursesRef, {[studentId]: courses})
    } catch(err) {
        console.log(err)
    }
}
