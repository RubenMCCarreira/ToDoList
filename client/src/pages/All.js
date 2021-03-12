import React from 'react';
import Layout from '../containers/Layout';
import ToDos from '../containers/ToDos';

const All = () => {
  return (
    <Layout>
      <ToDos all />
    </Layout>
  );
};

export default All;
