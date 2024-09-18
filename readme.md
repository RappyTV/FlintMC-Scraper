# FlintMC Modification Scraper

This script scrapes modification data from [flintmc.net](https://flintmc.net) and outputs the fetched information into a file. It uses a cookie-based authentication to interact with the website.

## Default Configuration

The script uses the following default configuration:

```bash
COOKIE=
MAX_FAILS=10
OUTPUT_PATH="./modifications.txt"
```

- **COOKIE**: Required to authenticate and fetch data from the website.
- **MAX_FAILS**: The maximum number of times the scraper can fail before terminating.
- **OUTPUT_PATH**: The file where the fetched modification data will be saved.

## How to Get the Cookie Value

To scrape modification data from flintmc.net, you'll need to provide a valid session cookie. Follow these steps to obtain the cookie value:

1. Open [flintmc.net](https://flintmc.net) in your browser and log in.
2. Right-click on the page and select **Inspect** or press `Ctrl + Shift + I` (Windows/Linux) or `Cmd + Option + I` (Mac) to open Developer Tools.
3. In the Developer Tools panel, go to the **Application** tab.
4. In the left sidebar, under **Storage**, expand **Cookies** and select `https://flintmc.net`.
5. Look for a cookie named `PHPSESSID`.
6. Copy the value of this cookie and set it in the `COOKIE` field of your configuration.

## Usage

This scraper is built to be run with [Bun](https://bun.sh/), a fast JavaScript runtime. Follow the steps below to install Bun and run the script.

### 1. Install Bun

If you don’t have Bun installed yet, you can look at the installation guide [here](https://bun.sh).

### 2. Clone the Repository

```bash
git clone https://github.com/RappyTV/FlintMC-Scraper.git scraper
cd scraper
```

### 3. Set Up Configuration

Copy the `.env.example` file and name it `.env`. Then please paste your `PHPSESSID` cookie value into the `COOKIE` field.

### 4. Run the Script

To run the scraper, use Bun as follows:

```bash
bun start
```

This will start fetching the modification data and output it into the log. The results are also saved to the specified `OUTPUT_PATH`.