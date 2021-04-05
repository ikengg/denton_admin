import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { mainListItems } from './listItems';


const useStyles = makeStyles((theme) => ({
    listInDrawer: {
        '&:hover': {
            background: "#1c2636",
        },
    },
}));

const MainListItems = () => {

    const classes = useStyles();

    return (
        <>
            {/* main list item */}
            {
                mainListItems.map((list) => {
                    return (
                        <>
                            <ListItem button className={classes.listInDrawer}>
                                <ListItemIcon>
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText primary={`${list.text}`} />
                            </ListItem>
                        </>
                    )
                })
            }
        </>
    )
}

export default MainListItems
