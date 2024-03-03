export const ROUTE = {
  DASHBOARD: '/dashboard',
  LOGIN: '/',
  RELATIONS: '/relations',
  SEARCH: '/search',
};

export const CONTEXTMENU = {
  EXPAND: 'expand',
  SELECTED: 'selected',
  UNSELECTED: 'unselected',
  RELEASE_POSITIONED_NODES: 'release-positioned-nodes',
  DETAILS: 'details',
  SHORTEST: 'shortest',
};

export const contextMenuEntries = [
  {
    id: CONTEXTMENU.EXPAND,
    text: 'Uitbreiden geselecteerde nodes',
  },
  {
    id: CONTEXTMENU.SELECTED,
    text: 'Verstop geselecteerde nodes',
  },
  {
    id: CONTEXTMENU.UNSELECTED,
    text: 'Verstop niet-geselecteerde nodes',
  },
  {
    id: CONTEXTMENU.RELEASE_POSITIONED_NODES,
    text: 'Versleepte nodes losmaken',
  },
  {
    id: CONTEXTMENU.DETAILS,
    text: 'Bekijk details',
  },
  {
    id: CONTEXTMENU.SHORTEST,
    text: 'Toon kortste pad',
  },
];
