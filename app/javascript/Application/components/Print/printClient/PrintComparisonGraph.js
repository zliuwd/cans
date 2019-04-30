import React, { PureComponent } from 'react'
import { XAxis, YAxis, CartesianGrid, Legend, Bar, Cell, BarChart } from 'recharts'
import {
  datesGenerator,
  domainBarsDataGenerator,
  graphColors,
} from '../../Client/AssessmentComparison/comparisonGraph/comparisonGraphDataTransformations'
import PropTypes from 'prop-types'

class PrintComparisonGraph extends PureComponent {
  render = () => {
    const { data, i18n } = this.props
    const eventDates = data.event_dates
    const dates = datesGenerator(eventDates)
    const domainBarsData = domainBarsDataGenerator(eventDates, data.domains, i18n)
    return (
      <BarChart width={800} height={300} data={domainBarsData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} fill={'#f1f1f1'} />
        <XAxis dataKey="name" interval={0} />
        <YAxis padding={{ top: 20 }} />
        <Legend verticalAlign="top" margin={{ top: -50 }} />
        {dates.map((date, index) => (
          <Bar isAnimationActive={false} dataKey={date} fill={graphColors[index]} key={`bar-${date}`}>
            {domainBarsData.map(entry => <Cell key={`cell-${entry.name}`} />)}
          </Bar>
        ))}
      </BarChart>
    )
  }
}

PrintComparisonGraph.propTypes = {
  data: PropTypes.shape({
    event_dates: PropTypes.array,
    domains: PropTypes.array,
  }).isRequired,
  i18n: PropTypes.object.isRequired,
}

export default PrintComparisonGraph
