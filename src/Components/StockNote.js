import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStockNote } from "../store";
import { useNavigate, useParams } from "react-router-dom";

const StockNote = () => {
  const { stocks } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stock = stocks.find((stock) => id === stock.id);

  const [stockNote, setStockNote] = useState({
    ticker: "",
    name: "",
    note: "",
  });

  useEffect(() => {
    if (stock) {
      setStockNote({
        ticker: stock.ticker,
        name: stock.name,
        note: stock.note,
      });
    }
  }, [stock]);

  const onChange = (ev) => {
    setStockNote({ ...stockNote, [ev.target.name]: ev.target.value });
  };

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateStockNote(stockNote));
    navigate("/watchlist");
  };

  return (
    <>
      <form onSubmit={update}>
        <textarea
          type="text"
          name="note"
          value={stockNote.note ? stockNote.note : ""}
          onChange={onChange}
        ></textarea>
        <button>update note</button>
      </form>
    </>
  );
};

export default StockNote;
