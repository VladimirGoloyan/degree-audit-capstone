import React from 'react';
import * as XLSX from 'xlsx';
import {uploadCompletedCourses} from "../handles/handlesubmit";
import {Button, Typography} from "@mui/material";


const Admin = () => {
    const [data, setData] = React.useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, {type: 'binary'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);

            const modifiedData = sheetData.map((course) => {
                return {
                    studentId: course.Soc_sec,
                    code: course.Course.replace(/(\D)(\d)/, "$1 $2").trim(),
                    credits: course.Cred_rec,
                    grade: course.Grade,
                    name: course.Crs_txt
                };

            })

            const studentKeysData = {};
            modifiedData.forEach((course) => {
                if (studentKeysData[course.studentId]) {
                    studentKeysData[course.studentId].push(course);
                } else {
                    studentKeysData[course.studentId] = [course];
                }
            })
            setData(studentKeysData);
        };

        reader.readAsBinaryString(file);
    };

    const uploadCoursesToDb = () => {
        Object.keys(data).forEach((entry) => {
            uploadCompletedCourses(entry, data[entry]);
        })
    }

    return (
        <div>
            <Typography variant="h4">Upload excel file with course information</Typography>
            <input type="file" onChange={handleFileUpload}/>
            {data && (
                <>
                    <Button variant='contained' onClick={uploadCoursesToDb}>Upload to DataBase</Button>
                    <Typography variant="h5">Please review data before upload</Typography>
                    <div>
                        <h2>Imported Data:</h2>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                </>
            )}
        </div>
    );
}

export default Admin;
