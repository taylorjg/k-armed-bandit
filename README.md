# Description

Web visualisation of the k-armed bandit problem from chapter 2 of
[_Reinforcement Learning: An Introduction_](http://incompleteideas.net/book/the-book.html).

This is a little React app created using [create-react-app](https://create-react-app.dev/).
I use [Chart.js](https://www.chartjs.org/) to draw the charts.
The number crunching is done using multiple web workers. 
I use [workerize-loader](https://github.com/developit/workerize-loader) to load the web worker code
without having to eject the React app.

# Links

* [_Reinforcement Learning: An Introduction_](http://incompleteideas.net/book/the-book.html)
* [Chart.js](https://www.chartjs.org/)
  * "Simple yet flexible JavaScript charting for designers & developers"
* [How to use Web Worker with create-react-app](https://medium.com/@bykovskimichael/how-to-use-web-worker-with-create-react-app-e1c1f1ba5279)  
* [workerize-loader](https://github.com/developit/workerize-loader)
  * "A webpack loader that moves a module and its dependencies into a Web Worker, automatically reflecting exported functions as asynchronous proxies"
