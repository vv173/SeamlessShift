import React, { useState, useEffect, useCallback } from 'react';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { getEditableTableData, BasicTableRow, Pagination } from 'api/table.api';
import { EditableCell } from './EditableCell';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';
import { useMounted } from '@app/hooks/useMounted';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { Key, DefaultRecordType } from 'rc-table/lib/interface';


const initialPagination: Pagination = {
  current: 1,
  pageSize: 6,
};

export const EditableTable: React.FC = () => {
  const [form] = BaseForm.useForm();
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [editingKey, setEditingKey] = useState(0);
  const { t } = useTranslation();
  const { isMounted } = useMounted();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getEditableTableData(pagination).then((res) => {
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
    cancel();
  };

  const isEditing = (record: BasicTableRow) => record.key === editingKey;

  const edit = (record: Partial<BasicTableRow> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: Key[], selectedRows: DefaultRecordType[]) => {
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record: DefaultRecordType, selected: boolean, selectedRows: DefaultRecordType[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DefaultRecordType[]) => {
      console.log(selected, selectedRows);
    },
  };

  const handleDeleteSelectedRows = () => {
    const newData = tableData.data.filter((item) => !selectedRowKeys.includes(item.key));
    setTableData({ ...tableData, data: newData });
    setSelectedRowKeys([]); // Wyczyść zaznaczone klucze po usunięciu wierszy
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as BasicTableRow;

      const newData = [...tableData.data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.push(row);
      }
      setTableData({ ...tableData, data: newData });
      setEditingKey(0);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDeleteRow = (rowId: number) => {
    setTableData({ ...tableData, data: tableData.data.filter((item) => item.key !== rowId) });
  };

  const columns = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      //title: t('common.age'),
      title: 'e-mail',
      dataIndex: 'e-mail',
      width: '20%',
      editable: true,
    },
    {
      //title: t('common.address'),
      title: 'phone',
      dataIndex: 'phone',
      width: '20%',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      width: '20%',
      editable: true,
    },
    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      render: (text: string, record: BasicTableRow) => {
        const editable = isEditing(record);
        return (
          <BaseSpace>
            {editable ? (
              <>
                <BaseButton type="primary" onClick={() => save(record.key)}>
                  {t('common.save')}
                </BaseButton>
                <BasePopconfirm title={t('tables.cancelInfo')} onConfirm={cancel}>
                  <BaseButton type="ghost">{t('common.cancel')}</BaseButton>
                </BasePopconfirm>
              </>
            ) : (
              <>
                <BaseButton type="ghost" disabled={editingKey !== 0} onClick={() => edit(record)}>
                  {t('common.edit')}
                </BaseButton>
                <BaseButton type="default" danger onClick={() => handleDeleteRow(record.key)}>
                  {t('tables.delete')}
                </BaseButton>
              </>
            )}
          </BaseSpace>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: BasicTableRow) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  return (
    <BaseForm form={form} component={false}>
      <BaseTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={tableData.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowSelection={rowSelection}
        pagination={{
          ...tableData.pagination,
          onChange: cancel,
        }}
        onChange={handleTableChange}
        loading={tableData.loading}
        scroll={{ x: 800 }}
      />
      <BaseButton type="default" danger onClick={handleDeleteSelectedRows}>
      {t('common.deleteSelected')}
      </BaseButton>
    </BaseForm>
  );
};