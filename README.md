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

# Frontend architecture description

pages - folder which contains all separates views in application. For example `Home`, `Login`, `Register`
**Notation** `ComponentName` - for all components here

components - folder which contains all type of components separated by features
**Notation** `component-name` - for all components here

components/shared - folder for dumb UI components like loaders, modals, forms views, input views and etc...
**Notation** `component-name` - for all components here