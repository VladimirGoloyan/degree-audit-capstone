import {Alert, Box, Button, CircularProgress, List, Paper, Typography} from "@mui/material";
import {CLUSTER_COLORS} from "../utils/constants";
import DragableCourses from "./DragableCourses";
import {useEffect, useState} from "react";
import {useDrop} from "react-dnd";

const ClusterCourses = (props) => {

    const {clusterCourses} = props;

    const [courses, setCourses] = useState({ah: [], ss: [], qs: []});
    const [activeNumbers, setActiveNumbers] = useState({ah: null, ss: null, qs: null});

    const addCourseToCluster = (course, cluster) => {
        if (course[cluster].length !== 0) {
            // remove course from other cluster if in use
            if (courses.ah.includes(course)) {
                setCourses((prevState) =>
                    ({
                        ...prevState,
                        ah: courses.ah.filter(el => el.code !== course.code)
                    }))
            } else if (courses.ss.includes(course)) {
                setCourses((prevState) =>
                    ({
                        ...prevState,
                        ss: courses.ss.filter(el => el.code !== course.code)
                    }))

            } else if (courses.qs.includes(course)) {
                setCourses((prevState) =>
                    ({
                        ...prevState,
                        qs: courses.qs.filter(el => el.code !== course.code)
                    }))
            }

            if (courses[cluster].length < 3) {
                // initialize cluster number and add course
                if (!activeNumbers[cluster]) {
                    setActiveNumbers((prevState) => ({
                        ...prevState,
                        [cluster]: course[cluster][0]
                    }))
                    setCourses((prevState) => ({
                        ...prevState,
                        [cluster]: !courses[cluster].includes(course) ? [...courses[cluster], course] : courses[cluster]
                    }))
                } else {
                    // check if course added has the initialized number
                    if (course[cluster].includes(activeNumbers[cluster])) {
                        //if yes add the course
                        setCourses((prevState) => ({
                            ...prevState,
                            [cluster]: !courses[cluster].includes(course) ? [...courses[cluster], course] : courses[cluster]
                        }))
                    } else {
                        // if no filter courses with new number and set new number
                        setActiveNumbers((prevState) => ({
                            ...prevState,
                            [cluster]: course[cluster][0]
                        }))
                        setCourses((prevState) => ({
                            ...prevState,
                            [cluster]: [...courses[cluster].filter((el) => {
                                return el[cluster].includes(course[cluster][0])
                            }), course]
                        }))
                    }
                }
            }
        }
    }

    const clearClusterCourses = (cluster) => {
        setCourses((prevState) => ({
            ...prevState,
            [cluster]: []
        }))
        setActiveNumbers((prevState) => ({
            ...prevState,
            [cluster]: null
        }))
    }

    const [{ahIsOver}, ahDropRef] = useDrop({
        accept: 'ClusterCourse',
        drop: (item) => {
            addCourseToCluster(item, 'ah');
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    const [{ssIsOver}, ssDropRef] = useDrop({
        accept: 'ClusterCourse',
        drop: (item) => {
            addCourseToCluster(item, 'ss');
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    const [{qsIsOver}, qsDropRef] = useDrop({
        accept: 'ClusterCourse',
        drop: (item) => {
            addCourseToCluster(item, 'qs');
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    useEffect(() => {
        if (courses.ah.length === 0 && activeNumbers.ah) {
            setActiveNumbers((prevState) => ({
                ...prevState, ah: null
            }))
        }
        if (courses.ss.length === 0 && activeNumbers.ss) {
            setActiveNumbers((prevState) => ({
                ...prevState, ss: null
            }))
        }
        if (courses.qs.length === 0 && activeNumbers.qs) {
            setActiveNumbers((prevState) => ({
                ...prevState, qs: null
            }))
        }
    }, [activeNumbers.ah, activeNumbers.qs, activeNumbers.ss, courses])

    const getCourseColor = (code) => {
        if (courses.ah.find(el => el.code === code))
            return CLUSTER_COLORS.AH;
        else if (courses.ss.find(el => el.code === code))
            return CLUSTER_COLORS.SS;
        else if (courses.qs.find(el => el.code === code))
            return CLUSTER_COLORS.QS;
        return null;
    }

    const getClusterCompletion = (cluster) => {
        if (courses[cluster].find(el => el.code.split(' ')[1][0] === String(1))
            && courses[cluster].find(el => el.code.split(' ')[1][0] === String(2))
            && courses[cluster].length === 3
        )
            return true;
        return false;
    };

    return (
        <>
            <Typography variant='h5'>Cohesive Clusters</Typography>
            <Alert severity="warning">Please include at least one upper and lower courses in the cluster so it is
                completed.</Alert>
            <Box sx={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'space-evenly',
                m: 2,
            }}>
                <Paper ref={ahDropRef} sx={{
                    background: CLUSTER_COLORS.AH,
                    p: 1,
                    border: getClusterCompletion('ah') ? '4px solid green' : ''
                }}>
                    <Typography variant='h6'>Arts
                        & Humanities {activeNumbers.ah}</Typography>
                    <Box sx={{my: 1}}>{courses.ah.map((course) => {
                        return <Typography key={course.code}>{course.code}</Typography>
                    })}</Box>
                    {courses.ah.length !== 0 &&
                        <Button variant='contained' onClick={() => clearClusterCourses('ah')}>Clear Selection</Button>}
                </Paper>
                <Paper ref={ssDropRef} sx={{
                    background: CLUSTER_COLORS.SS,
                    p: 1,
                    border: getClusterCompletion('ss') ? '4px solid green' : ''
                }}><Typography variant='h6'>Social
                    Sciences {activeNumbers.ss}</Typography>
                    <Box sx={{my: 1}}>{courses.ss.map((course) => {
                        return <Typography key={course.code}>{course.code}</Typography>
                    })}</Box>
                    {courses.ss.length !== 0 &&
                        <Button variant='contained' onClick={() => clearClusterCourses('ss')}>Clear Selection</Button>}
                </Paper>
                <Paper ref={qsDropRef} sx={{
                    background: CLUSTER_COLORS.QS,
                    p: 1,
                    border: getClusterCompletion('qs') ? '4px solid green' : ''
                }}><Typography variant='h6'>Quantitative
                    Sciences {activeNumbers.qs}</Typography>
                    <Box sx={{my: 1}}>{courses.qs.map((course) => {
                        return <Typography key={course.code}>{course.code}</Typography>
                    })}</Box>
                    {courses.qs.length !== 0 &&
                        <Button variant='contained' onClick={() => clearClusterCourses('qs')}>Clear Selection</Button>}
                </Paper>
            </Box>
            <Box sx={{m: 1, display: 'flex', justifyContent: 'center'}}>
                {clusterCourses.length !== 0 ?
                    <List sx={{width: '80%'}}>
                        {clusterCourses.map((course) => <DragableCourses key={course.code} code={course.code}
                                                                         name={course.name}
                                                                         grade={course.grade} ah={course.ah}
                                                                         ss={course.ss}
                                                                         qs={course.qs}
                                                                         color={getCourseColor(course.code)}/>
                        )}
                    </List> : <CircularProgress/>}
            </Box>
        </>)
}

export default ClusterCourses;
