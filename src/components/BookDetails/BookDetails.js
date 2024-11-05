// src/components/BookDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Construct the URL for fetching book details
    const SEARCH_URL = `https://www.googleapis.com/books/v1/volumes/${id}`;

    React.useEffect(() => {
        // Fetch book details using the ID
        axios.get(SEARCH_URL)
            .then(response => {
                setBook(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, [SEARCH_URL]);

    if (isLoading) {
        return <div>Loading book details...</div>;
    }

    if (error) {
        return <div>Error fetching book details: {error.message}</div>;
    }

    return (
        <div className="book-details">
            <h2>{book.volumeInfo?.title}</h2>
            <img src={book.volumeInfo?.imageLinks?.thumbnail} alt="Book cover" />
            <h4>by {book.volumeInfo?.authors?.join(', ')}</h4>
            <p><strong>Description:</strong> {book.volumeInfo?.description || "No description available."}</p>
            <p><strong>Published Date:</strong> {book.volumeInfo?.publishedDate || "Not available."}</p>
            <p><strong>Page Count:</strong> {book.volumeInfo?.pageCount || "Not available."}</p>
            <p><strong>Categories:</strong> {book.volumeInfo?.categories?.join(', ') || "Not available."}</p>
            <a href={book.volumeInfo?.infoLink} target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
        </div>
    );
};

export default BookDetails;
