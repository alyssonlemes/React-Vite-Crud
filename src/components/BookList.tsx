import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';

interface Book {
    id: string;
    name: string;
    author: string;
    price: number;
    quantity: number;
}

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const response = await getBooks();
        setBooks(response.data);
    };

    const handleDelete = async (id: string) => {
        await deleteBook(id);
        loadBooks();
    };

    return (
        <div className="book-list-container">
            <h1>Book List</h1>
            
            <ul>
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        <div className="book-info">
                            {book.name} - ${book.price} - {book.quantity} units
                        </div>
                        <Link to={`/edit/${book.id}`} className="edit-book-button">Edit</Link>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <Link to="/add" className="add-book-button">Add Book</Link>
        </div>
    );
}

export default BookList;
