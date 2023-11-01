import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCoinHistory from "../FetchFunctions/fetchCoinHistory";
import * as d3 from "d3";

const LineChart = () => {
  const svgChart = useRef();
  const { id } = useParams();
  const width = 980;
  const height = 500;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;

  const results = useQuery(["market", id], fetchCoinHistory, {
    refetchOnMount: true,
  });

  if (results.isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (results.isError) {
    return <h1>Error: Market details for {id} not found</h1>;
  }
  const coinHistory = results.data.prices;

  useEffect(() => {
    const x = d3.scaleTime(
      d3.extent(coinHistory, (data) => data[0]),
      [marginLeft, width - marginRight]
    );

    const y = d3.scaleLinear(
      [0, d3.max(coinHistory, (data) => data[1] * 1.25)],
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
  }, []);

  return (
    <div>
      <svg ref={svgChart}></svg>
    </div>
  );
};
export default LineChart;
