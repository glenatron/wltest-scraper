import { describe, expect, test } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { IProductOption } from '../IProductOption';
import { ProductParser } from '../ProductParser';


describe("ProductParser", () => {

    test("Parses a single sample block", () => {
        const dom = new JSDOM(`<div class="package featured-right" style="margin-top:0px; margin-right:0px; margin-bottom:0px; margin-left:25px">
                        <div class="header dark-bg">
                            <h3>Basic: 500MB Data - 12 Months</h3>
                        </div>
                        <div class="package-features">
                            <ul>
                                <li>
                                    <div class="package-name">The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.</div>
                                </li>
                                <li>
                                    <div class="package-description">Up to 500MB of data per month<br>including 20 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
                                </li>
                                <li>
                                    <div class="package-price"><span class="price-big">£5.99</span><br>(inc. VAT)<br>Per Month</div>
                                </li>
                                <li>
                                    <div class="package-data">12 Months - Data &amp; SMS Service Only</div>
                                </li>
                            </ul>
                            <div class="bottom-row">
                                <a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/" role="button">Choose</a>
                            </div>
                        </div>
</div>`);
        const parser = new ProductParser();
        const option = parser.parseProductSection(dom.window.document.body.querySelector('div'));
        expect(option).toMatchObject({
            "title": "Basic: 500MB Data - 12 Months",
            "description": "Up to 500MB of data per month including 20 SMS (5p / MB data and 4p / SMS thereafter)",
            "price": 5.99,
            "discount": 0
        });
    });

    test("Parses a discount sample block", () => {
        const dom = new JSDOM(`<div class="package featured-right" style="margin-top:0px; margin-right:0px; margin-bottom:0px; margin-left:25px">
                        <div class="header dark-bg">
                            <h3>Basic: 6GB Data - 1 Year</h3>
                        </div>
                        <div class="package-features">
                            <ul>
                                <li>
                                    <div class="package-name">The basic starter subscription providing you with all you need to get you up and running with Data and SMS services to allow access to your device.</div>
                                </li>
                                <li>
                                    <div class="package-description">Up to 6GB of data per year<br>including 240 SMS<br>(5p / MB data and 4p / SMS thereafter)</div>
                                </li>
                                <li>
                                    <div class="package-price"><span class="price-big">£66.00</span><br>(inc. VAT)<br>Per Year
                                        <p style="color: red">Save £5.86 on the monthly price</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="package-data">Annual - Data &amp; SMS Service Only</div>
                                </li>
                            </ul>
                            <div class="bottom-row">
                                <a class="btn btn-primary main-action-button" href="https://wltest.dns-systems.net/#" role="button">Choose</a>
                            </div>
                        </div>
</div>`);
        const parser = new ProductParser();
        const option = parser.parseProductSection(dom.window.document.body.querySelector('div'));
        expect(option).toMatchObject({
            "title": "Basic: 6GB Data - 1 Year",
            "description": "Up to 6GB of data per year including 240 SMS (5p / MB data and 4p / SMS thereafter)",
            "price": 66.00,
            "discount": 5.86
        });

    });



});
