import { lazy } from 'react';

import { NotFound } from 'component/ui';

const SampleDefinition = lazy(() => import('./pages/sample-definition'));
const SampleList = lazy(() => import('./pages/sample-list'));
const BasvuruOlustur = lazy(() => import('./pages/basvuru-olustur'));
const BasvuruListesi = lazy(() => import('./pages/basvuru-listesi'));
const BasvuruSorgula = lazy(() => import('./pages/basvuru-sorgula'));

export default [
  {
    name: 'SampleDefinition',
    module: '/playground',
    path: '/sample-definition',
    component: SampleDefinition,
    uiKey: 'u7e7c13a017',
  },
  {
    name: 'SampleList',
    module: '/playground',
    path: '/sample-list',
    component: SampleList,
    uiKey: 'u8a39a88364',
  },
  {
    name: 'BasvuruOlustur',
    module: '/playground',
    path: '/basvuru-olustur',
    component: BasvuruOlustur,
    uiKey: 'u7e7c13a018',
  },
  {
    name: 'BasvuruListesi',
    module: '/playground',
    path: '/basvuru-listesi',
    component: BasvuruListesi,
    uiKey: 'u8a39a88364',
  },
  {
    name: 'BasvuruSorgula',
    module: '/playground',
    path: '/basvuru-sorgula',
    component: BasvuruSorgula,
    uiKey: 'u8a39a88355',
  },
  {
    name: 'NotFound',
    module: '/playground',
    path: '*',
    component: NotFound,
  },
];
