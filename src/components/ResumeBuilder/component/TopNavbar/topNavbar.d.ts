export interface TProps {
  itemStatus: {
    [key: string]: boolean;
  };
  theme: {
    [key: string]: string;
  };
  userData: {
    [key: string]: string;
  };
  data: any;
}
export interface TState {
  colorPicker: boolean;
  bgComplete: boolean;
  checked: boolean;
  sectionStatus: boolean;
  colorStatus: boolean;
  typoStatus: boolean;
  saveModal: boolean;
  loadModal: boolean;
  uploadErrMsg: boolean;
  gifGenerateStatus: boolean;
}
