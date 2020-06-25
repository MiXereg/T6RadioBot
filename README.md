# T6RadioBot
Discord music bot for [t6radio.net](http://www.t6radio.net/).
[Click here to invite!](https://discordapp.com/oauth2/authorize?client_id=592466338463744025&scope=bot&permissions=36719616)

## Requirements
To run this bot you need have installed [ffmpeg](https://ffmpeg.org/) (it's pre-installed on most of operating systems) and [nodeJS with npm](https://nodejs.org/).

## Installation
1. Clone repository with git clone.
```
$ git clone https://github.com/MiXerek/T6RadioBot/
```
2. Open directory where you've cloned this repository.
```
$ cd T6RadioBot
```
3. Run
```
$ npm install
```

## How to run
1. Set BOT_TOKEN environment variable.
```
Unix-like:
$ BOT_TOKEN="<your bot token here>"

Windows (Powershell):
$ $env:BOT_TOKEN = "<your bot token here>"
```
2. Run
```
$ node src/index.js
```
