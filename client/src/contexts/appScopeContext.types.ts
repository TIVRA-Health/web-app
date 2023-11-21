export interface INotification {
  notification?: string;
}

export interface IAppState {
  loading: boolean;
  isDirty: boolean;
  notification?: INotification;
}

export interface IAppScopeProviderProps {
  children?: React.ReactNode;
}
