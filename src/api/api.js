import {csCourses} from "../mockData/csCourses";
import {MAJOR_CODES} from "../utils/constants";
import {genEdCourses} from "../mockData/genEdCourses";
import {mockStudentCourses} from "../mockData/mockStudentCourses";

export const getMajorCourses = async (majorCode) => {
    try {
        // TO-DO change to api call later
        let response
        if (majorCode === MAJOR_CODES.cs) {
            response = csCourses;
        } else if (majorCode === MAJOR_CODES.fnd) {
            response = genEdCourses;
        }
        return response;
    } catch (e) {
        console.error(e);
    }
}

export const getStudentCourses = async () => {
    try{
        // TO-DO change to api call later
        let response = mockStudentCourses;
        return response;
    }catch(e){
        console.error(e);
    }
}
