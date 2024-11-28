import { Test, TestingModule } from '@nestjs/testing';
import { MailsController } from './mails/mails.controller';
import { MailsService } from './mails/mails.service';

describe('AppController', () => {
  let appController: MailsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailsController],
      providers: [MailsService],
    }).compile();

    appController = app.get<MailsController>(MailsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
