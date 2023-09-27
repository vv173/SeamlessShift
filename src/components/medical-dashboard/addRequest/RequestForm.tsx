import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import { notificationController } from '@app/controllers/notificationController';
import { DashboardCard } from '../DashboardCard/DashboardCard';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const RequestForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = async (values = {}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: t('common.success') });
      console.log(values);
    }, 1000);
  };

  return (
    <DashboardCard title="Adding request">
      <BaseButtonsForm
        {...formItemLayout}
        isFieldsChanged={isFieldsChanged}
        onFieldsChange={() => setFieldsChanged(true)}
        name="requestForm"
        onFinish={onFinish}
      >
        <BaseButtonsForm.Item
          name="date"
          label="Select date"
          rules={[{ required: true, message: 'Date field must not be empty!' }]}
        >
          <DayjsDatePicker />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name="select-multiple"
          label="Select subjects"
          rules={[{ required: true, message: 'Please select subjects!', type: 'array' }]}
        >
          <BaseSelect mode="multiple">
            <Option value="s1">subject 1</Option>
            <Option value="s2">subject 2</Option>
            <Option value="s3">subject 3</Option>
          </BaseSelect>
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item name="comment" label="Comment" rules={[{ required: false }]}>
          <BaseInput.TextArea rows={4} placeholder="Optional comment" />
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </DashboardCard>
  );
};
