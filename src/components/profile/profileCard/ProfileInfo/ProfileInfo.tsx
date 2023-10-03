import React from 'react';
import { UserModel } from '@app/domain/UserModel';
import * as S from './ProfileInfo.styles';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';

interface ProfileInfoProps {
  profileData: UserModel | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  return profileData ? (
    <S.Wrapper>
      <S.Title>{`${profileData?.name} ${profileData?.surname}`}</S.Title>
      <S.Subtitle>{profileData?.email}</S.Subtitle>
    </S.Wrapper>
  ) : null;
};
