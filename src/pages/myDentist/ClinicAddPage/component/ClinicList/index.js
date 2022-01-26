import { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllClinic } from "../../../../../redux/actions/clinicAction";

//dialog
import DeleteDialog from "./dialog/DeleteDialog";

const ClinicList = (props) => {

    const { showFormEdit, setEditingFormData } = props;

    //redux instance
    const {
        clinic,
        unsubscribe,
    } = useSelector((state) => state.clinicReducer);
    const dispatch = useDispatch();

    //state
    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'image',
                field: 'image',
                width: 200,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'ClinicName',
                field: 'clinicName',
                width: 100,
            },
            {
                label: 'Telephone',
                field: 'telephone',
                width: 20,
            },
            {
                label: 'Address',
                field: 'address',
                width: 300,
            },
            {
                label: 'latitude',
                field: 'lat',
                width: 60,
            },
            {
                label: 'longtitude',
                field: 'lon',
                width: 60,
            },            
            {
                label: 'Article',
                field: 'article',
                width: 800,
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
        rows: clinic,
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteDialogData, setDeleteDialogData] = useState({});

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    let handleDeleteButton = async (id, clinicName, imageName) => {
        setDeleteDialogData({ 
            id, 
            clinicName, 
            imageName
        });
        handleClickOpenDeleteDialog();
    }

    let handleEditButton = (id, data, titleImage, imageName) => {
        setEditingFormData({ id, data, titleImage, imageName });
        showFormEdit();
    }

    //useEffect
    useEffect(() => {
        //load clinic
        dispatch(getAllClinic(handleEditButton, handleDeleteButton));
        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            if (unsubscribe)
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (clinic) {
            setDatatable({ ...datatable, rows: clinic });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clinic]);

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
            <DeleteDialog
                handleCloseDeleteDialog={handleCloseDeleteDialog}
                handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}
                openDeleteDialog={openDeleteDialog}
                dialogData={deleteDialogData}
            />
        </>
    )
}


export default ClinicList;
