# Description

Web visualisation of the k-armed bandit problem from chapter 2 of
[_Reinforcement Learning: An Introduction_](http://incompleteideas.net/book/the-book.html).

This is a little React app created using [create-react-app](https://create-react-app.dev/).
I use [Chart.js](https://www.chartjs.org/) to draw the charts.
The number crunching is done using multiple web workers. 
I use [workerize-loader](https://github.com/developit/workerize-loader) to load the web worker code
without having to eject the React app.

# TODO

* ~~Deploy to gh-pages branch~~
  * ~~Using the [gh-pages](https://github.com/tschaub/gh-pages) npm package~~
  * ~~See also [GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages) in the 'Deployment' section of the [documentation](https://create-react-app.dev/docs/getting-started) for [Create React App](https://create-react-app.dev/)~~
* ~~The main part of the code is vanilla JS/HTML inside a React app. This code needs to be moved into React components.~~
* Bring in and use [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
* ~~Add UI support for changing settings:~~
  * ~~Number of web workers (currently 4)~~
  * ~~Number of bandit arms aka `k` (currently 10)~~
  * ~~Number of runs (currently 2000)~~
  * ~~Number of steps (currently 1000)~~
* Add UI support for changing experiments:
  * Value of `ε` for ε-Greedy
  * Value of `c` for Upper Confidence Bound
  * Setting optimistic initial values
  * etc.
* ~~Add a button to re-run the whole thing~~
* ~~Add a progress bar during the number crunching~~

# Links

* [_Reinforcement Learning: An Introduction_](http://incompleteideas.net/book/the-book.html)
* [Chart.js](https://www.chartjs.org/)
  * "Simple yet flexible JavaScript charting for designers & developers"
* [How to use Web Worker with create-react-app](https://medium.com/@bykovskimichael/how-to-use-web-worker-with-create-react-app-e1c1f1ba5279)  
* [workerize-loader](https://github.com/developit/workerize-loader)
  * "A webpack loader that moves a module and its dependencies into a Web Worker, automatically reflecting exported functions as asynchronous proxies"
