import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: [],         
    singleCompany: null,
    searchCompanyByText: "", // New state for search text
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload || [];
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload || null;
        },
      setSearchCompanyByText: (state, action) => {
    state.searchCompanyByText = action.payload;
},
   
    }
});

export const { setCompanies, setSingleCompany,  setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;