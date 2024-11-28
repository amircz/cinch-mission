import React, {useState} from 'react';
import {useEmails} from '../../context/EmailContext';
import {
    tableCellStyle,
    tableStyle,
    stickyHeaderStyle,
    paginationContainerStyle,
    paginationButtonStyle,
    pageInfoStyle
} from './styles';

const EmailList: React.FC = () => {
    const {emails, isLoading} = useEmails();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const emailsPerPage: number = 10

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
            <table style={tableStyle}>
                <thead>
                <tr style={stickyHeaderStyle}>
                    <th style={tableCellStyle}>Subject</th>
                    <th style={tableCellStyle}>From</th>
                    <th style={tableCellStyle}>Date</th>
                    <th style={tableCellStyle}>Categories</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={4} style={{textAlign: 'center'}}>Loading...</td>
                    </tr>
                ) : (
                    currentEmails.map((email, index) => (
                        <tr key={index}>
                            <td style={tableCellStyle}>{email.subject}</td>
                            <td style={tableCellStyle}>{email.from}</td>
                            <td style={tableCellStyle}>
                                {new Date(email.date).toLocaleString()}
                            </td>
                            <td style={tableCellStyle}>
                                {email.categories.join(', ')}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div style={paginationContainerStyle}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={paginationButtonStyle}
                >
                    Previous
                </button>
                <span style={pageInfoStyle}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={paginationButtonStyle}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmailList;
