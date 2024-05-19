import {Box, Button, Typography} from "@mui/material";
import StudentHeader from "./components/StudentHeader";
import StudentPanel from "./components/StudentPanel";
import React, {useState, useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from "axios";
import {getUser} from "./handles/handleUser";

function App() {


    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.error('Login Failed:', error)
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
                        getUser(res.data.email).then((response) => {
                            setProfile((prev) => ({...prev, ...response}));
                        })
                    })
                    .catch((err) => console.error(err));

            }
        },
        [user]
    );
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

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
                <Box sx={{width: '85vw', heigth: '100%', display: 'flex', flexDirection: 'column'}}>
                    <StudentHeader studentName={profile?.name} major={profile?.major}
                                   credits={profile?.credits} gpa={profile?.GPA}
                                   picture={profile?.picture} logOut={logOut}/>
                    <StudentPanel studentId={profile?.studentId} major={profile?.major}/>
                </Box>
            </Box>

        ) : (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                background: 'navy'
            }}>
                <Typography variant='h3' sx={{m: 2, color: 'white'}}>Degree Audit Application</Typography>
                <Button onClick={login} variant={'contained'} sx={{m: 2, color: 'white'}}>Sign in with Google 🚀</Button>
            </Box>
        )


    );
}

export default App;
