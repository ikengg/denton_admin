
import { MDBDataTableV5 } from 'mdbreact';
import { useState, useEffect } from 'react';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../redux/actions/categoryAction";

const CategoryTable = (props) => {

    const { showFormEdit, setEditingFormData } = props;

    //redux instance
    const {
        category,
        unsubscribe,
    } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();

    //state
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'Image',
                field: 'categoryImage',
                width: 800,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Name',
                field: 'name',
                width: 800,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Edit',
                field: 'edit',
                width: 20,
            },
            {
                label: 'Delete',
                field: 'delete',
                width: 20,
            },
        ],
        rows: category,
    });

    //function
    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    let handleDeleteButton = async (id, name, categorImageName) => {
        setDialogData({ id, name, categorImageName });
        handleClickOpenDeleteDialog();
    };

    let handleEditButton = (id, name, categoryImage, categorImageName) => {
        // setDialogData({ id, name });
        // handleClickOpenEditDialog();
        setEditingFormData({ id, name, categoryImage, categorImageName })
        showFormEdit();
    };

    //useEffect
    useEffect(() => {
        //load category
        dispatch(getCategory(handleEditButton, handleDeleteButton));
        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            if (unsubscribe)
                unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (category) {
            console.log("cate change")
            setDatatable({ ...datatable, rows: category });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    //render
    return (
        <>
            <MDBDataTableV5
                hover
                entriesOptions={[50, 200, 250]}
                entries={50}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false}
            />
            <EditDialog
                handleCloseEditDialog={handleCloseEditDialog}
                handleClickOpenEditDialog={handleClickOpenEditDialog}
                openEditDialog={openEditDialog}
                dialogData={dialogData}
            />
            <DeleteDialog
                handleCloseDeleteDialog={handleCloseDeleteDialog}
                handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}
                openDeleteDialog={openDeleteDialog}
                dialogData={dialogData}
            />
        </>
    );
}

export default CategoryTable;
