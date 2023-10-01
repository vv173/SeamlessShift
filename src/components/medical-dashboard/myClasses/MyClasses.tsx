import React, { useEffect, useState, useCallback } from 'react';
import { BasicTableRow, getBasicTableData, Pagination, Tag } from 'api/table.api';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { ColumnsType } from 'antd/es/table';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';
import { notificationController } from 'controllers/notificationController';
import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
import { useMounted } from '@app/hooks/useMounted';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const MyClasses: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();
  const { isMounted } = useMounted();

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getBasicTableData(pagination).then((res) => {
        if (isMounted.current) {
          setTableData({ data: res.data, pagination: res.pagination, loading: false });
        }
      });
    },
    [isMounted],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: Pagination) => {
    fetch(pagination);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: 'hour start',
      dataIndex: 'startHour',
      //render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'hour end',
      dataIndex: 'hourEnd',
    },
    {
      title: 'subject name',
      dataIndex: 'subjectName',
    },
    {
      title: 'classroom',
      dataIndex: 'classroom',
    },
    {
      title: 'type',
      dataIndex: 'type',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'replacement',
      dataIndex: 'replacement',
      width: '15%',
      render: (text: string, record: { name: string; key: number }) => {
        return (
          <BaseSpace>
            <BaseButton
              //Dodawanie zastępstwa
              type="ghost"
              onClick={() => {
                notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              +
            </BaseButton>
          </BaseSpace>
        );
      },
    },
  ];

  return (
    <DashboardCard title="My classes">
      <BaseButtonsForm.Item name="date">
        <DayjsDatePicker />
      </BaseButtonsForm.Item>
      <BaseTable
        columns={columns}
        dataSource={tableData.data}
        //pagination={tableData.pagination}
        loading={tableData.loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
        bordered
      />
    </DashboardCard>
  );
};
