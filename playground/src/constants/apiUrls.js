const apiUrls = {
  TestDefinitionsApi: 'Playground/TestDefinitions',
  TestDefinitionsByIdApi: 'Playground/TestDefinitions/{0}',
  MetaDataCountries: 'MetaData/Countries',
  MetaDataCountriesById: 'MetaData/Countries/{0}',
  LocalBaseApi: 'http://localhost:3000/', //mockoon nun adresi.
  LocalTicketApi: 'Ticket/Ticket', //api/v1 i araya o kendisi ekliyor bende yolun geri kalanını yazıyorum.Tekrar dönüyorum basvuruya
  LocalTicketById: 'Ticket/Ticket/{0}',
  LocalTicketCreate: 'Ticket/Ticket',  
  LocalTicketUpdate: 'Ticket/Ticket/',
  LocalTicketByCode: 'Ticket/Ticket/ByTicketCode/',
  LocalTicketResponseByTicketId: 'Ticket/TicketResponse/ByTicketId/',
  LocalTicketResponseCreate: 'Ticket/TicketResponse',

};

export { apiUrls };
