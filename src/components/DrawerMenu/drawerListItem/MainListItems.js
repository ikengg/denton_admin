import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { mainListItems } from './listItems';
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

const MainListItems = () => {

    const classes = useStyles();

    return (
        <>
            {/* main list item */}
            {
                mainListItems.map((list) => {
                    return (
                        <ListItem
                            button
                            className={classes.listInDrawer}
                            activeClassName={classes.isActive}
                            component={NavLink}
                            to={`${list.route}`}
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

export default MainListItems;
