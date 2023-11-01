import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';

export const RoleItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="role" label={t('common.role')}>
      <BaseSelect>
        <Option value="user">
          <BaseSpace align="center">
            {t('common.user')}
          </BaseSpace>
        </Option>
        <Option value="admin">
          <BaseSpace align="center">
          {t('common.admin')}
          </BaseSpace>
        </Option>
      </BaseSelect>
    </BaseButtonsForm.Item>
  );
};
