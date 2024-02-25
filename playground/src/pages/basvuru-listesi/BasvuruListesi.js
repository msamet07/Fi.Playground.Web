import React, { useEffect, useMemo, useState, useCallback } from 'react';

import {
  useAuthenticationContext,
  useFiProxy,
  useFormManagerContext,
  useSnackbar,
  useTranslation,
  scopeKeys,
  stringFormat,
} from 'component/base';
import { Card, DataGrid, Filter, Input, BasePage, withFormPage } from 'component/ui';

import SampleDefinition from '../sample-definition';
import { apiUrls } from '../../constants';
import BasvuruSorgula from '../basvuru-sorgula';
import BasvuruGuncelle from '../../components/basvuru-guncelle';

/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
  moduleName: 'playground',
  uiKey: 'u8a39a88354',
};

const BasvuruListesi = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { tenant } = useAuthenticationContext();
  const { showDialog } = useFormManagerContext();
  const [dataSource, setDataSource] = useState([]);
  const { translate } = useTranslation();

  const { executeGet, executeDelete } = useFiProxy();

  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = (data) => {
    executeGet({
      url: apiUrls.LocalTicketApi,
      baseURL: apiUrls.LocalBaseApi,
    }).then((response) => {
      if (response.Success) {
        setDataSource(response.Value)
      }
    });
  };

  const columns = useMemo(() => {
    return [
      { name: 'Id', header: translate('Id'), visible: false },
      { name: 'Code', header: translate('Code') },
      { name: 'Name', header: translate('Name') },
      { name: 'Status', header: translate('Status') },
      { name: 'Surname', header: translate('Surname') },
      { name: 'Age', header: translate('Age') }
    ];
  }, []);

  const onActionClick = (action) => { };

  const editClicked = useCallback((id, data) => {
    data &&
      showDialog({
        title: translate('Sample edit'),
        content: <BasvuruGuncelle ticketdata={data} />,
        callback: () => {
          getDataSource();
        },
      });
  }, []);

  const infoClicked = useCallback((id, data) => {
    data &&
    showDialog({
      title: translate('Ticket Detail'),
      content: <BasvuruSorgula ticketdata={data} />,
      callback: () => {
      },
    });
  }, []);

  const gridActionList = useMemo(
    () => [
      {
        name: 'info',
        onClick: infoClicked,
        scopeKey: scopeKeys.Create_Loan,
      },
      {
        name: 'edit',
        onClick: editClicked,
        scopeKey: scopeKeys.Create_Loan,
      },
    ],
    [infoClicked, editClicked]
  );

  return (
    <BasePage {...props} onActionClick={onActionClick}>
      <Card
        scopeKey={scopeKeys.View_Loan}
        showHeader={true}
      >
        <DataGrid
          dataSource={dataSource}
          columns={columns}
          actionList={gridActionList}
          idProperty="Id"
        />
      </Card>
    </BasePage>
  );
};


export default withFormPage(BasvuruListesi, { uiMetadata });