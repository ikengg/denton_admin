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
    Grid,
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
import { addClinic, editClinic } from "../../../../../redux/actions/clinicAction";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "10px",
    },
    gridFlex: {
        flexGrow: 1,
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

// const schema = yup.object().shape({
//     image: yup.mixed().required('กรุณาเลือกรูปภาพ'),
//     clinicName: yup.string().required('กรุณากรอก clinicName'),
//     telephone: yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
//     location: yup.string().required('กรุณากรอกตำแหน่งที่ตั้ง'),
//     lat: yup.string().required('กรุณากรอก latitude'),
//     lon: yup.string().required('กรุณากรอก longtitude'),
//     article: yup.string().required('กรุณาเขียนบทความ'),
// });

const AddClinic = (props) => {

    const classes = useStyles();
    let { setIsFormShow, editFormData, setEditingFormData } = props;
    let clinicName, telephone, address, lat, lon, article, imageName, id = '';
    let titleImage = undefined;
    if (editFormData) {
        id = editFormData.id;
        clinicName = editFormData.data.clinicName;
        telephone = editFormData.data.telephone;
        address = editFormData.data.address;
        lat = editFormData.data.lat;
        lon = editFormData.data.lon;
        article = editFormData.data.article;
        titleImage = editFormData.titleImage;
        imageName = editFormData.imageName;
    }
    const schema = yup.object().shape({
        image: (id === '') ? yup.mixed().required('กรุณาเลือกรูปภาพ') : yup.mixed(),
        clinicName: (id === '') ? yup.string().required('กรุณากรอก clinicName') : yup.string(),
        telephone: (id === '') ? yup.string().required('กรุณากรอกเบอร์โทรศัพท์') : yup.string(),
        address: (id === '') ? yup.string().required('กรุณากรอกตำแหน่งที่ตั้ง') : yup.string(),
        lat: (id === '') ? yup.string().required('กรุณากรอก latitude') : yup.string(),
        lon: (id === '') ? yup.string().required('กรุณากรอก longtitude') : yup.string(),
        article: (id === '') ? yup.string().required('กรุณาเขียนบทความ') : yup.string(),
    });

    //redux instance
    const {
        isAddLoading,
        // isAddError,
    } = useSelector((state) => state.clinicReducer);
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
        console.log(acceptedFiles[0]);
        setValue("image", acceptedFiles[0]);
    };

    const clearImageValue = () => {
        console.log('clear');
        setValue("image", null);
    };

    const onSubmit = async (data) => {
        console.log(data);
        //editClinic
        if(id === ''){
            dispatch(addClinic(data, setIsFormShow))
        }else{
            dispatch(editClinic(id, data, imageName, setIsFormShow))
        }
    };

    useEffect(() => {
        register("article", { required: true });
        //register("image", { required: true });
    }, [register])

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
                        รูปคลินิก
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
                {/* clinicName */}
                <Box pt={4} px={5}>
                    <Controller
                        name="clinicName"
                        id="clinicName"
                        control={control}
                        defaultValue={clinicName}
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* Category */}
                                <TextField
                                    {...field}
                                    label="ชื่อคลินิก"
                                    variant="outlined"
                                    fullWidth
                                    error={!!formState.errors?.clinicName}
                                    // required
                                    autoComplete="off"
                                // autoFocus
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.clinicName &&
                                        formState.errors?.clinicName.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box>
                {/* telephone */}
                <Box pt={4} px={5}>
                    <Controller
                        name="telephone"
                        id="telephone"
                        control={control}
                        defaultValue={telephone}
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* Category */}
                                <TextField
                                    {...field}
                                    label="เบอร์โทรศัพท์"
                                    variant="outlined"
                                    fullWidth
                                    error={!!formState.errors?.telephone}
                                    // required
                                    autoComplete="off"
                                // autoFocus
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.telephone &&
                                        formState.errors?.telephone.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box>
                {/* address */}
                <Box pt={4} px={5}>
                    <Controller
                        name="address"
                        id="address"
                        control={control}
                        defaultValue={address}
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* Category */}
                                <TextField
                                    {...field}
                                    label="ที่อยู่"
                                    variant="outlined"
                                    fullWidth
                                    error={!!formState.errors?.address}
                                    // required
                                    autoComplete="off"
                                // autoFocus
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.address &&
                                        formState.errors?.address.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box>
                {/* lat */}
                <Box pt={4} px={5}>
                    <Grid container className={classes.gridFlex} spacing={2}>
                        <Grid item xs={2} >
                            <Controller
                                name="lat"
                                id="lat"
                                control={control}
                                defaultValue={lat}
                                rules={{ required: true }}
                                render={({ field, formState }) =>
                                    <>
                                        {/* Category */}
                                        <TextField
                                            {...field}
                                            label="latitude"
                                            variant="outlined"
                                            fullWidth
                                            error={!!formState.errors?.lat}
                                            // required
                                            autoComplete="off"
                                        // autoFocus
                                        />
                                        {/* error occur */}
                                        <Typography variant="body1" color="error">
                                            {
                                                !!formState.errors?.lat &&
                                                formState.errors?.lat.message
                                            }
                                        </Typography>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={2} >
                            <Controller
                                name="lon"
                                id="lon"
                                control={control}
                                defaultValue={lon}
                                rules={{ required: true }}
                                render={({ field, formState }) =>
                                    <>
                                        {/* Category */}
                                        <TextField
                                            {...field}
                                            label="longtitude"
                                            variant="outlined"
                                            fullWidth
                                            error={!!formState.errors?.lon}
                                            // required
                                            autoComplete="off"
                                        // autoFocus
                                        />
                                        {/* error occur */}
                                        <Typography variant="body1" color="error">
                                            {
                                                !!formState.errors?.lon &&
                                                formState.errors?.lon.message
                                            }
                                        </Typography>
                                    </>
                                }
                            />
                        </Grid>
                    </Grid>
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
                                    placeholder="รีวิวคลินิก..."
                                    bounds={'.app'}
                                    modules={AddClinic.modules}
                                    formats={AddClinic.formats}
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
                                    {id ? 'แก้ไข' : 'เพิ่ม'}
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

AddClinic.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};

AddClinic.formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default AddClinic;
