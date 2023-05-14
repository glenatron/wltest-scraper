import * as https from 'https';
import * as readline from 'readline';
import { IProductOption } from './IProductOption';
import { ProductParser } from './ProductParser';


export class PageSummariser {

    constructor(private url: string) {
        let received = [];
        https.get(url, result => {
            result.on('data', content => { received.push(content) });
            result.on('end', () => {
                this.parseContent(Buffer.concat(received).toString());
            });
        });
    }

    protected parseContent(content: string) {
        var parser = new ProductParser();
        parser.parseEntireDocument(content);
        let products = parser.getProductList();
        products.sort((x, y) => y.price - x.price);
        console.table(products);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Do you want this data as JSON? [y/n]', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y': console.log(JSON.stringify(products));
                    rl.close();
                    break;
                default: rl.close();
                    break;
            }
        });

    }



}
