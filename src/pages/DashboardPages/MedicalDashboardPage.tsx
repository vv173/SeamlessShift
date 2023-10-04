import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { MyClasses } from '@app/components/medical-dashboard/myClasses/MyClasses';
import { RequestForm } from '@app/components/medical-dashboard/addRequest/RequestForm';
//import { TreatmentCard } from '@app/components/medical-dashboard/treatmentCard/TreatmentCard';
import { HealthCard } from '@app/components/medical-dashboard/HealthCard/HealthCard';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';
//import * as S from './DashboardPage.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

const MedicalDashboardPage: React.FC = () => {
  const { isTablet, isDesktop } = useResponsive();

  const { t } = useTranslation();

  const desktopLayout = (
    <BaseRow>
      <BaseRow gutter={[30, 30]}>
        <BaseCol id="my-classes" xl={24}>
          <MyClasses />
        </BaseCol>

        <BaseCol id="add-request" xl={24}>
          <RequestForm />
        </BaseCol>

        {/*
        <BaseCol id="treatment-plan" xl={24}>
          <TreatmentCard />
        </BaseCol>
        */}

        <BaseCol id="health" xl={24} xxl={12}>
          <HealthCard />
        </BaseCol>
      </BaseRow>
      <References />
    </BaseRow>
  );

  const mobileAndTabletLayout = (
    <BaseRow gutter={[20, 20]}>
      <BaseCol id="my-classes" xl={24}>
        <MyClasses />
      </BaseCol>
      <BaseCol id="add-request" xs={24} md={12} order={(isTablet && 8) || 0}>
        <RequestForm />
      </BaseCol>

      {/*
      <BaseCol id="treatment-plan" xs={24} md={24} order={(isTablet && 10) || 0}>
        <TreatmentCard />
      </BaseCol>
      */}

      <BaseCol id="health" xs={24} md={12} order={(isTablet && 9) || 0}>
        <HealthCard />
      </BaseCol>
    </BaseRow>
  );

  return (
    <>
      <PageTitle>{t('common.medical-dashboard')}</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default MedicalDashboardPage;
