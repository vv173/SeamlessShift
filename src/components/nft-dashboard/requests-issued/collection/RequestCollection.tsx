import React from 'react';
import { useTranslation } from 'react-i18next';
import { RequestsData } from '@app/api/requestsIssued.api';
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
      {/* Renderowanie komponentu na podstawie przekazanych właściwości */}
      <div>Issue Date: {issueDate.toLocaleString()}</div>
      <div>Comment: {comment}</div>
      <div>Classes ID: {classesId}</div>
      <div>User ID: {userId}</div>
      <div>Date: {date.toLocaleString()}</div>
      <S.BidButton type="ghost">Take up</S.BidButton>
    </S.Card>
  );
};
