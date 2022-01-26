import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import { myDentistListItems } from './listItems';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    listInDrawer: {
        '&:hover': {
            background: "#1c2636",
        },
    },
    isActive: {
        backgroundColor: "#1c2636",
        color: "white",
    }
}));

const MyDentistMenuListItem = () => {

    const classes = useStyles();

    return (
        <>
            <ListSubheader
                inset
                key="myDentistListItems"
                style={{ color: 'white' }}
            >
                My Dentist
            </ListSubheader>
            {/* myDentistListItems */}
            {
                myDentistListItems.map((list) => {
                    return (
                        <ListItem
                            button
                            className={classes.listInDrawer}
                            activeclassname={classes.isActive}
                            component={NavLink}
                            to={`${list.route}`}
                            exact="true"
                            key={`${list.route}`}
                            disabled={list.isDisable}
                        >
                            <ListItemIcon>
                                {list.icon}
                            </ListItemIcon>
                            <ListItemText primary={`${list.text}`} />
                        </ListItem>
                    )
                })
            }
        </>
    )
}

export default MyDentistMenuListItem;
