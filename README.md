# Introduction
This server allows to run a minimal CMS that is compatible with the [Thingle.me](https://thingle.me)'s `Generic CMS plugin` API specifications.

Documents must accordingly be listed in the `config.yml` configuration file.

# Configuration
Create a configuration file listing all the documents you want to use with [Thingle.me](https://thingle.me)

Example of `config.yml`
```
   - domain_uuid: PUT_YOUR_DOMAIN_UUID_HERE
     access_token: "PUT_YOUR_SECRET_PASSWORD_HERE"
     files:
       - document_id: "1"
         format: "application/pdf"
         description: "The Pro Git book"
         tags:
           - "Git"
           - "Pro"
           - "Book"
         i18n:
           - language: "en"
             url: "https://progit2.s3.amazonaws.com/en/2016-03-22-f3531/progit-en.1084.pdf"
             description: "The Pro Git book"
             created_at: 2014-01-01 11:02:57
             updated_at: 2014-01-01 11:03:14
```

## Notes:
1. the `domain_uuid` can be discovered calling the `/users/me` API (see the `Developer Zone` in your Dashboard)
2. Be sure to put the same `access_token` used in the Thingle.me Generic CMS plugin configuration

# Run

You can start the server by either running node locally or launching a docker container. If not otherwise provided, the default port is 5000.

## Node.js

> npm start

## Docker

> docker run -p 5000:5000 -v path_to_the_config.yml:/app/config.yml --name simple-cms-server thingleme/simple-cms-server:v1.0.0

If you want to specify a different port, you can use the `e` switch and provide the `PORT` paramenter.

> docker run -e PORT=5001 -p 5001:5001 -v path_to_the_config.yml:/app/config.yml --name simple-cms-server thingleme/simple-cms-server:v1.0.0
