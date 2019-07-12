Q: Mention two parts of Express that you learned about this week.

A:
-Express is a lightweight JavaScript framework that allows a developer to bootstrap a clean webserver backend for RESTful APIs, real time applications or static or React frontends.
-One of Express.js core feature is middleware and express middleware is compatible to connect middleware so their ecosystems of packages can be shared.

Q: Describe Middleware?

A:
-Middlewares are often a stack of functions that extend an application and can be injected sequentially in the middle of process to for example manipulate,log or secure ongoing data flows.
-There are 3 kinds of Middleware: built-in middleware which is delivered by your framework/package already, then third-party middleware which can be integrated as a module and custom middleware which a developer can write himself.

Q: Describe a Resource?

A:
-A Resource is is something that is a point of interested in an application like Users or Orders. Often it is data that needs to be transmitted between database and end-client that manipulates or views it.

Q: What can the API return to help clients know if a request was successful?

A:
-The API can return a HTTP status code that gives clear information about if a request went into a failure or not.
-Additionally an API could return a response that can be shaped as a JSON. In there different key value keys with even whole message texts can be return. This should be done in a convention and deterministic so that the end-client using the API understands what is going on.

Q: How can we partition our application into sub-applications?

A:
-With Routing and different Routers which is also a core feature of Express.js a developer can chunk the request handling logic into several sub-applications for the sake of keeping readability high and complexity low.
