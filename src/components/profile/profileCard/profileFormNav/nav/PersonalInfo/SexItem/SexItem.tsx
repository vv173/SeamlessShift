import React from 'react';
//import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';

export const SexItem: React.FC = () => {
  //const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="sex" label='Role'>
      <BaseSelect>
        <Option value="male">
          <BaseSpace align="center">
            User
          </BaseSpace>
        </Option>
        <Option value="female">
          <BaseSpace align="center">
            Admin
          </BaseSpace>
        </Option>
      </BaseSelect>
    </BaseButtonsForm.Item>
  );
};
