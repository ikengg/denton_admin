//import lib
import { useEffect } from 'react';
import {
    Grid,
    Button,
    TextField,
    CircularProgress,
    Container,
    Box,
    Typography
} from '@material-ui/core';

//form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import {
    useForm,
    Controller
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, setStateAddCategoryComplete } from "../../../../redux/actions/categoryAction";


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

const schema = yup.object().shape({
    name: yup.string().required('กรุณากรอก Category'),
});

const CategoryForm = (props) => {

    const classes = useStyles();
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const {
        isAddLoading,
        isAddError,
        addError
    } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();


    const onSubmit = async (data) => {
        dispatch(addCategory(data.name, props.setIsFormShow));
    };

    useEffect(() => {   

    }, [isAddError]);

    useEffect(() => {
        return () => {
            dispatch(setStateAddCategoryComplete());
        }
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box pt={4} px={5}>
                    <Controller
                        name="name"
                        id="name"
                        control={control}
                        defaultValue=''                        
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                {/* Category */}
                                <TextField
                                    {...field}
                                    label="Category name"
                                    variant="outlined"
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
                                    เพิ่ม
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
