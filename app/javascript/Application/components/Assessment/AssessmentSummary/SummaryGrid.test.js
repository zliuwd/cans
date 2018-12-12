import React from 'react'
import { mount, shallow } from 'enzyme'
import { i18n } from './DomainHelper.test'
import { DataGrid } from '@cwds/components'
import SummaryGrid from './SummaryGrid'

describe('<SummaryGrid />', () => {
  const render = (header = 'My Summary') => shallow(<SummaryGrid header={header} i18n={i18n} />)

  it('renders a data grid', () => {
    expect(
      render()
        .find(DataGrid)
        .exists()
    ).toBe(true)
  })

  it('is striped', () => {
    expect(render().props().className).toContain('-striped')
  })

  it('has a single column', () => {
    expect(render().props().columns.length).toBe(1)
  })

  it('has a header', () => {
    expect(render('Hello Summary').props().columns[0].Header).toBe('Hello Summary')
  })

  it('has no No Data prompt', () => {
    const NoData = render().props().NoDataComponent

    expect(shallow(<NoData />).type()).toBe(null)
  })

  it('has no minimum rows', () => {
    expect(render().props().minRows).toBe(0)
  })

  it('has no pagination', () => {
    expect(render().props().showPagination).toBe(false)
  })

  describe('with some items', () => {
    const items = [
      { code: 'SURPRISE', rating: -1 },
      { code: 'FEAR', rating: -1 },
      { code: 'RUTHLESS_EFFICIENCY', rating: -1 },
      { code: 'NICE_RED_UNIFORMS', rating: -1 },
    ]
    const domains = [{ code: 'first', items }]
    const render = itemFilter =>
      mount(<SummaryGrid header="My Summary" domains={domains} i18n={i18n} itemFilter={itemFilter} />)

    it('renders all of the items', () => {
      const text = render().text()

      expect(text).toContain('Surprise')
      expect(text).toContain('Fear')
      expect(text).toContain('Ruthless Efficiency')
      expect(text).toContain('Nice Red Uniforms')
    })

    it('skips items that do not pass filter', () => {
      const hasUnderscore = ({ code }) => code.includes('_')
      const text = render(hasUnderscore).text()

      expect(text).not.toContain('Surprise')
      expect(text).not.toContain('Fear')
      expect(text).toContain('Ruthless Efficiency')
      expect(text).toContain('Nice Red Uniforms')
    })
  })

  it('skips items when it does not know how to internationalize them', () => {
    const domains = [{ code: 'first', items: [{ code: 'SURPRISE', rating: -1 }] }]
    const text = mount(<SummaryGrid header="My Summary" domains={domains} i18n={{}} />).text()

    expect(text).not.toContain('Surprise')
    expect(text).not.toContain('SURPRISE')
  })

  describe('with multiple domains', () => {
    const items = [
      { code: 'SURPRISE', rating: -1 },
      { code: 'FEAR', rating: -1 },
      { code: 'RUTHLESS_EFFICIENCY', rating: -1 },
      { code: 'NICE_RED_UNIFORMS', rating: -1 },
    ]
    const moreItems = [{ code: 'FANATICAL_DEVOTION', rating: -1 }, { code: 'COMFY_CHAIRS', rating: -1 }]
    const domains = [{ code: 'first', items }, { code: 'last', items: moreItems }]
    const render = domainFilter =>
      mount(<SummaryGrid header="My Summary" domains={domains} domainFilter={domainFilter} i18n={i18n} />)

    it('renders all of the items', () => {
      const text = render().text()

      expect(text).toContain('Surprise')
      expect(text).toContain('Fear')
      expect(text).toContain('Ruthless Efficiency')
      expect(text).toContain('Nice Red Uniforms')
      expect(text).toContain('Fanatical Devotion')
      expect(text).toContain('Comfy Chairs')
    })

    it('skips domains that do not pass filter', () => {
      const onlyLast = ({ code }) => code === 'last'
      const text = render(onlyLast).text()

      expect(text).not.toContain('Surprise')
      expect(text).not.toContain('Fear')
      expect(text).not.toContain('Ruthless Efficiency')
      expect(text).not.toContain('Nice Red Uniforms')
      expect(text).toContain('Fanatical Devotion')
      expect(text).toContain('Comfy Chairs')
    })
  })

  describe('with lots of items', () => {
    const N = 500
    const items = new Array(N).fill().map((_, i) => ({ code: `${i}`, rating: -1 }))
    const domains = [{ code: 'first', items }]
    const render = () => mount(<SummaryGrid header="My Summary" domains={domains} i18n={i18n} />)

    it('renders all of the data', () => {
      const text = render().text()

      items.forEach(item => {
        expect(text).toContain(item.code)
      })
    })
  })
})
