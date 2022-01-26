import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Grid,
    Button
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BackupIcon from '@material-ui/icons/Backup';

const ImageUpload = ({ setImageValue, clearImageValue, ...rest }) => {

    const [files, setFiles] = useState([]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        // accept: 'image/*',
        accept: 'image/png, image/jpg, image/jpeg',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {

            //rename file
            const renamedAcceptedFiles = acceptedFiles.map((file) => {
                const name = "article_" + new Date().getTime() + "." + file.name.split(".")[1];
                return new File([file], `${name}`, {
                    type: file.type,
                    preview: URL.createObjectURL(file)
                });
            })

            //set file to preview
            setFiles(renamedAcceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            console.log(renamedAcceptedFiles[0]);

            //setFile to react-hook-form
            setImageValue(renamedAcceptedFiles);
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const removeImage = () => {
        setFiles([]);
        clearImageValue();
    }

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <Button
                    onClick={removeImage}
                >
                    <HighlightOffIcon />
                </Button>
                <img
                    src={file.preview}
                    style={img}
                    alt="img"
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <Grid
                container
                justify="center"
                style={thumbsContainer}
            >
                {thumbs}
            </Grid>
            <div
                {...getRootProps({ style })}
            >
                <input
                    {...rest}
                    {...getInputProps()}
                />
                <p>Drag 'n' drop some files here, or click to select files </p><BackupIcon fontSize="large"/>
            </div>
        </section>
    )
}

var thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

var thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 250,
    height: 200,
    padding: 4,
    boxSizing: 'border-box'
};

var thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

var img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

var baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

var activeStyle = {
    borderColor: '#2196f3'
};

var acceptStyle = {
    borderColor: '#00e676'
};

var rejectStyle = {
    borderColor: '#ff1744'
};

export default ImageUpload;
