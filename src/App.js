import {Box, Paper, Typography} from "@mui/material";
import StudentHeader from "./components/StudentHeader";
import StudentPanel from "./components/StudentPanel";
import React, {useState, useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from "axios";

function App() {

    const mockStudentValues = {
        studentName: "Some Name",
        major: "Computer Science",
        majorCode: "CS",
        credits: 78,
        gpa: 2.2
    }

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const admin = false;
    return (
        profile ? (
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
                {admin &&
                    <Paper sx={{width: '15vw', flexGrow: 1, m: 0}}>
                        <Typography>Admin Panel</Typography>
                    </Paper>}
                <Box sx={{width: '85vw', heigth: '100%', display: 'flex', flexDirection: 'column'}}>
                    <StudentHeader studentName={profile?.name} major={mockStudentValues.major}
                                   credits={mockStudentValues.credits} gpa={mockStudentValues.gpa}
                                   picture={profile?.picture} logOut={logOut}/>
                    <StudentPanel/>
                </Box>
            </Box>

        ) : (
            <button onClick={login}>Sign in with Google 🚀 </button>
        )


    );
}

export default App;
