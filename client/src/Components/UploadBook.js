import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { CardContent, TextField, Link } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UploadBook = () => {
    const [fname, setFName] = useState('');
    const [file, setFile] = useState(null); // State to store the uploaded image
    const [bookFile, setBookFile] = useState(null); // State to store the uploaded book PDF
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const history = useNavigate();

    const setdata = (e) => {
        setFName(e.target.value.toLowerCase());
    };

    const addUserData = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append('photo', file); // Uploaded image
        formData.append('bookFile', bookFile); // Uploaded book PDF
        formData.append('bookName', fname);
        formData.append('author', author);
        formData.append('description', description);


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axios.post('http://localhost:5000/api/user/content/books', formData, config);
        console.log(res)

        if (res.data.status === 201) {
            history('/');
        } else {
            console.log('error');
        }
    };

    return (
        <Card style={{ width: '50%', margin: 'auto' }}>
            <CardContent>
                <TextField required label="BookName" name="fname" variant="standard" onChange={setdata} />
            </CardContent>
            <CardContent>
                <TextField required label="Author" name="author" variant="standard" onChange={(e) => setAuthor(e.target.value)} />
            </CardContent>
            <CardContent style={{ height: '80px' }}>
                <TextField required name="description" label="Descripton" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
            </CardContent>
            <CardContent>
                {file ? (
                    <Link href={URL.createObjectURL(file)} target="_blank">
                        View Uploaded Image
                    </Link>
                ) : (
                    <>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            name="photo"
                            onChange={(e) => setFile(e.target.files[0])} // Set the selected image file to the 'file' state
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" style={{ marginBottom: '10px' }} component="span">
                                Upload Image
                            </Button>
                        </label>
                    </>
                )}
            </CardContent>
            <CardContent>
                {bookFile?(
                    <Link href={URL.createObjectURL(bookFile)} target="_blank">
                    View Uploaded File
                </Link>
                ):(
                    <>
                        <input
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    id="raised-button-file-pdf"
                    type="file"
                    onChange={(e) => setBookFile(e.target.files[0])} // Set the selected PDF file to the 'bookFile' state
                />
                <label htmlFor="raised-button-file-pdf">
                    <Button variant="outlined" style={{ marginBottom: '10px' }} component="span">
                        Upload Book PDF
                    </Button>
                </label>                    
                    </>
                )
                }
            </CardContent>
            <CardContent>
                <Button variant="contained" style={{ marginBottom: '10px' }} onClick={addUserData}>
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};

export default UploadBook;