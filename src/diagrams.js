import { Chart } from 'chart.js'

export const drawDiagram = (chartElement, lines, yAxisOptions) => {

  const makeDataset = line => ({
    data: line.data,
    label: line.label,
    fill: false,
    borderColor: line.colour,
    borderWidth: 1,
    radius: 0
  })

  const maybeTicks = yAxisOptions.min !== undefined && yAxisOptions.max !== undefined
    ? {
      ticks: {
        min: yAxisOptions.min,
        max: yAxisOptions.max
      }
    }
    : undefined

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
          scaleLabel: {
            display: true,
            labelString: 'Steps'
          },
          labels: lines[0].data.map((_, index) => index + 1),
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            callback: tick => {
              if (tick === 1) return 1
              return tick % 250 === 0 ? tick : null
            }
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yAxisOptions.label
          },
          ...maybeTicks
        }]
      },
      events: [],
      animation: {
        duration: 0
      }
    }
  })
}
