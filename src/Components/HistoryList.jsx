import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

const HistoryList = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchHistory = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      const response = await axios.get('https://bookify-new.onrender.com/api/v1/history', {
        headers: {
          token: token, // Correct header for the token
        },
      });

      if (response.data && response.data.history) {
        setHistory(response.data.history);
        setMessage(response.data.message);
      } else {
        setError('No history found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const removeFromHistoryList = async (historyId) => {
    console.log("History ID to remove:", historyId); // Debugging line
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`https://bookify-new.onrender.com/api/v1/history/${historyId}`, {
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data.message);
      // Immediately remove the book from the history state
      setHistory(history.filter((item) => item._id !== historyId));
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) return <div className='text-center my-5'>
  <InfinitySpin
      visible={true}
      width="200"
      color='rgba(9, 116, 115, 1)'
      ariaLabel="infinity-spin-loading"
  />
</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your History</h1>
      {message && <div style={styles.message}>{message}</div>}
      <ul style={styles.list}>
        {history.map((item) => (
          <li key={item._id} style={styles.listItem}>
            <h2 style={styles.bookTitle}>{item.bookId.title}</h2>
            <p style={styles.bookDescription}>{item.bookId.description}</p>
            <p style={styles.bookAction}>Action: {item.action}</p>
            <button onClick={() => removeFromHistoryList(item._id)} style={styles.deleteButton}>
              Remove From History
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '15px',
    borderBottom: '1px solid #ddd',
  },
  bookTitle: {
    fontSize: '1.2em',
    margin: '0 0 10px',
    color: '#3498db',
  },
  bookDescription: {
    fontSize: '1em',
    margin: '0 0 10px',
    color: '#555',
  },
  bookAction: {
    fontSize: '0.9em',
    margin: '0 0 10px',
    color: '#888',
  },
  deleteButton: {
    padding: '10px 15px',
    backgroundColor:   'rgba(9, 116, 115, 1)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#28a745',
  },
};

export default HistoryList;
