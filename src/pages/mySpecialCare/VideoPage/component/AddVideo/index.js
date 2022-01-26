import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube'

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
import CategorySelector from './CategorySelector';

//redux
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../../../../../redux/actions/videoAction";

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

const schema = yup.object().shape({
    title: yup.string().required('กรุณากรอก title'),
    category: yup.string().required('กรุณาเลือกหมวดหมู่'),
    videoUrl: yup.string().required('กรุณาใส่ video url'),
});

const AddVideo = ({ setIsFormShow }) => {

    const classes = useStyles();

    //redux instance
    const {
        isAddLoading,
        // isAddError,
    } = useSelector((state) => state.videoReducer);
    const dispatch = useDispatch();

    // react-hook-form
    const {
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
        register
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [errorVideoCanNotPlay, setErrorVideoCanNotPlay] = useState(false);

    // react-hook-form value watcher
    const categoryContent = watch("category");

    const handleChangeSelete = (event) => {
        console.log(event.target.value);
        setValue("category", event.target.value);
    };

    const onSubmit = async (data) => {
        if (ReactPlayer.canPlay(data.videoUrl)) {
            setErrorVideoCanNotPlay(false);
            console.log(data);
            dispatch(addVideo(data, setIsFormShow));
        } else {
            setErrorVideoCanNotPlay(true);
        }
        // dispatch(addVideo(data, setIsFormShow))
    };

    //useEffect
    useEffect(() => {
        register("category", { required: true });
        //register("category", { required: true });
        //register("image", { required: true });
    }, [register])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues("videoUrl")]);

    useEffect(() => {        
    }, [isAddLoading])


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* title */}
                <Box pt={4} px={5}>
                    <Controller
                        name="title"
                        id="title"
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                <TextField
                                    {...field}
                                    label="หัวข้อ"
                                    variant="outlined"
                                    fullWidth
                                    error={!!formState.errors?.title}
                                    autoComplete="off"
                                    autoFocus
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
                {/* videoUrl */}
                <Box pt={4} px={5}>
                    <Controller
                        name="videoUrl"
                        id="videoUrl"
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={({ field, formState }) =>
                            <>
                                <TextField
                                    {...field}
                                    label="youtube video link"
                                    variant="outlined"
                                    fullWidth
                                    error={!!formState.errors?.videoUrl}
                                    autoComplete="off"
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.videoUrl &&
                                        formState.errors?.videoUrl.message
                                    }
                                </Typography>
                            </>
                        }
                    />
                </Box>
                {/* select category */}
                <Box pt={4} px={5}>
                    <Controller
                        name="category"
                        id="category"
                        control={control}
                        defaultValue=''
                        value={categoryContent}
                        render={({ field, formState }) => (
                            <>
                                <CategorySelector
                                    {...field}
                                    handleChangeSelete={handleChangeSelete}
                                    error={!!formState.errors?.category}
                                />
                                {/* error occur */}
                                <Typography variant="body1" color="error">
                                    {
                                        !!formState.errors?.category &&
                                        formState.errors?.category.message
                                    }
                                </Typography>
                            </>
                        )}

                    />


                </Box>
                {/* video Render */}
                <Box pt={4} px={5} display="flex" justifyContent="center">
                    {ReactPlayer.canPlay(getValues("videoUrl")) && (
                        <ReactPlayer
                            url={getValues("videoUrl")}
                            width='50%'
                            height='50%'
                        />
                    )}
                </Box>
                <Box pt={4} px={5} display="flex" justifyContent="center">
                    {/* error occur */}
                    <Typography variant="body1" color="error">
                        {
                            errorVideoCanNotPlay &&
                            "Video URL ที่ท่านเลือกไม่สามารถเล่นได้"
                        }
                    </Typography>
                </Box>
                {/* submit button */}
                <Box p={2} mt={2} display="flex" justifyContent="center">
                    {isAddLoading
                        ? <CircularProgress />
                        : (
                            <Button
                                variant="contained"
                                className={classes.button}
                                type="submit"
                            >
                                <Typography variant="body1">
                                    เพิ่ม
                                </Typography>
                            </Button>
                        )
                    }
                </Box>
            </form>
        </>
    )
}

export default AddVideo;
