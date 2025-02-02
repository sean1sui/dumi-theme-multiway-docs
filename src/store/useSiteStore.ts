import { AtomAsset } from 'dumi-assets-types';
import {
  ILocale,
  ILocalesConfig,
  INavItem,
  IPreviewerProps,
  IRouteMeta,
  ISidebarGroup,
  IThemeConfig,
} from 'dumi/dist/client/theme-api/types';
import { PICKED_PKG_FIELDS } from 'dumi/dist/constants';
import type { Location } from 'history';

import { ComponentType } from 'react';
import { create, StoreApi } from 'zustand';
import { createContext } from 'zustand-utils';
import { devtools } from 'zustand/middleware';

export type NavData = (INavItem & { children?: INavItem[] | undefined })[];

export interface ISiteData {
  pkg: Partial<Record<keyof typeof PICKED_PKG_FIELDS, any>>;
  entryExports: Record<string, any>;
  demos: Record<
    string,
    {
      component: ComponentType;
      asset: IPreviewerProps['asset'];
      routeId: string;
    }
  >;

  components: Record<string, AtomAsset>;
  locales: ILocalesConfig;
  themeConfig: IThemeConfig;
  loading: boolean;
  setLoading: (status: boolean) => void;
}

export interface SiteStore {
  siteData: ISiteData;
  sidebar?: ISidebarGroup[];
  routeMeta: IRouteMeta;
  tabMeta?: NonNullable<IRouteMeta['tabs']>[0]['meta'];
  navData: NavData;
  location: Location;
  locale: ILocale;
}

export const createStore = (initState: SiteStore) =>
  create<SiteStore>()(devtools(() => initState, { name: 'dumi-theme-antd-style' }));

const { useStore, useStoreApi, Provider } = createContext<StoreApi<SiteStore>>();
export { useStore as useSiteStore, Provider, useStoreApi };
