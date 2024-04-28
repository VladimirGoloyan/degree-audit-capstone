import {Paper, Typography} from "@mui/material";

const StudentHeader = (props) => {

    const {studentName, major, credits, gpa} = props

    return <Paper sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }}>
        <Typography variant='h4'>{studentName}</Typography>
        <Typography>{major}</Typography>
        <Typography>Credits: {credits}</Typography>
        <Typography> Current GPA: {gpa}</Typography>
    </Paper>
}

export default StudentHeader;
