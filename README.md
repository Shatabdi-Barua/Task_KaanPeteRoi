### Getting started
- clone the repo
- run `npm install`
- run `node main.js`
- input file is `Data.csv` and output file is `volunteer-connection.csv`. if you want to try different files, just rename them in code.


### Solution Approach
- categorized all volunteers according to their shifts. If a number of people has same shift on same day, they are put in the same list.
- we can concur that, people from the same list have a "connection"
- to keep a weighted graph, we're using a nested object; Now, we can query something like `weightedGraph['Razzak']['Shabana']` to get their connection status
### Challenges Faced
This was a fairly simple problem so only a few problems arose. Never really worked with CSV files and Javascript so that took a little effort to set up.
### Limitations
- The whole `graph` paradigm is weak since I haven't used a class based approach. But, because of the nature of the problem we don't need to implement algorithms like `BFS` or `DFS`. So even though class based solution is the craftier and futureproof, it felt redundant.
- If two volunteers does not have any connection, ideally their weight should be zero. But in this case they are non-existent.
- The graph is intentionally directed graph. Based on preference it can be made undirected, but I've chosen otherwise.
- The input/output files are hardcoded, I'll be fixing it so that they can be passed as an argument to the program
