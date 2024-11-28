import {Controller, Get} from '@nestjs/common';
import {MailsService} from './mails.service';
import {CategoriesService} from "../categories/categories.service";
import CategorizedMail from "./types/CategorizedMail";
import Mail from "./types/Mail";
@Controller('mails')
export class MailsController {
    constructor(private readonly appService: MailsService, private readonly categoriesService: CategoriesService) {
    }

    @Get('categorized')
    async getHello(): Promise<{mails:CategorizedMail[], syncTime: Date }> {
        const mails: Mail[] = await this.appService.getMailsToday();
        const categorizedMails:CategorizedMail[]= await Promise.all(mails.map(async (mail) => {
            const categories: string[] = await this.categoriesService.categorizeEmail(mail.text);
            return {...mail, categories: categories};
        }));
        return {syncTime:new Date(),mails:categorizedMails}
    }
}
