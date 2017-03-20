# Simple-Cms-Server

[![Build Status](https://travis-ci.org/thingleme/simple-cms-server.svg?branch=master)](https://travis-ci.org/thingleme/simple-cms-server)

## Introduction
This server allows to run a minimal CMS that is compatible with the [Thingle.me](https://thingle.me)'s `Generic CMS plugin` API specifications.

Documents must accordingly be listed in the `config.yml` configuration file.

## Configuration
Create a configuration file listing all the documents you want to use with [Thingle.me](https://thingle.me)

Example of `config.yml`
```
   - domain_uuid: PUT_YOUR_DOMAIN_UUID_HERE
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
- the `domain_uuid` can be discovered calling the `/users/me` API (see the `Developer Zone` in your Dashboard)

# Security
In order to provide a secure way to filter out unauthorized incoming requests, you need to set an env variable to your `access_token` (the same used in the Thingle.me Generic CMS plugin configuration).

- The `name` of this variable must be equal to the first 8 characters of your `domain_uuid`
- Its `value` must match the `access_token`

Example:
your domain_uuid is `a2d4c8a0-d994-11e6-9c32-e3ed0fb5736e` and you have configured `mysecretpwd` as secret access_token in your Thingle.me plugin configuration. To start your `simple-cms-server`, just run:

> $ a2d4c8a0=mysecretpwd npm start

## Run

You can start the server by either locally running node or launching a docker container. If not otherwise provided, the default port is 5000.

### Node.js

> $ <first_8_digits_of_your_domain_uuid>=<your_access_token> npm start

### Docker

> $ docker run -e PORT=5001 -e <first_8_digits_of_your_domain_uuid>=<your_access_token> -p 5001:5001 -v path_to_the_config.yml:/app/config.yml --name simple-cms-server thingleme/simple-cms-server:v1.1.0
