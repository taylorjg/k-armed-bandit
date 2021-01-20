import { Chart } from 'chart.js'

export const drawDiagram = (chartElement, lines) => {
  const makeDataset = line => ({
    data: line.data,
    label: line.label,
    fill: false,
    borderColor: line.colour,
    borderWidth: 1,
    radius: 0
  })
  new Chart(chartElement, {
    type: 'line',
    data: {
      datasets: lines.map(makeDataset)
    },
    options: {
      legend: {
        labels: {
          boxWidth: 20
        }
      },
      scales: {
        xAxes: [{
          labels: lines[0].data.map((_, index) => index + 1)
        }]
      },
      events: [],
      animation: {
        duration: 0
      }
    }
  })
}
