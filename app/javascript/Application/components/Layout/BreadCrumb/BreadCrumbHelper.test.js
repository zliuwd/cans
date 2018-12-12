import { formatName, removeDuplicateBreadCrumb, selfChecker } from './BreadCrumbHelper'

describe('BreadCrumbHelper', () => {
  it('formatName', () => {
    const fakeName = { first_name: 'mike', middle_name: 'alen', last_name: 'seaver', suffix: 'mr' }
    const expectResult = 'Seaver, Mike Alen, Mr'
    const actualResult = formatName(fakeName)
    expect(actualResult).toBe(expectResult)
  })

  it('selfChecker', () => {
    const navigateTo = 'STAFF_CHILD_PROFILE'
    const firstKeyWords = 'CHILD_PROFILE'
    const secondKeyWords = 'SEARCH'
    const firstResult = selfChecker(navigateTo, firstKeyWords)
    const secondResult = selfChecker(navigateTo, secondKeyWords)
    expect(firstResult).toBe(true)
    expect(secondResult).toBe(false)
  })

  describe('removeDuplicateBreadCrumb', () => {
    const elementsWithOnlyOneLink = [{ id: 'first', props: { children: 'search' } }]
    const elementsWithTwoLinks = [
      { id: 'first', props: { children: 'search' } },
      { id: 'second', props: { children: 'search' } },
    ]
    const elementsWithBothLinkAndText = [{ id: 'first', props: { children: 'search' } }, 'search']
    let actualResult

    it('will not be changed when elements contains only one link   ', () => {
      actualResult = removeDuplicateBreadCrumb(elementsWithOnlyOneLink)
      expect(actualResult.length).toBe(1)
      expect(actualResult[0]).toEqual(elementsWithOnlyOneLink[0])
    })

    it('will remove the second element when elements contains one link and one plain text ', () => {
      actualResult = removeDuplicateBreadCrumb(elementsWithBothLinkAndText)
      expect(actualResult.length).toBe(1)
      expect(actualResult[0]).toEqual('search')
    })

    it('will remove first element when elements contains two same link ', () => {
      actualResult = removeDuplicateBreadCrumb(elementsWithTwoLinks)
      expect(actualResult.length).toBe(1)
      expect(actualResult[0].id).toEqual('second')
    })
  })
})
