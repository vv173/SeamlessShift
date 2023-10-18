import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';
//import { TrendingCollections } from '@app/components/nft-dashboard/trending-collections/TrendingCollections';
import { RequestIssued } from '@app/components/nft-dashboard/requests-issued/RequestIssued';
import * as S from './DashboardPage.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

const MedicalDashboardPage: React.FC = () => {
  const { isDesktop } = useResponsive();

  const desktopLayout = (
    <BaseRow>
      <S.LeftSideCol xl={16} xxl={17} id="desktop-content">
        {/*
        <BaseRow gutter={[60, 60]}>
          <BaseCol span={24}>
            <TrendingCollections />
          </BaseCol>
        </BaseRow>
  */}

        <BaseRow gutter={[60, 60]}>
          <BaseCol span={24}>
            <RequestIssued />
          </BaseCol>
        </BaseRow>

        <References />
      </S.LeftSideCol>

      {/*
      <S.RightSideCol xl={8} xxl={7}>
        <div id="balance">
          <Balance />
        </div>
        <S.Space />
        <div id="total-earning">
          <TotalEarning />
        </div>
        <S.Space />
      </S.RightSideCol>
      */}
    </BaseRow>
  );

  const mobileAndTabletLayout = (
    <BaseRow gutter={[60, 60]}>
      <BaseCol span={24}>
        <RequestIssued />
      </BaseCol>
    </BaseRow>
  );

  return (
    <>
      <PageTitle>apka</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default MedicalDashboardPage;
