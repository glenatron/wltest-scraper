import { IProductOption } from './IProductOption';
import { JSDOM } from 'jsdom';
import { implementation } from '../node_modules/jsdom/lib/jsdom/living/nodes/HTMLStyleElement-impl.js';


export class ProductParser {

    protected products: Array<IProductOption>;

    constructor() {
        // a nasty monkeypatch to prevent JSDOM throwing errors while trying to parse CSS.
        implementation.prototype._updateAStyleBlock = () => { };
        this.resetProducts();
    }

    public parseEntireDocument(entireDocument: string) {
        this.resetProducts();
        const dom = new JSDOM(entireDocument);
        const descriptions = dom.window.document.body.querySelectorAll('div.package');
        for (let desc of descriptions) {
            this.products.push(this.parseProductSection(desc));
        }
    }

    public parseProductSection(sectionContent: Element): IProductOption {
        const header = sectionContent.querySelector('.header').querySelector('h3').textContent;
        const description = this.cleanse(sectionContent.querySelector('.package-description').innerHTML);
        const priceBox = sectionContent.querySelector('.package-price');
        const priceBasic = this.getNumericPrice(priceBox.querySelector('.price-big').textContent);
        const discountContainer = priceBox.querySelector('p');
        const discount = discountContainer ? this.getNumericPrice(discountContainer.textContent) : 0;
        return {
            "title": header,
            "description": description,
            "price": priceBasic,
            "discount": discount
        };
    }

    public getProductList(): Array<IProductOption> {
        return this.products;
    }

    protected getNumericPrice(priceText: string): number {
        // I have a simple text problem, I use a regex to solve it, now I have zero problems.
        const match = /([\d]+.[\d]+)/;
        const found = priceText.match(match);
        let result = 0;
        if (found) {
            result = Number(found[0]);
        }
        return result;
    }

    // There's probably a better way to do this.
    protected cleanse(textContent: string): string {
        return textContent.replace(/<br>/g, ' ');
    }


    protected resetProducts() {
        this.products = new Array<IProductOption>();
    }


}
