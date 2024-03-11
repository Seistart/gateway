## SeiStart: Lighting Up the Sei Network Ecosystem

SeiStart would serve as a comprehensive directory and gateway to the myriad of projects being built on the Sei Network. It aims to demystify the network's offerings, making it accessible for enthusiasts, developers, and investors alike to explore and engage with. Picture it as your digital atlas, charting the unexplored territories of the Sei Network, where each project represents a star in the ever-expanding galaxy of blockchain innovation.

![image](https://seistart.com/img/logo_850.png)

Key Features:

- 🔍 Exploring projects

### Prerequisites

**Node version 18.18.x**

### Cloning the repository

```shell
git clone git@github.com:Seistart/gateway.git
```

### Install packages

```shell
bun i
```

### Setup .env file

```js
DATABASE_URL=
REDIS_KEY=
```

### Setup Postgres with Drizzle

```shell
bun db:generate
bun db:migrate
```

### Start the app

```shell
bun run dev
```

## Available commands:

Running commands with npm `bun run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `tst`   | Starts a test instance of the app        |

# Installing LAMP Stack and Matomo on Linux

This guide will walk you through the installation of the LAMP stack (Linux, Apache, MySQL, PHP) on Ubuntu and setting up Matomo, a comprehensive analytics platform.

## Step 1: Installing LAMP Stack on Linux

Matomo requires a web server, PHP, and MySQL to run. The following instructions are for Ubuntu but might vary slightly for other Linux distributions.

1. **Update your package lists:**

   ```bash
   sudo apt update
   ```

2. **Install Apache, MySQL, and PHP:**

   ```bash
   sudo apt install apache2 mysql-server php php-cli php-fpm php-mysql libapache2-mod-php php-xml php-mbstring php-gd php-curl php-zip
   ```

3. **Start Apache and MySQL services:**

   ```bash
   sudo service apache2 start
   sudo service mysql start
   ```

4. **Secure your MySQL installation (optional, but recommended):**

   ```bash
   sudo mysql_secure_installation
   ```

   Follow the prompts to configure your MySQL server securely.

## Step 2: Downloading and Installing Matomo

With your LAMP stack ready, you can now install Matomo.

1. **Navigate to the web root directory:**

   ```bash
   cd /var/www/html
   ```

2. **Download the latest Matomo release:**

   ```bash
   sudo wget https://builds.matomo.org/matomo-latest.zip
   ```

3. **Install unzip if you haven't:**

   ```bash
   sudo apt install unzip
   ```

4. **Unzip Matomo into the web root:**

   ```bash
   sudo unzip matomo-latest.zip
   ```

5. **Change ownership of the Matomo directory to the web server user (usually `www-data` for Apache):**

   ```bash
   sudo chown -R www-data:www-data matomo
   ```

6. **Create a MySQL database and user for Matomo:**

   - Log into MySQL:

     ```bash
     sudo mysql -u root -p
     ```

   - Create a database for Matomo:

     ```sql
     CREATE DATABASE matomo;
     ```

   - Create a MySQL user and grant privileges:

     ```sql
     CREATE USER 'matomo'@'localhost' IDENTIFIED BY 'yourpassword';
     GRANT ALL PRIVILEGES ON matomo.* TO 'matomo'@'localhost';
     FLUSH PRIVILEGES;
     EXIT;
     ```

## Step 3: Completing Matomo Installation

1. Open your browser and navigate to `http://localhost/matomo` to run the Matomo installation wizard.
2. Follow the instructions, providing the necessary database details when prompted.
3. The installation wizard is straightforward. Remember to use the previously provided database information.
4. When that’s done, create a website as an intranet for `localhost:3000`.
