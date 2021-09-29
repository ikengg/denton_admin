import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//redux
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../../redux/actions/categoryAction";

const DeleteDialog = (props) => {
    const {handleCloseDeleteDialog, handleClickOpenDeleteDialog, openDeleteDialog, dialogData } = props;
    const dispatch = useDispatch();
    return (
        <div>
            <Dialog open={openDeleteDialog} onClose={handleClickOpenDeleteDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ยืนยันการลบหมวดหมู่ <b><i>"{dialogData.name}"</i></b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => {
                            dispatch(deleteCategory(dialogData.id, handleCloseDeleteDialog));
                        }} 
                        color="secondary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteDialog
