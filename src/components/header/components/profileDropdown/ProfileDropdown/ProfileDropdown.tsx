import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { UserOutlined} from '@ant-design/icons';

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  const user = useAppSelector((state) => state.user.user);

  return user ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar size={40} icon={<UserOutlined />} />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <span>{`${user.name} ${user.surname}`}</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};