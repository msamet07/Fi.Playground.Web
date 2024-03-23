import React, { useEffect, useRef, useState, useMemo } from 'react';

import {
  useAuthenticationContext,
  useFiProxy,
  useSnackbar,
  useTranslation,
  useTransactionContext,
  scopeKeys,
  stringFormat
} from 'component/base';
import {
  BasePage,
  Card,
  Checkbox,
  Input,
  Select,
  SelectEnum,
  DatePicker,
  withFormPage,
  Alert
} from 'component/ui';

import { apiUrls } from '../../constants';

/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
  moduleName: 'playground',
  uiKey: 'u7e7c13a018',
};

const BasvuruOlustur = ({ close, Id, ...rest }) => {
  const { translate } = useTranslation();
  const { tenant, user } = useAuthenticationContext();
  const { enqueueSnackbar } = useSnackbar();

  const [dataModel, setDataModel] = useState({});
  const [newTicketCode, setNewTicketCode] = useState("");//oluşturduğum state sayesinde setNewTicketCode içinde artık kodum var ve 
  const [isAlertVis, setIsAlertVis] = useState(false);//basta false olan alertim true oldu. State değiştiği için de sayfa kendisni güncelleyecek ve basta false olan alertim true olup alerti görünür hale getirdim.messageye indiğimde

  const basePageRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const ageRef = useRef();
  const idNumberRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  const { executeGet, executePost, executePut } = useFiProxy();

  useEffect(() => {
  }, []);
//executePost,put get hepsi reacthookundan geliyor.Kullanırken biz bunları aslında altyapıdan almış oluyoruz.
  const onActionClick = (action) => {//hangi butona basıldığını nasıl anlayacağım sorunun cevabı.Burada 1 buton var o yüzden action.command name almasına gerek kalmadı.
      executePost({ //neden post dedim create ederken bize post lazım.
        url: apiUrls.LocalTicketCreate,// apileri apiurls içinde topladım. içine baktığım zaman ;
        baseURL: apiUrls.LocalBaseApi,
        data: {  //burada ticketinput modelime göre istenilen verileri yazıyorum.ve post ettim.
          ...dataModel,//şuan içi boş ama altta gönderdiğim verilere ek olarak baska bir veri daha göndermek istersem buraya ekleyip ...data model ve altta  yazdıklarım şeklinde gönderebilirim.
          Name: nameRef.current.value,//inputun içine yazılan veriyi bu şekilde ref vererek gönderebiliyorum.
          Surname: surnameRef.current.value,
          Age: ageRef.current.value,
          IdNumber: idNumberRef.current.value,
          Description: descriptionRef.current.value,
          Address: addressRef.current.value,

        },
      }).then((response) => {//bir sunucu hatası yoksa buraya düşüyor.
        if (response.Success) {
          setNewTicketCode(response.Value.Code)//response succes ise bana geriye dönen ticketın kodunu oluşturduğum state in valusunu dönüp setIsAlertVis i true ya çekiyor.
          setIsAlertVis(true);
        }
      });
  };
//bütün sayfalarımız basepage den türüyordu.
  return (
    <BasePage
      {...rest}
      ref={basePageRef}
      onActionClick={onActionClick}
      actionList={[
        { name: 'Save', scopeKey: scopeKeys.Create_Loan },//sayfanın sağında çıkan butonların isimleri için kullanıyorum.
      ]}
    > 
       <Card scopeKey={scopeKeys.Create_Loan}>
          {
            isAlertVis &&//alt taraf true olduğunda gösterecek şekilde bir alert koydum.
            <Alert
            message={"Başvurunuz oluşturuldu. Başvuru takip kodu: "+newTicketCode}//bununda içi doldu ve mesajım geldi ve ürettiğim kodu gösterdi.
            mode="page"
            severity="success"
            visiable={false}
          />
          }
          <Input
            xs={6}
            required
            ref={nameRef}
            label={translate('Name')}
            value={dataModel.Name}
          />
          <Input
            xs={6}
            required
            ref={surnameRef}
            label={translate('Surname')}
            value={dataModel.surname}
          />
          <Input
            xs={6}
            required
            ref={idNumberRef}
            maxLength={11}
            label={translate('IdNumber')}//çeviri için locals klasörü altında common içinde ayarları var.
            value={dataModel.idnumber}
          />
          <Input
            xs={6}
            type="number"
            maxValue={99}
            required
            ref={ageRef}
            label={translate('Age')}
            value={dataModel.age}
          />
          <Input
          xs={6}
          required
          ref={addressRef}
          rows={3}
          multiline
          label={translate('Address')}
          value={dataModel.address}
          />
          <Input
            xs={6}
            required
            ref={descriptionRef}
            rows={3}
            multiline
            label={translate('TicketSubject')}
            value={dataModel.description}
          />
       </Card>
    </BasePage>
  );
};

export default withFormPage(BasvuruOlustur, { uiMetadata });
