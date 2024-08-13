import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', is_borrowed: 0, student_id: null });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/book');
            if (Array.isArray(response.data)) {
                setBooks(response.data);
            } else {
                console.error('Unexpected data format:', response.data);
                setBooks([]);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
        }
    };

    const handleAddBook = async () => {
        try {
            await axios.post('http://localhost:8080/book', newBook);
            setNewBook({ title: '', author: '', is_borrowed: 0, student_id: null });
            fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/book/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Add New Book Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Is Borrowed (1 for yes, 0 for no)"
                        value={newBook.is_borrowed}
                        onChange={(e) => setNewBook({ ...newBook, is_borrowed: Number(e.target.value) })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Student ID (if borrowed)"
                        value={newBook.student_id || ''}
                        onChange={(e) => setNewBook({ ...newBook, student_id: e.target.value ? Number(e.target.value) : null })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddBook}
                        className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                    >
                        Add Book
                    </button>
                </div>
            </div>

            {/* Books List Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Books List</h2>
                <ul className="space-y-4">
                    {books.length === 0 ? (
                        <li>No books available</li>
                    ) : (
                        books.map(book => (
                            <li key={book.book_id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="text-xl font-semibold">{book.title}</h3>
                                    <p className="text-gray-600">by {book.author}</p>
                                    <p className={`text-sm ${book.is_borrowed ? 'text-red-500' : 'text-green-500'}`}>
                                        {book.is_borrowed ? 'Borrowed' : 'Available'}
                                    </p>
                                    {book.student_id && <p className="text-sm text-gray-500">Borrowed by Student ID: {book.student_id}</p>}
                                </div>
                                <button
                                    onClick={() => handleDeleteBook(book.book_id)}
                                    className="ml-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default LibraryPage;
