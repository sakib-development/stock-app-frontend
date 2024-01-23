import React, { useEffect, useState } from "react"
import axios from 'axios'

const PORT = 3000;
const BACKEND_URL = `http://localhost:${PORT}/fetch_stock_info`;

export const StockContext = React.createContext()

export const StockContextProvider = (props) => {
    const [stockTicker, setStockTicker] = useState('AAPL')
    const [validTicker, setValidTicker] = useState(true)
    const [loading, setLoading] = useState(false)
    const [stockData, setStockData] = useState(null)
    const [startDate, setStartDate] = useState("2023-01-01")
    const [endDate, setEndDate] = useState("2023-12-31")

    const getStockInfo = () => {
        setLoading(true);
        setStockData(null);
        // Fetch data for stock ticker
        axios
          .get(BACKEND_URL, {
            withCredentials: true,
            params: {
              stockTicker: stockTicker,
              startDate,
              endDate,
            },
          })
          .then((response) => {
            setStockData(response.data);
          })
          .catch((serverError) => {
            setStockData(null);
            const error = serverError?.response?.data?.error;
            if (error?.message != null) {
              alert(error.message);
            } else if (serverError.response == null) {
                alert('Check if the api server is running')
            }
          })
          .finally(() => {
            setLoading(false);
          });
    }

    useEffect(() => {
        const has_whitespace =  /\s/g.test(stockTicker)
        const startDateObj = Date.parse(startDate)
        const endDateObj = Date.parse(endDate)
        if (has_whitespace === true || stockTicker.length === 0 || startDateObj > endDateObj) {
            setValidTicker(false)
        } else {
            setValidTicker(true)
        }
    }, [stockTicker, startDate, endDate])

    return (
      <StockContext.Provider
        value={{
          stockTicker,
          setStockTicker,
          loading,
          getStockInfo,
          validTicker,
          stockData,
          startDate,
          setStartDate,
          endDate,
          setEndDate
        }}
      >
        {props.children}
      </StockContext.Provider>
    );
}