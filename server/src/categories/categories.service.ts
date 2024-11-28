import {Injectable} from '@nestjs/common';
import {LanguageServiceClient} from "@google-cloud/language";

@Injectable()
export class CategoriesService {

    // Method to categorize email content using Google Cloud's NLP API
    async categorizeEmail(emailContent: string): Promise<string[]> {
        try {
            // Instantiate the Google NLP client
            const client = new LanguageServiceClient();

            // Define the document to be classified
            const document = {
                content: emailContent,
                type: 'PLAIN_TEXT' as 'PLAIN_TEXT',  // Correct type assignment
            };

            // Call Google Cloud's classifyText API
            const [result] = await client.classifyText({document});


            return result.categories.flatMap(category =>
                category.name.split('/').filter(cat => cat.trim() !== '')
            )
        } catch (error) {
            console.error(`Error categorizing email:${emailContent}`, error);
            return ['None'];
        }
    }
}
