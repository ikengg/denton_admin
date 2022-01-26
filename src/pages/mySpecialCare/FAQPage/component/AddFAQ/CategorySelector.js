import { 
    // useState, 
    useEffect 
} from 'react';

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../../redux/actions/articleAction";


const useStyles = makeStyles((theme) => ({
    formControl: {
        //margin: theme.spacing(1),
        // marginTop: 20,
        // minWidth: 500,
        minWidth: "100%",
    },
}));

const CategorySelector = (props) => {

    const { handleChangeSelete, ...field } = props;
    const classes = useStyles();

    //redux instance
    const {
        category,
        unsubscribe,
    } = useSelector((state) => state.articleReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        //load category
        dispatch(getCategory());
        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            if (unsubscribe)
                unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                    {...field}
                    onChange={handleChangeSelete}
                    label="Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        category && (category.map((value) => {
                            return (
                                <MenuItem value={value.id}>
                                    {value.name}
                                </MenuItem>
                            )
                        }))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default CategorySelector;
