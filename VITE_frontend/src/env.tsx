const PORT = 3000;
const BASE_URL = "http://localhost:";
const SIGNUP_ROUTE = "/store/signup";
const LOGIN_ROUTE = "/store/login";
const STORE_DATA_ROUTE = "/store/api/getStoreData";
const STORE_STOCK_QUERRY = "/store/api/querryStock";
const ADD_STOCK = "/store/api/addMed"
const MEDICINE_SEARCH = "/medicines/search";
const REMOVE_STOCK = "/store/api/removeMed";
const BILLING_STOCK = "/store/api/billing";
const BILL_BY_NAME = "/store/api/getBillsByName";
const BILL_BY_PHONE = "/store/api/getBillsByPhone";
const BILL_BY_MED = "/store/api/getBillByMed"

export {
    PORT,
    BASE_URL,
    SIGNUP_ROUTE,
    LOGIN_ROUTE,
    STORE_DATA_ROUTE,
    MEDICINE_SEARCH,
    ADD_STOCK,
    STORE_STOCK_QUERRY,
    REMOVE_STOCK,
    BILLING_STOCK,
    BILL_BY_NAME,
    BILL_BY_PHONE,
    BILL_BY_MED,
}