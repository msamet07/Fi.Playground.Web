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
  const [newTicketCode, setNewTicketCode] = useState("");
  const [isAlertVis, setIsAlertVis] = useState(false);

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

  const onActionClick = (action) => {
      executePost({
        url: apiUrls.LocalTicketCreate,
        baseURL: apiUrls.LocalBaseApi,
        data: {
          ...dataModel,
          Name: nameRef.current.value,
          Surname: surnameRef.current.value,
          Age: ageRef.current.value,
          IdNumber: idNumberRef.current.value,
          Description: descriptionRef.current.value,
          Address: addressRef.current.value,

        },
      }).then((response) => {
        if (response.Success) {
          setNewTicketCode(response.Value.Code)
          setIsAlertVis(true);
        }
      });
  };

  return (
    <BasePage
      {...rest}
      ref={basePageRef}
      onActionClick={onActionClick}
      actionList={[
        { name: 'Save', scopeKey: scopeKeys.Create_Loan },
      ]}
    >
       <Card scopeKey={scopeKeys.Create_Loan}>
          {
            isAlertVis &&
            <Alert
            message={"Başvurunuz oluşturuldu. Başvuru takip kodu: "+newTicketCode}
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
            label={translate('IdNumber')}
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
