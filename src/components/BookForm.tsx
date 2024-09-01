import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBooksById, updateBook } from '../services/api';

interface Book {
    name: string;
    author: string;
    price: number;
    quantity: number;
}

function BookForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book>({
        name: '',
        author: '',
        price: 0,
        quantity: 0,
    });

    useEffect(() => {
        if (id) {
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            const response = await getBooksById(id as string);
            setBook(response.data);
        } catch (error) {
            console.error("Error loading book data", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateBook(id, book);
            } else {
                await createBook(book);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving book", error);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="book-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={book.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="back-home-button" onClick={handleBackToHome}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default BookForm;
