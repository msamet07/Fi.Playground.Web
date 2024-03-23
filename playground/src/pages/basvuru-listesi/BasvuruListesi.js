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
  }, []);//sayfa yüklenirken yine 1 kere çalışıyor.[] bundan dolayı.

  const getDataSource = (data) => {
    executeGet({//bütün datayı get yapıyor ve urllerden alp geliyor.
      url: apiUrls.LocalTicketApi,
      baseURL: apiUrls.LocalBaseApi,
    }).then((response) => {
      if (response.Success) {
        setDataSource(response.Value)//setdatasourcenin içine  ekliyorum.Bütün ticketler artık var.Datasourceyi de gride verdim gridin içi otomatik doluyor.
      }
    });
  };

  const columns = useMemo(() => {
    return [
      { name: 'Id', header: translate('Id'), visible: false },//id alanım gözükmesin.
      { name: 'Code', header: translate('Code') },
      { name: 'Name', header: translate('Name') },
      { name: 'Status', header: translate('Status') },
      { name: 'Surname', header: translate('Surname') },
      { name: 'Age', header: translate('Age') }
    ];
  }, []);

  const onActionClick = (action) => { };

  const editClicked = useCallback((id, data) => {
    data && //yine satır dolu ise 
      showDialog({//bir popap açtım ve 
        title: translate('Sample edit'),
        content: <BasvuruGuncelle ticketdata={data} />,//basvuru güncelle companentine (neden companent? bu bir sayfa değil boşuna sayfa altına listelemesine gerek yok sadece status ve tickketa cevap yazacağım için bir companent )datayı gönder. 
        callback: () => { //ticketın en güncel hali için. Popap kapandığı zaman tekrar bütün datayı dolduruyoruz.
          getDataSource();
        },
      });
  }, []);

  const infoClicked = useCallback((id, data) => {
    data &&//satır boş değil ise
    showDialog({//popap açtım ve 
      title: translate('Ticket Detail'), 
      content: <BasvuruSorgula ticketdata={data} />,//bu kaydı ticket data olarak basvuru sorgulaya gönder o bana detayını göstersin.
      callback: () => {
      },
    });
  }, []);

  const gridActionList = useMemo(
    () => [
      {
        name: 'info',
        onClick: infoClicked,//infoya basılınca infoClicked çalışsın,
        scopeKey: scopeKeys.Create_Loan,//scope key verip herhangi bir düğmeye yetki verebiliriz. Altyapı elimde olmadığı için defoult bastım.
      },
      {
        name: 'edit',
        onClick: editClicked,//edite basılınca editClicked çalışsın,
        scopeKey: scopeKeys.Create_Loan,
      },
    ],
    [infoClicked, editClicked]
  );

  return (//1 tablom olacak 
    <BasePage {...props} onActionClick={onActionClick}>
      <Card
        scopeKey={scopeKeys.View_Loan}
        showHeader={true}
      >
        <DataGrid
          dataSource={dataSource}
          columns={columns}//tanımladığım kolonlar olacak.Kolonlara bakalım.
          actionList={gridActionList}//yapabileceğim actionlar.
          idProperty="Id"
        />
      </Card>
    </BasePage>
  );
};


export default withFormPage(BasvuruListesi, { uiMetadata });