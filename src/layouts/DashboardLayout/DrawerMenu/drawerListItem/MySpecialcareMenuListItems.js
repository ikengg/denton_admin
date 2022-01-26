import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import { mySpecialCareListItem } from './listItems';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    listInDrawer: {
        '&:hover': {
            background: "#1c2636",
        },
    },
}));

const MySpecialcareMenuListItems = () => {

    const classes = useStyles();

    return (
        <>
            <ListSubheader
                inset
                key="mySpecialCareListItem"
                style={{ color: 'white' }}
            >
                My Special Care
            </ListSubheader>
            {/* mySpecialCareListItem */}
            {
                mySpecialCareListItem.map((list, index) => {
                    return (
                            <ListItem
                                button
                                key={list.route}
                                className={classes.listInDrawer}
                                activeclassname={classes.isActive}
                                component={NavLink}
                                to={`${list.route}`}      
                                exact="true"                         
                                disabled={list.isDisable}
                            >
                                <ListItemIcon >
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText primary={`${list.text}`} />
                            </ListItem>
                    )
                })
            }
        </>
    )
};

export default MySpecialcareMenuListItems;
