import {Box, ListItem, ListItemIcon, Paper, Typography} from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

const type = "ClusterCourse";

const DragableCourses = (props) => {
    const {code, name, grade, ah, ss, qs, color} = props;


    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "",
        hover(item) {
        }
    });

    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: {code, ah, ss, qs},
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));
    drag(drop(ref));

    return (
        <Paper ref={ref} sx={{my: 1, opacity: isDragging ? 0 : 1, cursor: 'grab', background: color}}>
            <ListItem>
                <ListItemIcon>
                    <DragHandleIcon/>
                </ListItemIcon>
                <Typography sx={{width: '20%'}}>{code}</Typography>
                <Typography sx={{width: '65%'}}>{name}</Typography>
                <Typography sx={{width: '5%'}}>{grade}</Typography>
                <Box sx={{width: '50%', display: 'flex', justifyContent: 'flex-start'}}>
                    <Typography sx={{mx: 2, width: '20%'}}>
                        {ah.length > 0 ? ah.join(', ') : "-"}
                    </Typography>
                    <Typography sx={{mx: 2, width: '20%'}}>
                        {ss.length > 0 ? ss.join(', ') : "-"}
                    </Typography>
                    <Typography sx={{mx: 2, width: '20%'}}>
                        {qs.length > 0 ? qs.join(', ') : "-"}
                    </Typography>
                </Box>
            </ListItem>
        </Paper>
    )
};

export default DragableCourses;
