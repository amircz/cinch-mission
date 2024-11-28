import {ConfigService} from "@nestjs/config";

export const getMailConfig = (configService: ConfigService) => {
    return {
        user: configService.get<string>('MAIL_USER'), // Your email address
        password: configService.get<string>('MAIL_PASSWORD'),    // Your email password or app password
        host: configService.get<string>('MAIL_HOST'),      // IMAP server for Gmail
        port: configService.get<number>('MAIL_PORT'),                   // IMAP port (default for SSL/TLS)
        tls: true,                   // Enable TLS
        tlsOptions: {
            rejectUnauthorized: false,  // Allow self-signed certificates
        },
    }
}