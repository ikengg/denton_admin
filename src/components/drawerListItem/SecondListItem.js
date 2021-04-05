import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { secondaryListItems } from './listItems';
import ListSubheader from '@material-ui/core/ListSubheader';


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
                style={{ color: 'white' }}
            >
                Saved reports
            </ListSubheader>
            {/* second list item */}
            {
                secondaryListItems.map((list) => {
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
};

export default SecondListItems;
