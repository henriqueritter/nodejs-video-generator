# NodeJS Video Generator

Node.JS application to generate videos with some templates and store it on Disk or in a CDN like Cloudflare R2.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)![FFmpeg](https://shields.io/badge/FFmpeg-%23171717.svg?logo=ffmpeg&style=for-the-badge&labelColor=171717&logoColor=5cb85c)

## About

This application uses the FFmpeg Lib to process medias like Images and Videos in a configured templates/filters.
It was developed as a personal project to practice a few concepts and tools like Node Streams and use of CDN provider like Cloudflare R2 with the AWS-SDK/S3 API.

## Usage

Clone Repository and Setup _.env_ file, use _.env.example_ parameters

```sh
$ git clone https://github.com/henriqueritter/nodejs-video-generator.git
$ cd ./nodejs-video-generator
$ copy .env.example .env
```

### Server Up With Docker

```sh
$ docker build -t nodejs-video-generator .
$ docker run d --name=nodejs-video-generator -p 3000:3000 nodejs-video-generator
```

### Server Up Without Docker

```sh
$ npm install
$ npm run start
```

## License

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)
