import { useContext } from "react";
import { StockContext } from "./StockContext";
import { StockTable } from "./StockTable";

export function Stock() {
  const {
    stockTicker,
    setStockTicker,
    loading,
    getStockInfo,
    stockData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    validTicker,
  } = useContext(StockContext);
  const handleSearch = (e) => {
    e.preventDefault();

    getStockInfo();
  };

  const handleChange = (changeEvent) => {
    setStockTicker(changeEvent.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="stockAppContainer">
      <form>
        <div className="stockTickerContainer">
          <label>Enter a Stock Ticker</label>
          <input
            onChange={handleChange}
            type="text"
            id="stockTicker"
            placeholder="Stock Ticker"
            value={stockTicker}
          />
          <button
            onClick={handleSearch}
            disabled={!validTicker || loading}
            title={
              validTicker
                ? null
                : "Please enter a valid stock ticker symbol or check your date range"
            }
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
        <div className="stockTickerContainer">
          <label htmlFor="startDate">Select start date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            max={yesterday()}
            onChange={handleStartDateChange}
          />
          <label htmlFor="endDate">Select end date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            max={yesterday()}
            onChange={handleEndDateChange}
          />
        </div>
      </form>

      {stockData != null && (
        <StockTable
          maxPrice={stockData.max_price}
          minPrice={stockData.min_price}
          avgPrice={stockData.avg_price}
          maxVolume={stockData.max_volume}
          minVolume={stockData.min_volume}
          avgVolume={stockData.avg_volume}
        />
      )}
    </div>
  );
}
