import { CreateDefsFn, DefsSelection } from '../../types'

export const createDefs: CreateDefsFn = function (selection) {
  const defs = selection
    .append('defs')
    .attr('id', 'defs')
    .attr('class', 'defs')
    .style('display', 'none')

  // Icons

  // - Project
  defs
    .append('symbol')
    .attr('id', 'icon-project')
    .attr('width', '19')
    .attr('height', '12')
    .attr('viewBox', '0 0 19 12')
    .append('path')
    .attr(
      'd',
      'M0 2C0 0.895431 0.895431 0 2 0H17C18.1046 0 19 0.895431 19 2L0 2ZM0 4H19V10C19 11.1046 18.1046 12 17 12H2C0.895431 12 0 11.1046 0 10V4ZM5 5H2V7H5V5Z'
    )

  return defs as unknown as DefsSelection
}
