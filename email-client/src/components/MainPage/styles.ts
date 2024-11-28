import { CSSProperties } from 'react';

const mainPageStyles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column', // TypeScript knows 'column' is a valid value
        alignItems: 'center',
        textAlign: 'center',
        margin: '2rem',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '1.5rem',
    },
    datePicker: {
        marginBottom: '1.5rem',
        padding: '0.5em',
        fontSize: '1rem',
        width: '90%',
        maxWidth: '20rem',
    },
    refreshButton: {
        marginBottom: '1.5rem',
        padding: '0.75em 1.5em',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        width: '90%',
        maxWidth: '15rem',
    },
    refreshButtonDisabled: {
        cursor: 'not-allowed',
        opacity: 0.7,
    },
    syncTime: {
        marginBottom: '1.5rem',
        fontSize: '1rem',
    },
    loadingText: {
        fontSize: '1.25rem',
    },
    contentWrapper: {
        width: '100%',
    },
    chartWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '1rem',
    },
};

export default mainPageStyles;
