import React from 'react'
import { shallow } from 'enzyme'
import SessionDataGrid from './SessionDataGrid'
import { ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY, setItem } from '../../util/sessionStorageUtil'

describe('<SessionDataGrid />', () => {
  beforeEach(() => setItem(ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY, null))

  afterEach(() => setItem(ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY, null))

  it('should render DataGrid with default value for defaultPageSize', () => {
    const wrapper = shallow(<SessionDataGrid pageSizeSessionKey={ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY} />)
    const dataGrid = wrapper.find('DataGrid')
    expect(dataGrid.props().defaultPageSize).toBe(10)
  })

  it('uses local storage to store pageSize', () => {
    const grid0 = shallow(<SessionDataGrid pageSizeSessionKey={ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY} />)
    grid0.instance().handleOnPageSizeChange(25)
    expect(grid0.find('DataGrid').props().defaultPageSize).toBe(25)

    const grid1 = shallow(<SessionDataGrid pageSizeSessionKey={ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY} />)
    expect(grid1.find('DataGrid').props().defaultPageSize).toBe(25)
  })
})
