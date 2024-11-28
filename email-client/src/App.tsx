import React from 'react';
import {EmailProvider} from './EmailContext';
import EmailList from './components/EmailList/EmailList';
import EmailCategoryChart from './components/EmailCategoryChart/EmailCategoryChart';
import {useEmails} from './EmailContext';

const App: React.FC = () => {
    const {refreshEmails, isLoading, syncTime} = useEmails(); // Access the refreshEmails function and syncTime from the context

    return (
        <EmailProvider>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: '20px'
            }}>
                <h1>Email Management</h1>

                {/* Refresh Button placed at the top of the page */}
                <button
                    onClick={refreshEmails}
                    disabled={isLoading}  // Disable button when loading
                    style={{marginBottom: '20px'}}
                >
                    {isLoading ? 'Refreshing...' : 'Refresh Emails'}
                </button>

                {/* Last Sync Time */}
                {syncTime && (
                    <div style={{marginBottom: '20px'}}>
                        <strong>Last Sync Time: </strong>{syncTime}
                    </div>
                )}

                {isLoading ?
                    <div>
                        <div>Loading emails...</div>
                        <div>Loading chart...</div>
                    </div> : <div><EmailList/>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <EmailCategoryChart/>
                        </div>
                    </div>
                }
            </div>
        </EmailProvider>
    );
};

export default App;
