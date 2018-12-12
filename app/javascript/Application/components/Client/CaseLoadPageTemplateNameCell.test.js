import React from 'react'
import { render } from 'enzyme'
import CaseLoadPageTemplateNameCell from './CaseLoadPageTemplateNameCell'
import { BrowserRouter } from 'react-router-dom'

const fakeProp = {
  original: {
    identifier: '0X5',
  },
  value: 'foo',
  column: { rol: 'staffId' },
}

describe('<CaseLoadPageTemplateNameCell />', () => {
  it('returns a link with external_id', () => {
    const wrapper = render(
      <BrowserRouter>
        <CaseLoadPageTemplateNameCell {...fakeProp} />
      </BrowserRouter>
    )
    expect(wrapper.find('#ClientName')._root[0].attribs.href).toContain('/staff/staffId/clients/0X5')
  })
})
