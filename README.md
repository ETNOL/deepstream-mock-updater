### Quick Start
    npm install
    npm start

Example url on localhost: http://localhost:3000/register/TWTR 

Must have a deepstream server up and running at its default port.

###Use
This contraption will:
* Consume a stock ticker symbol
* Fetch data on it from MOD's public api
* Post that data to a deepstream server
* At intervals, randomize the data and repost it to deepstream
