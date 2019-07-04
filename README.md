# Beerly

Application write with Node JS + React JS

# Backend

Architecutre: Onion - Models, Repository, Services, Controlers
IntersifyJS for handling Dependency Injection. Project created with TypeScript for handling typings.
To run backend type
`npm run tsc` `npm run dev` `npm run prod`

# Frontend

Architecture: Flux
React JS + Hooks, Redux, Jest, Enzyme, SASS modules, TypeScript for handling typings.
`npm start` `npm run build` `npm test` `npm run test-coverage` `npm run test-watch`

# Frontend architecture description

containers - folder which contains core components for app. For example `App`, `Home`, `Login`, `Register`
**Notation** `ComponentName` - for all components here

components - folder which contains all type of components separated by features
**Notation** `component-name` - for all components here
Every folder in this component should refer to containers directory.
For example we have `Home` directory in containers. So we need add directory with name __home__ in our components folder.
Then all components connected with `Home` should be placed here. __No bussiness logic in this folder__

shared - folder for dumb UI components like loaders, modals, forms views, input views and etc...
**Notation** `component-name` - for all components here

**tests** - folders which exists in all core sub directories like containers, components and etc...

# SCSS - modules and conventions

We are using BEM naming conventions
`Block`, `Element`, `Modifier`
