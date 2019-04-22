import React from 'react'
import { mount } from 'enzyme'
import Print from './Print'
import { print, printViewPreparation } from './printUtil/PrintHelper'

jest.mock('./printUtil/PrintHelper')

describe('<Print />', () => {
  const innerNode = <div id="internal" />
  const mountPrintComponent = onCloseCallback => mount(<Print onClose={onCloseCallback} node={innerNode} />)

  it('should render print iframe', () => {
    const printComponent = mountPrintComponent(jest.fn())
    expect(printComponent.find('iframe').length).toBe(1)
  })

  it('renders print iframe with full-screnn size', () => {
    const printComponent = mountPrintComponent(jest.fn())
    expect(printComponent.find('iframe').props().height).toBe('100%')
    expect(printComponent.find('iframe').props().width).toBe('100%')
    expect(printComponent.find('iframe').props().style).toEqual({ height: '100%', width: '100%' })
  })

  it('should print and invoke onClose callback', () => {
    const onCloseMock = jest.fn()
    mountPrintComponent(onCloseMock)
    expect(print).toHaveBeenCalledWith('print-frame', printViewPreparation(innerNode))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
