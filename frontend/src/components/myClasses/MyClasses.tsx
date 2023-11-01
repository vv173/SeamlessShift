import React, { useEffect, useState, useCallback } from 'react';
import { BasicTableRow, getBasicTableData, Pagination } from 'api/table.api';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { ColumnsType } from 'antd/es/table';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';
import { notificationController } from 'controllers/notificationController';
import { useMounted } from '@app/hooks/useMounted';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { DashboardCard } from '../medical-dashboard/DashboardCard/DashboardCard';
import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Dayjs } from 'dayjs';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const MyClasses: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    if (selectedDate) {
      fetch(initialPagination);
    }
  }, [fetch, selectedDate]);

  const handleTableChange = (pagination: Pagination) => {
    fetch(pagination);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('myClasses.hourStart'),
      dataIndex: 'startHour',
      //render: (text: string) => <span>{text}</span>,
    },
    {
      title: t('myClasses.hourEnd'),
      dataIndex: 'hourEnd',
    },
    {
      title: t('myClasses.subjectName'),
      dataIndex: 'subjectName',
    },
    {
      title: t('myClasses.classroom'),
      dataIndex: 'classroom',
    },
    {
      title: t('myClasses.type'),
      dataIndex: 'type',
    },
    {
      title: t('myClasses.description'),
      dataIndex: 'description',
    },
    {
      title: t('myClasses.addReplacement'),
      dataIndex: 'replacement',
      width: '15%',
      className: 'centered-cell',
      render: (text: string, record: { name: string; key: number }) => {
        return (
          <BaseSpace>
            <BaseButton
              //Dodawanie zastępstwa
              type="ghost"
              className='filled-button'
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
    <DashboardCard title={t('myClasses.title')}>
      <BaseButtonsForm.Item name="date">
      <DayjsDatePicker onChange={(date: Dayjs | null) => setSelectedDate(date ? date.toDate() : null)} />
      </BaseButtonsForm.Item>
      {selectedDate && (
        <BaseTable
          columns={columns}
          dataSource={tableData.data}
          loading={tableData.loading}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          bordered
        />
      )}
    </DashboardCard>
  );
};
