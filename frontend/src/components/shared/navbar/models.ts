export class NavbarLinkItem {
  constructor(public label: string, public to: string, public type = 'default') {}
}

export const navbarLinks: NavbarLinkItem[] = [
  new NavbarLinkItem('Beers', '/beers'),
  new NavbarLinkItem('Breweries', '/breweries'),
  new NavbarLinkItem('About', '/about')
];
