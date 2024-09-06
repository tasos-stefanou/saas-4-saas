import React from 'react';

type AgencyPageParams = {
  params: {
    agencyId: string;
  };
};

const AgencyPage = ({ params }: AgencyPageParams) => {
  return <div>{params.agencyId}</div>;
};

export default AgencyPage;
