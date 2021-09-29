import { useState, useEffect } from 'react';
//mui
import {
    Grid,
    Button,
    TextField,
    CircularProgress,
    Container,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
//redux
import { useDispatch, useSelector } from "react-redux";
import { editCategory, setStateAddCategoryComplete } from "../../../../redux/actions/categoryAction";


const EditDialog = (props) => {

    const { openEditDialog, handleCloseEditDialog, dialogData } = props;
    const [value, setValue] = useState(dialogData.name);
    
    //redux
    const dispatch = useDispatch();
    const {
        isAddError,
        addError
    } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        setValue(dialogData.name);
        return () => {
            dispatch(setStateAddCategoryComplete());
        }
    }, [dialogData.name])

    //render
    return (
        <div>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        id="name"
                        label="โปรดระบุ Category"
                        type="text"
                        defaultValue={dialogData.name}
                        fullWidth
                        autoComplete="off"
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                    {
                        isAddError && (
                            <Box pt={4} px={5}>
                                <Typography variant="body1" color="error">
                                    {
                                        addError.message
                                    }
                                </Typography>
                            </Box>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(editCategory(dialogData.id, value, handleCloseEditDialog))
                        }}
                        color="primary"
                    >
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditDialog
