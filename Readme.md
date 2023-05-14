*Quick Tech Test*

This demo uses Typescript for convenience and and jsdom to parse the content of the retrieved data into an easily manipulated DOM object. It uses Jest for tests, but doesn't have a test suite so much as a couple of convenience tests that made development quicker and easier.

The following commands are configured ( run as `npm run build` etc):

| Command | Result                |
|---------|-----------------------|
| build   | Typescript tsc Build  |
| test    | Jest test             |
| exec    | Run script in console |

I have broken from the spec very slightly in outputting the response as a table for readability, with an option to return the output as JSON data. I have also changed the title field to `title` instead of `option title` because it was a little easier and this is a tech test. In a real-life situation I would probably question that part of the requirement. 

Obviously this is a tech test, many things have been done for expediency rather than excellence. Nevertheless, it is fully works-on-my-machine certified.
