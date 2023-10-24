import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { RequestForm } from '@app/components/addRequest/RequestForm';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
//import { References } from '@app/components/common/References/References';
//import { useResponsive } from '@app/hooks/useResponsive';

const AddRequestPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.addRequest')}</PageTitle>
      <BaseRow gutter={[30, 30]}>
        <BaseCol id="add-request" xl={24}>
          <RequestForm />
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default AddRequestPage;
