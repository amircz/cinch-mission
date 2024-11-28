export const tableCellStyle = {
    style: {
        border: '1px solid #ddd',
        padding: '0.5rem',
        fontSize: '1rem',
        '@media (max-width: 768px)': {  // For tablets and smaller screens
            padding: '0.3rem',  // Reduced padding for small screens
            fontSize: '0.875rem', // Slightly smaller font for small screens
        },
        '@media (max-width: 480px)': {  // For mobile screens
            padding: '0.2rem',  // Even smaller padding
            fontSize: '0.75rem', // Even smaller font for mobile
        }
    }
};
