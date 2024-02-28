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

## Available commands

Running commands with npm `bun run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `tst`   | Starts a test instance of the app        |
