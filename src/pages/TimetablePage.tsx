import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Timetable } from '@app/components/timetable/Timetable';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
//import { References } from '@app/components/common/References/References';
//import { useResponsive } from '@app/hooks/useResponsive';

const TimetablePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.timetable')}</PageTitle>
      <BaseRow gutter={[30, 30]}>
        <BaseCol id="timetable" xl={24}>
          <Timetable />
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default TimetablePage;
