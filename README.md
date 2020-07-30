This is a clock.
----------------

Actually, there's nothing to be said here. This is not (yet) an app.
That clock was created for a simple amusement and trying out some fun stuff
(like creating SVG graphics by writing XML).

Over time, it might get complicated, though. I have few ideas on how to
add new functionalities or improve the clock itself (better synchro!).
Ironically, time itself is (as always) against me. So I'll improve this
if I can find the time.

Run / build / develop
---------------------

As you most probably noticed, there is no `package.json` file here.
You might think there is no need to install anything with `npm`, `bower`
or any other system. You would be right :-) Nevertheless there is at least
one thing that is required to run this project locally.

I decided to use ES6 imports, which in turn makes the whole thing
impossible to simply run just by opening `index.html` file in your favorite
web browser. So in order to run the project locally for development, a server
is required. There is a number of solutions to that; personally I use this:

```shell
npx es-dev-server --node-resolve --watch
```

By default, it creates a server on port 8000, which you can open by navigating your
web browser to http://localhost:8000/ - you should find the clock right there :-)
Enjoy!
