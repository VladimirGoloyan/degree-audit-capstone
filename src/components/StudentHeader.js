import {Button, Paper, Typography} from "@mui/material";
import React from "react";

const StudentHeader = (props) => {

    const {studentName, major, credits, gpa, picture, logOut} = props

    return <Paper sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%'
    }}>
        <img src={picture} alt="user"/>
        <Typography variant='h4'>{studentName}</Typography>
        <Typography>{major}</Typography>
        <Typography>Credits: {credits}</Typography>
        <Typography> Current GPA: {gpa}</Typography>
        <Button variant='outlined' onClick={logOut}>Log Out</Button>
    </Paper>
}

export default StudentHeader;
