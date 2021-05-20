import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { secondaryListItems } from './listItems';
import ListSubheader from '@material-ui/core/ListSubheader';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    listInDrawer: {
        '&:hover': {
            background: "#1c2636",
        },
    },
}));

const SecondListItems = () => {

    const classes = useStyles();

    return (
        <>
            <ListSubheader
                inset
                key="secList"
                style={{ color: 'white' }}
            >
                ส่งซ่อมสินค้า
            </ListSubheader>
            {/* second list item */}
            {
                secondaryListItems.map((list, index) => {
                    return (
                            <ListItem
                                button
                                key={list.route}
                                className={classes.listInDrawer}
                                activeClassName={classes.isActive}
                                component={NavLink}
                                to={`${list.route}`}                                
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

export default SecondListItems;
