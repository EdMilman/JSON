The task
The JSON document you will be working with is nobel.json, which is a JSON
representation of information about the winners of the Nobel prize.
Each entry in the prizes array consists of a year, a category, and an array of
laureates (winners). Each entry in a laureates array has a firstname, surname
and a share (the number of people sharing the prize), among other information.

The product of the coursework should be an HTML page which a user can use to
query information about Nobel prize winners. In other words, the HTML page
should read the file and provide an interface through which the user can query
the data. You should use JavaScript and HTML forms to implement your solution,
which should work with both Firefox and Chrome. The techniques you need to use
are discussed in the Client-side processing part of the course. You can use the
jQuery library in your solution if you wish. You can also use a library such as
JSPath to filter the data based on user input. Here are the latest versions of
the jQuery and JSPath libraries: jquery-3.3.1.min.js and jspath.js (right-click
and save-as). Extra information is given below.

Create a web page which will allow a user to query the data as follows:

1. The user should be able to enter a category value (e.g. literature) and retrieve
the corresponding prize winners.
2. The user should be able to enter a year value (e.g. 1991) as well as an
operator (<, = or >) and retrieve the prize winners for the years specified.
3. The user should be able to enter a share value (e.g. 2) as well as an operator
(<, = or >) and retrieve the prize winners who shared the prize among the number
of people specified by the condition.
4. The user should be able to enter part of a surname value (e.g. Curie) and
retrieve the corresponding prize winners.
5. The user should be able to enter conditions for any combination of the 
properties mentioned above. If no conditions are entered, all prizes and winners should be returned.
