import React from 'react'
import { shallow } from 'enzyme'
import { DataGrid } from '@cwds/components'
import StaffTable from './StaffTable'
import StaffNameLink from './StaffNameLink'
import { staff as mockStaff, onlyOneStaffCase } from './staff.mocks.test'

describe('<StaffTable />', () => {
  const render = staff => shallow(<StaffTable staff={staff} />)

  const findColumn = headerText =>
    render([])
      .props()
      .columns.find(column => column.Header === headerText)

  const assertColumnIsCentered = headerText => {
    const column = findColumn(headerText)
    expect(column.className).toBe('text-center')
    expect(column.headerClassName).toBe('text-center')
  }

  it('renders a DataGrid', () => {
    expect(
      render([])
        .find(DataGrid)
        .exists()
    ).toBe(true)
  })

  it('staff name column accessor is working', () => {
    const testStaffName = `${mockStaff[0].staff_person.last_name}, ${mockStaff[0].staff_person.first_name}`
    const grid = render(mockStaff)
    const target = grid.props().columns[0].accessor
    const result = target(mockStaff[0])
    expect(result).toBe(testStaffName)
  })

  it('will set minRows to 1 when have only one staff', () => {
    const grid = render(onlyOneStaffCase)
    const minRows = grid.props().minRows
    expect(minRows).toBe(1)
  })

  it('will set minRows to 3 when have no staff', () => {
    const threeRows = 3
    const grid = render([])
    const minRows = grid.props().minRows
    expect(minRows).toBe(threeRows)
  })

  it('will set minRows to 1 when have more than 3 staffs', () => {
    const moreThanThreeStaffs = [...mockStaff, ...mockStaff]
    const grid = render(moreThanThreeStaffs)
    const minRows = grid.props().minRows
    expect(moreThanThreeStaffs.length).toBeGreaterThan(3)
    expect(minRows).toBe(1)
  })

  it('shows all rows with pagination', () => {
    const grid = render([]).find(DataGrid)
    expect(grid.props().showPagination).toBe(true)
    expect(grid.props().pageSizeOptions).toEqual([10, 25, 50])
  })

  it('always displays enough rows for a No Records message', () => {
    const grid = render([]).find(DataGrid)
    const spaceForMessage = 3
    expect(grid.props().minRows).toBe(spaceForMessage)
  })

  it('sorts by staffName by default', () => {
    const grid = render([]).find(DataGrid)
    expect(grid.props().defaultSorted).toEqual([{ id: 'staffName' }])
  })

  it('uses the list of staff people as data', () => {
    const grid = render(mockStaff)
    expect(grid.props().data).toBe(mockStaff)
  })

  it('renders staff names as links', () => {
    const staffNameColumn = findColumn('Staff Name')
    expect(staffNameColumn.Cell).toBe(StaffNameLink)
  })

  it('centers the "Total Clients" column', () => {
    assertColumnIsCentered('Total Clients')
  })

  it('centers the "No Prior" column', () => {
    assertColumnIsCentered('No Prior')
  })

  it('centers the "In Progress" column', () => {
    assertColumnIsCentered('In Progress')
  })

  it('centers the "Completed" column', () => {
    assertColumnIsCentered('Completed')
  })
})
