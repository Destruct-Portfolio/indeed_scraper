/* fs.writeFileSync("test.jpeg", await this.$page.screenshot());
        await this.$exists("");
         let company_information: company_header = await this.$page.evaluate((selectors) => {
            let DATA: any = {};
            for (let index = 0; index < selectors.length; index++) {
              const element = selectors[index];
              DATA[element.key] = (document.querySelector(element.selector!) as HTMLElement)
                ? (document.querySelector(element.selector!) as HTMLElement).innerText
                : null;
            }
            return DATA;
          }, this.comany_selectors);

          console.log(company_information);
     
        console.log(company_information);
        // we need to do a double check for Company information Here !!
       let company_information2: company_header = await this.$page.evaluate((selectors) => {
          let DATA: any = {};
          for (let index = 0; index < selectors.length; index++) {
            const element = selectors[index];
            DATA[element.key] = document.$x(
              "/html/body/div[2]/div/div[1]/main/div[2]/div[2]/div[3]/div[3]/div[1]/div/div"
            )
              ? (document.querySelector(element.selector!) as HTMLElement).innerText
              : null;
          }
          return DATA;
        }, this.company_selectors2);*/

/*let Company_data = await this.$page.evaluate(() => {
          let Parrent_Element = document.querySelector(
            "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3)"
          );
          let overall_rating = (
            Parrent_Element?.querySelector(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(2) > div > div > span"
            ) as HTMLElement
          ).innerText;

          let WorkLife = (
            Parrent_Element?.querySelector(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(1) > div > div"
            ) as HTMLElement
          ).innerText;

          let compensation_Benefits = (
            Parrent_Element?.querySelector(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(2) > div > div"
            ) as HTMLElement
          ).innerText;

          let Job_Security_Advancement = (
            Parrent_Element?.querySelector(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(3) > div > div"
            ) as HTMLElement
          ).innerText;

          let management = (
            Parrent_Element?.querySelector(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(4) > div > div"
            ) as HTMLElement
          ).innerText;

          let culture = (
            Parrent_Element?.querySelector(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(5) > div > div"
            ) as HTMLElement
          ).innerText;

          return {
            company: (
              document.querySelector(
                "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0 > div > div > div > div.css-16dv56u.eu4oa1w0 > div.css-1ce69ph.eu4oa1w0 > div.css-12f7u05.e37uo190 > div.css-1e5qoy2.e37uo190 > div > div"
              ) as HTMLElement
            ).innerText,

            overall_rating,
            WorkLife,
            compensation_Benefits,
            Job_Security_Advancement,
            management,
            culture,
          };
        });*/

// console.log(Company_data);

/*try {
        
        } catch (err) {
          console.log("[-] from the catch BLOCK ");
          let company_data2 = await this.$page.evaluate(() => {
            let x: any = {};
            let Parrent_Element = (
              document.querySelector(
                "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(4)"
              ) as HTMLElement
            ).innerText;

            let parts = Parrent_Element.split("\n");
            parts.map((item, index) => {
              if (
                item === "Work/Life Balance" ||
                item === "Compensation/Benefits" ||
                item === "Job Security/Advancement" ||
                item === "Management" ||
                item === "Culture"
              ) {
                x[item.replace(/[^a-zA-Z0-9_]/g, "_")] = parts[index - 1];
              }
            });

            return x;
          });
          console.log(company_data2);
        }*/

//        console.log(company_information2);
