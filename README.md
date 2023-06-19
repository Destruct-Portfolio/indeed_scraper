# indeed_scraper

the script scrapes Indeed website and saves the output into a CSV and also saves into MYSQL database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The indeed scraper is a solution that will take links of indeed website and web scrape the company information and then each review in it.

    Key features of the application include:
        - able to bypass cloudflare detection.
        - Saves Data into a csv.
        - Saves Data into MySQL Database.

## Installation

To run the application locally, follow these steps:

    1. Clone the repository to your local machine:

    ```shell

        git clone https://github.com/Destruct-Portfolio/indeed_scraper

    ```

    2. Navigate to the project directory:

    3. Install the dependencies:
      ```shell

        npm install

      ```

    4. Configure the database connection by filling the information in the config.json file in the directory

        ```shell

        {
            host:string,
            username:string,
            password:string
        }

        ```
    5. Make sure you have Links in the File assets/indeed_custom_review_links.txt

## Usage

    To start web scraping after the installation all you have to do is

     ```shell

        npm start

      ```

## License

MIT License

Copyright (c) [2023] [DESTRUCT]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
