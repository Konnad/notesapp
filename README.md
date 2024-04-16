## Backend 1 courses final assignment

This project is a quite swiftly assembled demo for a backend of a notes-app, where you can make user, login and create notes for youself (or for all to see!)

## What features does it have?

Eh, nothing much to be honest! Basic CRUD-features, some kind of working'ish authenthication for users and working encrypting for user passwords and a simple "Task / note generator", just because I wanted to create a new feature, which was not mentioned in the course. 

The project does not have a working frontend, but it works when used with Postman.

## Technologies

- Backend: Node.js, Express.js.
- Database and its modification: MongoDB and Mongoose
- User authentication was made using JWT and Bcryptjs, but I did not create the code for the files. I just modified them for my use.

## Can I run this?

Ummm, you can, but it will need a bit of a work to make it work for you. You'll need to setup your .env file, so I do not need to share it with y'all for security reasons. Then you need to setup the MongoDB database and (preferably) a docker environment for it, which I won't go into a great detail, since if you really want to use this code for something, you are probably already making something like this and I believe that you have the groundwork already done. I believe you should be more than able to just take some snippets or review my code from the github just fine, right?

Or not, I don't know, and to be honest, I do not quite remember how to setup all that. I can just help you with the .env file. 

```
MONGODB_URL=
JWT_SECRET=
```

Just add the url to your mongo, and add a secret for your jwt token.

## What did I learn during this course and this project?

I learned a lot. A lot about API's and working with databases with backend. I did not fully grasp the authenthication though, but I feel like I got a pretty good hang of basic CRUD operations along with general understanding of backend development. 

I also learnt more about MongoDB and Mongoose. I loved the MongoDB part during the "Databases 2"- course, so I was thrilled to dive back into it once more. Only that I found out that I had forgotten about most of the things I had once learned, so it was quite a work to get back to where I was a year or so ago. I still feel like I'm relearning Mongo, but thankfully there is a detailed manual about basic Mongo operations. 