import { connect } from 'react-redux';
import { injectReducer } from './initializeStore';

const withInjectReducer = (
  reducerKey,
  reducer,
  mapStateToProps,
  mapDispatchToProps,
  Container
) => {
  const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Container);

  injectReducer(reducerKey, reducer);

  return WrappedComponent;
};

export default withInjectReducer;
