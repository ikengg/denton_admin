import { 
    // useState, 
    useEffect 
} from 'react';
import ReactQuill from 'react-quill';
//mui
import {
    Button,
    TextField,
    CircularProgress,
    Box,
    Typography,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
    useForm,
    Controller
} from "react-hook-form";
import ImageUpload from './ImageUpload';
//redux
import { useDispatch, useSelector } from "react-redux";
import { addArticle, editArticle } from "../../../../../redux/actions/newsAction";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "10px",
    },
    paper: {
        borderRadius: "25px;",
        padding: "3rem"
    },
    box: {
        borderRadius: "25px;",
    },
    button: {
        color: "white",
        backgroundColor: "#B898FF",
        '&:hover': {
            backgroundColor: "#B898FF",
            color: "black",
        },
    },
    formControl: {
        //margin: theme.spacing(1),
        marginTop: 25,
        minWidth: 500,
    },

}));


const AddArticle = (props) => {

    let { setIsFormShow, editFormData, setEditingFormData } = props;
    let title , article, imageName, id = '';
    let titleImage = undefined;
    if (editFormData) {
        id = editFormData.id;
        title = editFormData.data.title;
        article = editFormData.data.article;
        titleImage = editFormData.data.titleImage;
        imageName = editFormData.data.imageName;
    }

    const schema = yup.object().shape({
        image: (id === '') ?yup.mixed().required('กรุณาเลือกรูปภาพ') :yup.mixed() ,
        title: (id === '') ?yup.string().required('กรุณากรอก title') :yup.string(),
        article: (id === '') ?yup.string().required('กรุณาเขียนบทความ') :yup.string(),
    });

    const classes = useStyles();

    //redux instance
    const {
        isAddLoading,
        // isAddError,
    } = useSelector((state) => state.articleReducer);
    const dispatch = useDispatch();

    // react-hook-form
    const {
        handleSubmit,
        control,
        watch,
        setValue,
        register
    } = useForm({
        resolver: yupResolver(schema)
    });

    // react-hook-form value watcher
    const editorContent = watch("article");
    const imageContent = watch("image");

    const handleArticleChange = (value) => {
        setValue("article", value);
    }

    const setImageValue = (acceptedFiles) => {
        //TODO: rename image
        console.log(acceptedFiles[0]);
        setValue("image", acceptedFiles[0]);
    };

    const clearImageValue = () => {
        console.log('clear');
        setValue("image", null);
    };

    const onSubmit = async (data) => {
        // console.log(data);
        data.tag = 'news';
        if(id === ''){
            dispatch(addArticle(data, setIsFormShow))
        }else{
            dispatch(editArticle(id, data, imageName, setIsFormShow))
        }
    };

    useEffect(() => {
        register("article", { required: true });
        //register("category", { required: true });
        //register("image", { required: true });
    }, [register]);

    useEffect(() => {
        return () => {
            setEditingFormData(undefined);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    id && <Box pt={4} px={5}>แก้ไข</Box>
                }
                {/* if edit show image too */}
                <Box pt={4} px={5} display="flex" justifyContent="center">
                    {titleImage && (
                        <img
                            src={titleImage}
                            width={400}
                            height={250}                            
                            alt={imageName}
                        />
                    )}
                </Box>
                {/* image upload */}
                <Box pt={4} px={5}>
                    <Typography variant="body2">
                        { id && 'แก้ไข'}รูปปกข่าว
                    </Typography>
                    <Controller
                        control={control}
                        defaultValue=''
                        value={imageContent}
                        render={({ field, formState }) => (
                            <>
                                <ImageUpload
                                    {...field}
                                    setImageValue={setImageValue}
                                    clearImageValue={clearImageValue}
                                    error={!!formState.errors?.image}
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.image &&
                                        formState.errors?.image.message
                                    }
                                </Typography>
                            </>
                        )}
                    />
                </Box>
                {/* title */}
                <Box pt={4} px={5}>
                    <Controller
                        name="title"
                        id="title"
                        control={control}
                        defaultValue={title}
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* Category */}
                                <TextField
                                    {...field}
                                    label="หัวข้อข่าว"
                                    variant="outlined"
                                    fullWidth
                                    error={!!formState.errors?.title}
                                    // required
                                    autoComplete="off"
                                // autoFocus
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.title &&
                                        formState.errors?.title.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box>
                {/* article */}
                <Box pt={4} px={5}>
                    <Controller
                        name="article"
                        id="article"
                        control={control}
                        defaultValue={article || ''}
                        value={editorContent}
                        // rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* article */}
                                <ReactQuill
                                    {...field}
                                    // value={editorContent}
                                    onChange={handleArticleChange}
                                    theme={"snow"}
                                    placeholder="เขียนข่าว..."
                                    bounds={'.app'}
                                    modules={AddArticle.modules}
                                    formats={AddArticle.formats}
                                    error={!!formState.errors?.article}
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.article &&
                                        formState.errors?.article.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box>
                {/* submit button */}
                <Box p={2} mt={2} display="flex" justifyContent="center">
                    {!isAddLoading
                        ? (
                            <Button
                                //size="large"
                                variant="contained"
                                //color="primary"
                                className={classes.button}
                                type="submit"
                            >
                                <Typography variant="body1">
                                    {id ?'แก้ไข' :'เพิ่ม'}
                                </Typography>
                            </Button>
                        )
                        : <CircularProgress />
                    }
                </Box>
            </form>
        </>
    )
}

AddArticle.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};

AddArticle.formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default AddArticle;
