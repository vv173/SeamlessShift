import React, { useEffect, useState, useCallback } from 'react';
import { BasicTableRow, getBasicTableData, Pagination } from 'api/table.api';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useMounted } from '@app/hooks/useMounted';
import { DashboardCard } from '../medical-dashboard/DashboardCard/DashboardCard';
import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import { Dayjs } from 'dayjs';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const Timetable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
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
      if (selectedDate && selectedPosition) {
        getBasicTableData({ ...pagination }).then((res) => {
          if (isMounted.current) {
            setTableData({ data: res.data, pagination: res.pagination, loading: false });
          }
        });
      }
    },
    [isMounted, selectedDate, selectedPosition],
  );

  useEffect(() => {
    if (selectedDate && selectedPosition) {
      fetch(initialPagination);
    }
  }, [fetch, selectedDate, selectedPosition]);

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
  ];

  return (
    <DashboardCard title={t('timetable.title')}>
      
      <BaseSelect placeholder='Wybierz usera' onChange={(value, _option) => setSelectedPosition(value as string | null)}>

        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">Yiminghe</Option>
      </BaseSelect>
      
      <DayjsDatePicker onChange={(date: Dayjs | null) => setSelectedDate(date ? date.toDate() : null)} />
      
      {selectedDate && selectedPosition && (
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
