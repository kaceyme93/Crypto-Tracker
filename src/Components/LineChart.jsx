import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/LineChart.css";
import * as d3 from "d3";

const LineChart = () => {
  const svgChart = useRef(null);
  const [coinHistory, setCoinHistory] = useState([]);
  const [timeFrame, setTimeFrame] = useState("1");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1");
  const { id } = useParams();
  const width = 980;
  const height = 500;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const isDay = selectedTimeFrame === "1";
  const is7 = selectedTimeFrame === "7";
  const is14 = selectedTimeFrame === "14";
  const is30 = selectedTimeFrame === "30";
  const is90 = selectedTimeFrame === "90";
  const is180 = selectedTimeFrame === "180";
  const is365 = selectedTimeFrame === "365";
  const isMax = selectedTimeFrame === "max";
  const fetchData = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeFrame}`
    );
    const dataJSON = await data.json();
    setCoinHistory(dataJSON.prices);
  };
  const handleClick = (selection) => {
    setTimeFrame(selection);
    setSelectedTimeFrame(selection);
  };
  useEffect(() => {
    fetchData();
  }, [timeFrame]);
  const x = d3.scaleTime(
    d3.extent(coinHistory, (data) => data[0]),
    [marginLeft, width - marginRight]
  );

  const y = d3.scaleLinear(
    [
      d3.min(coinHistory, (data) => data[1]),
      d3.max(coinHistory, (data) => data[1]),
    ],
    [height - marginBottom, marginTop]
  );

  const line = d3
    .line()
    .x((data) => x(data[0]))
    .y((data) => y(data[1]));

  const svg = d3
    .select(svgChart.current)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  svg.selectAll("*").remove();
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Powered By CoinGecko")
    );

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(coinHistory));

  return (
    <div>
      <div className="timeFrame-Selector">
        <button
          onClick={() => handleClick("1")}
          className={`button ${isDay ? "active" : ""}`}
          id="day-selector"
        >
          24h
        </button>
        <button
          onClick={() => handleClick("7")}
          className={`button ${is7 ? "active" : ""}`}
        >
          7d
        </button>
        <button
          onClick={() => handleClick("14")}
          className={`button ${is14 ? "active" : ""}`}
        >
          14d
        </button>
        <button
          onClick={() => handleClick("30")}
          className={`button ${is30 ? "active" : ""}`}
        >
          30d
        </button>
        <button
          onClick={() => handleClick("90")}
          className={`button ${is90 ? "active" : ""}`}
        >
          90d
        </button>
        <button
          onClick={() => handleClick("180")}
          className={`button ${is180 ? "active" : ""}`}
        >
          {" "}
          180d
        </button>
        <button
          onClick={() => handleClick("365")}
          className={`button ${is365 ? "active" : ""}`}
        >
          1y
        </button>
        <button
          onClick={() => handleClick("max")}
          className={`button ${isMax ? "active" : ""}`}
          id="max-selector"
        >
          Max
        </button>
      </div>
      <svg ref={svgChart}></svg>
    </div>
  );
};
export default LineChart;
