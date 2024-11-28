import * as Imap from 'imap';

export const connectToImap = (imap: Imap): Promise<void> => {
    return new Promise((resolve, reject) => {
        imap.once('ready', resolve);
        imap.once('error', reject);
        imap.connect();
    });
}

export const openInbox = (imap: Imap): Promise<void> => {
    return new Promise((resolve, reject) => {
        imap.openBox('INBOX', true, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}
