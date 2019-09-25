export const beersSelector = ({ beersReducer: { beers, beersLoading, beersError } }) => ({
  beers,
  beersLoading,
  beersError
});
