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
  uiKey: 'u7e7c13a012',
};

const BasvuruGuncelle = ({ ticketdata,close, Id, ...rest }) => {
  const { translate } = useTranslation();
  const { tenant, user } = useAuthenticationContext();
  const { enqueueSnackbar } = useSnackbar();

  const [dataModel, setDataModel] = useState({});
  const [newTicketCode, setNewTicketCode] = useState("");
  const [isAlertVis, setIsAlertVis] = useState(false);

  const basePageRef = useRef();
  const adminAnswerRef = useRef();

  const { executeGet, executePost, executePut } = useFiProxy();

  useEffect(() => {
    if(ticketdata != undefined){
        setDataModel(ticketdata)
    }
  }, []);

  const onValueChanged = (field, value) => {
    setDataModel({ ...dataModel, [field]: value });
  };

  const onActionClick = (action) => {
    executePut({
        url: apiUrls.LocalTicketUpdate+ticketdata.Id,
        baseURL: apiUrls.LocalBaseApi,
        data: {
            ...dataModel,
        },
      }).then((response) => {
        if (response.Success) {
          CreateTicketResponse()
        }
      });
  };

  const CreateTicketResponse = (action) => {
    executePost({
        url: apiUrls.LocalTicketResponseCreate,
        baseURL: apiUrls.LocalBaseApi,
        data: {
            TicketId: ticketdata.Id,
            ResponseText: adminAnswerRef.current.value
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
            message={"Başvuru güncellendi."}
            mode="page"
            severity="success"
            visiable={false}
          />
          }
            <Select
            xs={6}
            name="Status"
            label={translate('Status')}
            datasource={[
                { name: translate('Answered'), code: 1 },
                { name: translate('Unanswered'), code: 2 },
                { name: translate('Unsolved'), code: 3 },
            ]}
            onChange={(value) => onValueChanged('Status', value)}
            columns={['name']}
            valuePath={'code'}
            value={dataModel.Status}
            />
            <Input
            xs={6}
            required
            ref={adminAnswerRef}
            rows={3}
            multiline
            label={translate('AdminAnswer')}
            />
       </Card>
    </BasePage>
  );
};

export default withFormPage(BasvuruGuncelle, { uiMetadata });
