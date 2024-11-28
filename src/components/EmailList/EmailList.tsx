import React, { useState } from 'react';
import { useEmails } from '../../EmailContext';
import { tableCellStyle } from "./styles";

const EmailList: React.FC = () => {
    const { emails, isLoading } = useEmails();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const emailsPerPage = 10; // Number of emails per page, you can adjust this

    // Get the current emails for the page
    const indexOfLastEmail = currentPage * emailsPerPage;
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
    const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

    // Calculate total pages
    const totalPages = Math.ceil(emails.length / emailsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h2>Email Summaries</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
                    <th {...tableCellStyle}>Subject</th>
                    <th {...tableCellStyle}>From</th>
                    <th {...tableCellStyle}>Date</th>
                    <th {...tableCellStyle}>Categories</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={4} style={{ textAlign: 'center' }}>Loading...</td>
                    </tr>
                ) : (
                    currentEmails.map((email, index) => (
                        <tr key={index}>
                            <td {...tableCellStyle}>{email.subject}</td>
                            <td {...tableCellStyle}>{email.from}</td>
                            <td {...tableCellStyle}>
                                {new Date(email.date).toLocaleString()}
                            </td>
                            <td {...tableCellStyle}>
                                {email.categories.join(', ')}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ marginLeft: '10px' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmailList;
