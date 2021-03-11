import React from 'react';
import { connect } from 'react-redux';
import { injectReducer } from '.';

const withReducer = (
  reducerKey,
  reducer,
  mapStateToProps,
  mapDispatchToProps,
  Container
) => {
  const WrappedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Container);

  injectReducer(reducerKey, reducer);

  return WrappedComponent;
};

export default withReducer;
