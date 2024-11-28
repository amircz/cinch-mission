import React, { useState } from 'react';
import { useEmails } from '../../context/EmailContext';
import EmailList from '../EmailList/EmailList';
import EmailCategoryChart from '../EmailCategoryChart/EmailCategoryChart';
import mainPageStyles from './styles';

const MainPage: React.FC = () => {
    const { refreshEmails, isLoading, syncTime } = useEmails(); // Access context values
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    });

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        refreshEmails(newDate);
    };

    const handleRefreshClick = () => {
        const today = getTodayDate();
        setSelectedDate(today);
        refreshEmails(today);
    };

    return (
        <div style={mainPageStyles.container}>
            <h1 style={mainPageStyles.header}>Email Management</h1>

            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={getTodayDate()} // Block future dates by setting the max attribute
                style={mainPageStyles.datePicker}
            />

            <button
                onClick={handleRefreshClick}
                disabled={isLoading}
                style={{
                    ...mainPageStyles.refreshButton,
                    ...(isLoading ? mainPageStyles.refreshButtonDisabled : {}),
                }}
            >
                {isLoading ? 'Refreshing...' : 'Refresh Emails'}
            </button>

            {syncTime && (
                <div style={mainPageStyles.syncTime}>
                    <strong>Last Sync Time: </strong>
                    {syncTime}
                </div>
            )}

            {isLoading ? (
                <div style={mainPageStyles.loadingText}>
                    <div>Loading emails...</div>
                    <div>Loading chart...</div>
                </div>
            ) : (
                <div style={mainPageStyles.contentWrapper}>
                    <EmailList />
                    <div style={mainPageStyles.chartWrapper}>
                        <EmailCategoryChart />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
