import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { MyClasses } from '@app/components/medical-dashboard/myClasses/MyClasses';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
//import { References } from '@app/components/common/References/References';
//import { useResponsive } from '@app/hooks/useResponsive';

const MyClassesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>My classes</PageTitle>
      <BaseRow gutter={[30, 30]}>
        <BaseCol id="my-classes" xl={24}>
          <MyClasses />
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default MyClassesPage;
