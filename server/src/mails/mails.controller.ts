import {Controller, Get, Query} from '@nestjs/common';
import {MailsService} from './mails.service';
import {CategoriesService} from "../categories/categories.service";
import CategorizedMail from "./types/CategorizedMail";
import Mail from "./types/Mail";

@Controller('mails')
export class MailsController {
    constructor(
        private readonly appService: MailsService,
        private readonly categoriesService: CategoriesService
    ) {
    }

    @Get('categorized')
    async getCategorizedEmails(
        @Query('date') date: string // Accept date as a query parameter
    ): Promise<{ mails: CategorizedMail[]; syncTime: Date }> {
        // If no date is provided, fall back to today's date
        const fetchDate = date || new Date().toISOString().split('T')[0]; // Default to today's date
        console.log(`date=${fetchDate}`);
        const mails: Mail[] = await this.appService.getMailsByDay(fetchDate);

        const categorizedMails: CategorizedMail[] = await Promise.all(
            mails.map(async (mail) => {
                const categories: string[] = await this.categoriesService.categorizeEmail(mail.text);
                return {...mail, categories};
            })
        );

        return {syncTime: new Date(), mails: categorizedMails};
    }
}
