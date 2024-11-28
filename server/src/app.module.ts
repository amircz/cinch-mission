import {Module} from '@nestjs/common';
import {MailsController} from './mails/mails.controller';
import {MailsService} from './mails/mails.service';
import {CategoriesService} from './categories/categories.service';
import {ConfigModule} from '@nestjs/config';


@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    })],
    controllers: [MailsController],
    providers: [MailsService, CategoriesService],
})
export class AppModule {
}
