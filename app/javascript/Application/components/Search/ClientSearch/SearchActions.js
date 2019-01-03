const ACTION = 'action'
export const isAction = obj => obj && obj.type === ACTION

const SHOW_MORE_RESULTS = 'Show More Results'
export const showMoreResults = searchAfter => ({ type: ACTION, action: SHOW_MORE_RESULTS, searchAfter })
export const isShowMoreResults = obj => obj && obj.type === ACTION && obj.action === SHOW_MORE_RESULTS
