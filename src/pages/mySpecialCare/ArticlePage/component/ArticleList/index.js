import { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

//redux
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { getAllArticle } from "../../../../../redux/actions/articleAction";

//dialog
import DeleteDialog from "./dialog/DeleteDialog";

const ArticleList = (props) => {

    const { showFormEdit, setEditingFormData } = props;

    //redux instance
    const {
        article,
        unsubscribeArticle,
    } = useSelector((state) => state.articleReducer);
    const dispatch = useDispatch();

    //state
    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'titleImage',
                field: 'titleImage',
                width: 200,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Title',
                field: 'title',
                width: 100,
            },
            {
                label: 'Category',
                field: 'category',
                width: 20,
            },
            //article
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
        rows: article,
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteDialogData, setDeleteDialogData] = useState({});

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    let handleDeleteButton = async (id, title, imageName) => {
        setDeleteDialogData({
            id,
            title,
            imageName
        });
        handleClickOpenDeleteDialog();
    };

    let handleEditButton = (id, data, titleImage, imageName) => {
        setEditingFormData({ id, data, titleImage, imageName });
        showFormEdit();
    };

    //useEffect
    useEffect(() => {
        //load category
        dispatch(getAllArticle(handleEditButton, handleDeleteButton, 'article'));
        return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            if (unsubscribeArticle)
                unsubscribeArticle();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (article) {
            setDatatable({ ...datatable, rows: article });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article]);

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


export default ArticleList;
