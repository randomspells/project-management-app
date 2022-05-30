import { createSlice } from '@reduxjs/toolkit';
import { StorageEnum } from '../enums';
import LOCALES from '../translation/locales';
import { getItemFromStorage, saveItemToStorage } from '../utils';

interface CurrentLangInterface {
  currentLang: string;
}

const initialState: CurrentLangInterface = {
  currentLang: (getItemFromStorage(StorageEnum.Locale) as string) || LOCALES.ENGLISH,
}

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.currentLang = action.payload;
      saveItemToStorage(StorageEnum.Locale, action.payload);
    }
  }
});

export const { setLang } = translationSlice.actions;

export default translationSlice.reducer;
