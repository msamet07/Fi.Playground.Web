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
  Alert,
  Divider,
  InformationText
} from 'component/ui';

import { apiUrls } from '../../constants';

/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
  moduleName: 'playground',
  uiKey: 'u8a39a88355',
};

const BasvuruSorgula = ({ ticketdata, data, id, ...rest }) => {
  const { translate } = useTranslation();
  const { tenant, user } = useAuthenticationContext();
  const { enqueueSnackbar } = useSnackbar();

  const [dataModel, setDataModel] = useState({});
  const [ticketCode, setTicketCode] = useState("");
  const [isSearchVis, setIsSearchVis] = useState(true);
  const [response, setResponse] = useState("Admin tarafından bir cevap girilmemiş.");

  const basePageRef = useRef();
  const searchRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const ageRef = useRef();
  const idNumberRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  const { executeGet, executePost, executePut } = useFiProxy();

  useEffect(() => {
    if(ticketdata != undefined){
      setIsSearchVis(false)
      setDataModel(ticketdata)
      GetTicketResponse(ticketdata.Id)
    }
  }, []);

  const onActionClick = (action) => {
      executeGet({
        url: apiUrls.LocalTicketByCode+searchRef.current.value,
        baseURL: apiUrls.LocalBaseApi,
      }).then((response) => {
        if (response.Success) {
          setDataModel(response.Value[0])
          setIsSearchVis(false)
          GetTicketResponse(response.Value[0].Id)
        }
      });
  };

  const GetTicketResponse = (id) => {
    executeGet({
      url: apiUrls.LocalTicketResponseByTicketId+id,
      baseURL: apiUrls.LocalBaseApi,
    }).then((response) => {
      if (response.Success) {
        setResponse(response.Value.ResponseText)
      }
    });
  };
  return (
    <BasePage
      {...rest}
      ref={basePageRef}
      onActionClick={onActionClick}
      actionList={ticketdata != undefined ?[]:[
        { name: 'List',  scopeKey: scopeKeys.Create_Loan},
      ]}
    >
       <Card scopeKey={scopeKeys.Create_Loan}>
          {
            isSearchVis &&
            <Input
            xs={12}
            required
            ref={searchRef}
            label={translate('TicketSearch')}
            value={ticketCode}
            />
          }
          {
            !isSearchVis &&
            <>
              <Input
              xs={6}
              required
              ref={nameRef}
              label={translate('Name')}
              value={dataModel.Name}
              disabled
            />
            <Input
              xs={6}
              required
              ref={surnameRef}
              label={translate('Surname')}
              value={dataModel.Surname}
              disabled
            />
            <Input
              xs={6}
              required
              ref={idNumberRef}
              maxLength={11}
              label={translate('IdNumber')}
              value={dataModel.IdNumber}
              disabled
            />
            <Input
              xs={6}
              type="number"
              maxValue={99}
              required
              ref={ageRef}
              label={translate('Age')}
              value={dataModel.Age}
              disabled
            />
            <Input
            xs={6}
            required
            ref={addressRef}
            rows={3}
            multiline
            label={translate('Address')}
            value={dataModel.Address}
            disabled
            />
            <Input
              xs={6}
              required
              ref={descriptionRef}
              rows={3}
              multiline
              label={translate('TicketSubject')}
              value={dataModel.Description}
              disabled
            />
            <Divider
              orientation="horizontal"
              variant="fullWidth"
            />
            <InformationText
              subtitle={response}
              title="Admin Cevabı"
            />
            </>
          }
       </Card>
    </BasePage>
  );
};

export default withFormPage(BasvuruSorgula, { uiMetadata });