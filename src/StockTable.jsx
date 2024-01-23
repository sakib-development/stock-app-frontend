import PropTypes from "prop-types";

export const StockTable = ({
  maxPrice,
  minPrice,
  avgPrice,
  maxVolume,
  minVolume,
  avgVolume,
}) => {
  const roundPrice = (price) => Math.round(price * 100) / 100;
  const commaVolume = (vol) =>
    vol.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <table>
      <tr>
        <th>Item</th>
        <th>Maximum</th>
        <th>Minimum</th>
        <th>Average</th>
      </tr>
      <tr>
        <th>Price</th>
        <th>{`$${roundPrice(maxPrice)}`}</th>
        <th>{`$${roundPrice(minPrice)}`}</th>
        <th>{`$${roundPrice(avgPrice)}`}</th>
      </tr>
      <tr>
        <th>Volume</th>
        <th>{`${commaVolume(maxVolume)}`}</th>
        <th>{`${commaVolume(minVolume)}`}</th>
        <th>{`${commaVolume(avgVolume)}`}</th>
      </tr>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </table>
  );
};

StockTable.propTypes = {
  maxPrice: PropTypes.number,
  minPrice: PropTypes.number,
  avgPrice: PropTypes.number,
  maxVolume: PropTypes.number,
  minVolume: PropTypes.number,
  avgVolume: PropTypes.number,
};
