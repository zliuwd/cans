import React from 'react'
import { shallow } from 'enzyme'
import Debouncer from './Debouncer'

const MyComponent = () => <div>Hello World</div>

describe('<Debouncer />', () => {
  const callback = jest.fn()

  const render = name =>
    shallow(
      <Debouncer callback={callback} callbackPropName={name}>
        <MyComponent />
      </Debouncer>
    )

  const call = (wrapper, name, ...args) => wrapper.find(MyComponent).prop(name)(...args)

  beforeEach(() => {
    callback.mockReset()
    jest.useFakeTimers()
  })

  it('waits 400 milliseconds after the call to search for clients', () => {
    const wrapper = render('callback')
    call(wrapper, 'callback')

    jest.advanceTimersByTime(399)
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('cancels previous callbacks when another call occurs within 400 milliseconds', () => {
    const wrapper = render('greet')

    call(wrapper, 'greet', 'george')
    jest.advanceTimersByTime(399)
    expect(callback).not.toBeCalled()

    call(wrapper, 'greet', 'annie')
    jest.advanceTimersByTime(399)
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('annie')
  })

  it('responds immediately when the value is empty', () => {
    const wrapper = render('sayMyName')
    call(wrapper, 'sayMyName', 'Baby')
    call(wrapper, 'sayMyName', '')
    expect(callback).toHaveBeenCalledWith('')
    jest.advanceTimersByTime(400)
    expect(callback).not.toHaveBeenCalledWith('Baby')
  })

  it('debounces separate components separately', () => {
    const wrapper1 = render('sayHello')
    const wrapper2 = render('sayHello')

    call(wrapper1, 'sayHello', 'george')
    jest.advanceTimersByTime(399)

    call(wrapper2, 'sayHello', 'annie')
    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledWith('george')
    expect(callback).not.toHaveBeenCalledWith('annie')

    jest.advanceTimersByTime(400)
    expect(callback).toHaveBeenCalledWith('annie')
  })
})
