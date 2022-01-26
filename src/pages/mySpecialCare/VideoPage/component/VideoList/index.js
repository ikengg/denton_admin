import { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllVideo } from "../../../../../redux/actions/videoAction";

//dialog
import DeleteDialog from "./dialog/DeleteDialog";

const VideoList = () => {

    //redux instance
    const {
        videosList,
        unsubscribe,
    } = useSelector((state) => state.videoReducer);
    const dispatch = useDispatch();

    //state
    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'title',
                field: 'title',
                width: 200,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'video',
                field: 'video',
                width: 100,
            },
            {
                label: 'Category',
                field: 'category',
                width: 20,
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
        rows: videosList,
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteDialogData, setDeleteDialogData] = useState({});

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteButton = async (id, title) => {
        setDeleteDialogData({
            id,
            title,
        });
        handleClickOpenDeleteDialog();
    }

    const handleEditButton = (id, name) => {

    };

    //useEffect
    useEffect(() => {
        //load video
        dispatch(getAllVideo(handleEditButton, handleDeleteButton));
        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            if (unsubscribe)
                unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (videosList) {
            setDatatable({ ...datatable, rows: videosList });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videosList]);


    return (
        <>
            <MDBDataTableV5
                hover
                entriesOptions={[10, 20, 30]}
                entries={10}
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

export default VideoList
