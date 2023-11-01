import React from 'react';
import { useTranslation } from 'react-i18next';
import { VisitorsPieChart } from '@app/components/charts/VisitorsPieChart';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

const ChartsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.charts')}</PageTitle>
      <BaseRow gutter={[30, 30]}>
        <BaseCol id="pie" xs={24} lg={12}>
        <h1><i>Wykres do raportow</i></h1>
          <VisitorsPieChart />
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default ChartsPage;
