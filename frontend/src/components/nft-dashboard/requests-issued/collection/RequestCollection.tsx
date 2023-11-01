import React from 'react';
import { useTranslation } from 'react-i18next';
import { RequestsData } from '@app/api/requestsIssued.api';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import * as S from './RequestCollection.styles';


export const RequestCollection: React.FC<RequestsData> = ({
  issueDate,
  comment,
  classesId,
  userId,
  date,
}) => {

  const { t } = useTranslation();

  return (
    <S.Card padding={20}>
      <BaseRow>{t('requestsIssued.issueDate')}: {issueDate.toLocaleString()}</BaseRow>
      <BaseRow>{t('requestsIssued.comment')}: {comment}</BaseRow>
      <BaseRow>Classes ID: {classesId}</BaseRow>
      <BaseRow>User ID: {userId}</BaseRow>
      <BaseRow>{t('requestsIssued.date')}: {date.toLocaleString()}</BaseRow>
      <S.BidButton type="ghost">{t('requestsIssued.takeUp')}</S.BidButton>
    </S.Card>
  );
};
