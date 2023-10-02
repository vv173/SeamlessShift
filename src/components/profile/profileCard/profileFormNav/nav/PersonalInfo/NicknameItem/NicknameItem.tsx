import React from 'react';
//import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';

export const NicknameItem: React.FC = () => {
  //const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item name="nickname" label="Facility">
      <BaseSelect>
        <Option value="pacd">
          <BaseSpace align="center">Division of Programming and Computer Graphics</BaseSpace>
        </Option>
        <Option value="cscm">
          <BaseSpace align="center">Division of Computer Science and Computer Modelling</BaseSpace>
        </Option>
        <Option value="seds">
          <BaseSpace align="center">Division of Software Engineering and Database Systems</BaseSpace>
        </Option>
        <Option value="ipos">
          <BaseSpace align="center">Division of Information Protection and Operating Systems</BaseSpace>
        </Option>
        <Option value="itai">
          <BaseSpace align="center">Division of Internet of Things and Artificial Intelligence</BaseSpace>
        </Option>
        <Option value="ts">
          <BaseSpace align="center">Technical staff</BaseSpace>
        </Option>
        <Option value="as">
          <BaseSpace align="center">Administrative staff</BaseSpace>
        </Option>
      </BaseSelect>
    </BaseButtonsForm.Item>
  );
};
