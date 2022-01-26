//import lib
import { useEffect } from 'react';
import {
    // Grid,
    Button,
    TextField,
    CircularProgress,
    // Container,
    Box,
    Typography
} from '@material-ui/core';
import ImageUpload from './ImageUpload';
//form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import {
    useForm,
    Controller
} from "react-hook-form";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addCategory, setStateAddCategoryComplete, editCategory } from "../../../../../redux/actions/categoryAction";

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
    }

}));


const CategoryForm = (props) => {

    let { editFormData, setEditingFormData } = props;
    let name, id , categorImageName = '';
    let categoryImage = undefined;
    if (editFormData) {
        name = editFormData.name;
        id = editFormData.id;
        categoryImage = editFormData.categoryImage;
        categorImageName = editFormData.categorImageName;
        console.log(categoryImage);
    }

    const schema = yup.object().shape({
        name: yup.string().required('กรุณากรอก Category'),
        image: (id === '') ? yup.mixed().required('กรุณาเลือกรูปภาพ') : yup.mixed(),
    });

    const classes = useStyles();
    const {
        handleSubmit,
        control,
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(schema)
    });

    const imageContent = watch("image");

    const {
        isAddLoading,
        isAddError,
        addError,
    } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();

    const setImageValue = (acceptedFiles) => {
        console.log(acceptedFiles[0]);
        setValue("image", acceptedFiles[0]);
    };

    const clearImageValue = () => {
        console.log('clear');
        setValue("image", null);
    };


    const onSubmit = async (data) => {
        console.log(id);
        if (!id) {
            dispatch(addCategory(data, props.setIsFormShow));
        } else {
            // dispatch(editCategory(id, name, props.setIsFormShow));  
            dispatch(editCategory(id, data, categorImageName, props.setIsFormShow));
        }

    };

    useEffect(() => {

    }, [isAddError]);

    useEffect(() => {
        return () => {
            dispatch(setStateAddCategoryComplete());
            setEditingFormData(undefined);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {id && <Box pt={4} px={5}>แก้ไข</Box>}
                <Box pt={4} px={5}>
                    {/* cat name */}
                    <Controller
                        name="name"
                        id="name"
                        control={control}
                        defaultValue={name}
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* Category */}
                                <TextField
                                    {...field}
                                    label="Category name"
                                    variant="outlined"
                                    // value={name}
                                    fullWidth
                                    error={!!formState.errors?.name}
                                    // required
                                    autoComplete="off"
                                    autoFocus
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.name &&
                                        formState.errors?.name.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box >
                {/* if edit show image too */}
                <Box pt={4} px={5} display="flex" justifyContent="center">
                    {categoryImage && (
                        <img
                            src={categoryImage}
                            height={50}
                            width={50}
                            alt={name}
                        />
                    )}
                </Box>
                {/* image upload */}
                <Box pt={4} px={5}>
                    <Typography variant="body2">
                        {id && 'แก้ไข'}รูปหมวดหมู่
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

        </div>
    )
}

export default CategoryForm
