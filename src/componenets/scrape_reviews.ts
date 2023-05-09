import PuppeteerScrapper from "./puppeteer_scraper.js";
import fs from "node:fs"

export default class Reviews_scraper extends PuppeteerScrapper{
    private review_Links:string[]
    constructor(review_Links:string[]){
        super()
        this.review_Links = review_Links
    }
    
    protected async $extract(): Promise<void> {
        let selectors = [
            {
                key:"overall_rating",selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-1edyzoo.eu4oa1w0 > div > button"
            },
            {
                key:"tittle", selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > h1"
            },
            {
                key:"author", selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-vktqis.eu4oa1w0 > span > a:nth-child(2)"
            },
            {
                key:"address", selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-vktqis.eu4oa1w0 > span > a:nth-child(3)"
            },
            {
                key:"comment",selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-rr5fiy.eu4oa1w0"
            },
            {
                key:"work_life_balance",selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(2) > div > div > div"
            },
            {
                key:"Compensation_Benefits",selctor:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(3) > div > div > div"
            },
            {
                key:"Job_Security_Advancement", selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(4) > div > div > div"
            },
            {
                key:"Management", selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(5) > div > div > div"
            },
            {
                key:"Culture", selector:"#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(6) > div > div > div"
            },
        ]
        
        if(this.$page){
            for(let link of this.review_Links){
                await this.$page.goto(link,{timeout:0, waitUntil:'networkidle2'})
                // need to do a check here 
                let company_header = await this.$page
                .waitForSelector(
                  "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0"
                )
                .then(() => {
                  return true;
                })
                .catch(() => {
                  // if that didn't show means that there is the Cloud_flare //
                  return false;
                });
              if (company_header) { 

                try {
                    let review_data = await this.$page.evaluate((selectors)=>{
                        let Review :any = {}
                        for(var i=0; i< selectors.length; i++){
                            const element = selectors[i];
                            Review[element.key] = (document.querySelector(element.selector!) as HTMLElement) ?(document.querySelector(element.selector!) as HTMLElement).innerText : null;
                        }
                        return Review
                    },selectors)
                    
                    console.log(review_data);
                } catch (error) {
                    console.log(error)
                    fs.writeFileSync('./if_not.jpeg', await this.$page.screenshot())   
                }

              }else {
                fs.writeFileSync('./if_not.jpeg', await this.$page.screenshot())
              }
            }
        }
        
    }
}