import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '@/types/asset';

export const fetchAssets = createAsyncThunk('ui/fetchAssets', async () => {
  const response = await fetch('/api/assets');
  if (!response.ok) throw new Error('Failed to fetch assets');
  return (await response.json()) as Asset[];
});

interface UiState {
  assets: Asset[];
  isLoading: boolean;
  selectedAsset: Asset | null;
  isModalOpen: boolean;
  isGlobalRequestModalOpen: boolean;
  searchQuery: string;
  activeTab: string;
}

const initialState: UiState = {
  assets: [],
  isLoading: true,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  openModal,
  closeModal,
  openGlobalRequestModal,
  closeGlobalRequestModal,
  setSearchQuery,
  setActiveTab,
} = uiSlice.actions;

export default uiSlice.reducer;
