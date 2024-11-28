import { Injectable } from '@nestjs/common';
import * as Imap from 'imap';
import { simpleParser, ParsedMail } from 'mailparser';
import { Readable } from 'stream';
import { CategoriesService } from "../categories/categories.service";
import Mail from "./types/Mail";
import { ConfigService } from "@nestjs/config";
import { getMailConfig } from "../config";
import { connectToImap, openInbox } from "./imapUtils";

@Injectable()
export class MailsService {
    constructor(
        private readonly categoriesService: CategoriesService,
        private configService: ConfigService
    ) {}

    async getMailsByDay(date: string): Promise<Mail[]> {
        const imapConfig = getMailConfig(this.configService);
        const imap = new Imap(imapConfig);

        try {
            await connectToImap(imap);
            await openInbox(imap);

            const searchResults = await this.searchEmailsByDay(imap, date);

            if (searchResults.length === 0) {
                console.log(`No emails found for ${date}.`);
                return [];
            }

            return await this.fetchEmails(imap, searchResults);
        } catch (err) {
            console.error('Error while fetching emails:', err);
            throw new Error('Failed to fetch emails');
        } finally {
            imap.end();
        }
    }

    private searchEmailsByDay(imap: Imap, date: string): Promise<number[]> {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayString = nextDay.toISOString().split('T')[0];

        return new Promise((resolve, reject) => {
            // Search for emails between the start of the day and the next day
            imap.search(
                [['SINCE', date], ['BEFORE', nextDayString]], // Find emails only for the specified date
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    private async fetchEmails(imap: Imap, results: number[]): Promise<Mail[]> {
        const mails: Mail[] = [];
        const fetch = imap.fetch(results, { bodies: '' });

        return new Promise((resolve, reject) => {
            fetch.on('message', (msg: Imap.ImapMessage) => {
                msg.on('body', async (stream: Readable) => {
                    try {
                        const mail = await this.processEmail(stream);
                        if (mail) {
                            mails.push(mail);
                            const categories = await this.categoriesService.categorizeEmail(mail.text);
                            console.log(categories);
                        }
                    } catch (err) {
                        console.error('Error processing email:', err);
                    }
                });

                msg.once('end', () => {
                    console.log('Finished processing one email');
                });
            });

            fetch.once('end', () => {
                console.log('\nDone fetching emails.');
                resolve(mails);
            });

            fetch.once('error', reject);
        });
    }

    private async processEmail(stream: Readable): Promise<Mail | null> {
        try {
            const parsed: ParsedMail = await simpleParser(stream);
            return {
                from: parsed.from?.text,
                date: parsed.date,
                subject: parsed.subject,
                text: parsed.text,
            };
        } catch (err) {
            console.error('Error parsing email:', err);
            return null;
        }
    }
}
