import {Box, Typography, Paper, List, ListItem, ListItemIcon} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useEffect, useState} from "react";
import {getMajorCourses, getStudentCourses} from "../api/api";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ClusterCourses from "./ClusterCourses";
import handleSubmit from '../handles/handlesubmit';
import { useRef } from 'react';

const StudentPanel = () => {

    const dataRef = useRef()

    const submithandler = (e) => {
        e.preventDefault()
        handleSubmit(dataRef.current.value)
        dataRef.current.value = ""
    }

    const [studentCourses, setStudentCourses] = useState([]);
    const [clusterCourses, setClusterCourses] = useState([]);
    const [majorCourses, setMajorCourses] = useState([]);
    const [passedCourses, setPassedCourses] = useState([]);
    const [foundationCourses, setFoundationCourses] = useState([]);
    const [passedFoundationCourses, setPassedFoundationCourses] = useState([]);

    const getCoursesForClusters = (courses) => {
        if (studentCourses) {
            const clustered = courses.filter((course) => course.clusters);
            const modifiedClustered = clustered.map((course) => ({
                ...course, ah: [], ss: [], qs: []
            }))
            modifiedClustered.forEach((course) => {
                course.clusters.forEach((cluster) => {
                    if (cluster < 4) {
                        course.ah.push(cluster);
                    } else if (cluster < 7) {
                        course.ss.push(cluster);
                    } else {
                        course.qs.push(cluster);
                    }
                })
            })
            setClusterCourses(modifiedClustered);
        }
    }

    const mapPassedCourses = (majors, setter) => {
        const fullCourses = majors.map((course) => {
            const getGrade = studentCourses.find(passedCourse => course.code === passedCourse.code)?.grade;
            return {...course, grade: Boolean(getGrade) ? getGrade : null}
        })
        setter(fullCourses);

    }

    const getIconFromGrade = (grade) => {
        if (!grade) return <ErrorOutlineIcon/>
        else if (grade === "F") return <CancelIcon sx={{color: 'red'}}/>
        else return <CheckCircleIcon sx={{color: 'green'}}/>
    }

    useEffect(() => {
        getCoursesForClusters(studentCourses);
        mapPassedCourses(majorCourses, setPassedCourses);
        mapPassedCourses(foundationCourses, setPassedFoundationCourses);
    }, [studentCourses, majorCourses, foundationCourses])


    useEffect(() => {
        const fetchData = async () => {
            const res = await getStudentCourses();
            setStudentCourses(res);
            // TO-DO change major to get from student object
            const majorRes = await getMajorCourses("CS");
            setMajorCourses(majorRes);
            const foundationRes = await getMajorCourses("FND");
            setFoundationCourses(foundationRes);
        }
        fetchData().catch(console.error);
    }, [])

    return <Box sx={{width: '85vw', flexGrow: 1, display: 'flex', flexDirection: 'row'}}>
        <Box sx={{width: '20vw', flexGrow: 1, m: 1}}>
            <Typography variant='h5'>Major Courses</Typography>
            <List>
                {passedCourses.map((course) =>
                    <Paper sx={{my: 1}} key={course.code}>
                        <ListItem>
                            <ListItemIcon>
                                {getIconFromGrade(course.grade)}
                            </ListItemIcon>
                            <Typography sx={{width: '30%'}}>{course.code}</Typography>
                            <Typography sx={{width: '60%'}}>{course.name}</Typography>
                            <Typography sx={{width: '10%'}}>{course.grade || "-"}</Typography>
                        </ListItem>
                    </Paper>
                )}
            </List>
        </Box>
        <Box sx={{
            width: '65vw',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            m: 1
        }}>
            <Typography variant='h5'>Foundation</Typography>
            <Box sx={{m: 1, display: 'flex', justifyContent: 'center'}}>
                <List sx={{width: '80%'}}>
                    {passedFoundationCourses.map((course) =>
                        <Paper sx={{my: 1}} key={course.code}>
                            <ListItem>
                                <ListItemIcon>
                                    {getIconFromGrade(course.grade)}
                                </ListItemIcon>
                                <Typography sx={{width: '10%'}}>{course.code}</Typography>
                                <Typography sx={{width: '35%'}}>{course.name}</Typography>
                                <Typography sx={{width: '5%'}}>{course.grade}</Typography>
                            </ListItem>
                        </Paper>
                    )}
                </List>
            </Box>
            <DndProvider backend={HTML5Backend}>
                <ClusterCourses clusterCourses={clusterCourses}/>
            </DndProvider>
        </Box>
        <div className="App">
            <form onSubmit={submithandler}>
                <input type= "text" ref={dataRef} />
                <button type = "submit">Save</button>
            </form>
        </div>
    </Box>
}

export default StudentPanel;
