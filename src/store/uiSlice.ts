import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '@/types/asset';

interface UiState {
  selectedAsset: Asset | null;
  isModalOpen: boolean;
  isGlobalRequestModalOpen: boolean;
  searchQuery: string;
  activeTab: string;
}

const initialState: UiState = {
  selectedAsset: null,
  isModalOpen: false,
  isGlobalRequestModalOpen: false,
  searchQuery: '',
  activeTab: 'Featured',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Asset>) => {
      state.selectedAsset = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selectedAsset = null;
      state.isModalOpen = false;
    },
    openGlobalRequestModal: (state) => {
      state.isGlobalRequestModalOpen = true;
    },
    closeGlobalRequestModal: (state) => {
      state.isGlobalRequestModalOpen = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { 
  openModal, 
  closeModal, 
  openGlobalRequestModal, 
  closeGlobalRequestModal, 
  setSearchQuery, 
  setActiveTab 
} = uiSlice.actions;

export default uiSlice.reducer;
