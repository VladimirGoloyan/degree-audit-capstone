import {Box, Paper, Typography} from "@mui/material";
import StudentHeader from "./components/StudentHeader";
import StudentPanel from "./components/StudentPanel";

function App() {

    const mockStudentValues = {
        studentName: "Some Name",
        major: "Computer Science",
        majorCode: "CS",
        credits: 78,
        gpa: 2.2
    }

    return (
        <Box sx={{
            m: 0,
            width: '100vw',
            minHeight: '100vh',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            overflowX: 'hidden',
            background: '#dddddd',
        }}>
            <Paper sx={{width: '15vw', flexGrow: 1, m: 0}}>
                <Typography>Admin Panel</Typography>
            </Paper>
            <Box sx={{width: '85vw', heigth: '100%', display: 'flex', flexDirection: 'column'}}>
                <StudentHeader studentName={mockStudentValues.studentName} major={mockStudentValues.major}
                               credits={mockStudentValues.credits} gpa={mockStudentValues.gpa}/>
                <StudentPanel/>
            </Box>
        </Box>
    );
}

export default App;
