import { CSSProperties } from 'react';

export const tableCellStyle: CSSProperties = {
    padding: '1rem', // Using rem for padding for better scalability
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

export const tableStyle: CSSProperties = {
    width: '100%', // Make the table responsive to the container width
    borderCollapse: 'collapse',
};

export const stickyHeaderStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
};

export const paginationContainerStyle: CSSProperties = {
    marginTop: '2rem', // Use rem for top margin
    textAlign: 'center',
};

export const paginationButtonStyle: CSSProperties = {
    marginRight: '1rem', // Use rem for margin
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: '#4CAF50', // Example color
    border: 'none',
    borderRadius: '0.3rem',
};

export const pageInfoStyle: CSSProperties = {
    margin: '0 1rem',
};
