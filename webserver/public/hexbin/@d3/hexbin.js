// https://observablehq.com/@d3/hexbin@128
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Hexbin

A demonstration of [d3-hexbin](https://github.com/d3/d3-hexbin) with a color encoding; compare to [area](/@mbostock/d3-hexbin-area).

Data: [diamonds](https://github.com/observablehq/datasets/tree/master/diamonds)`
)});
  main.variable(observer("viewof radius")).define("viewof radius", ["html"], function(html)
{
  const form = html`<form>
  <input name=i type=range min=2 max=20 step=1 value=8 style="width:180px;">
  <output style="font-size:smaller;font-style:oblique;" name=o></output>
</form>`;
  form.i.oninput = () => form.o.value = `${form.value = form.i.valueAsNumber}px radius`;
  form.i.oninput();
  return form;
}
);
  main.variable(observer("radius")).define("radius", ["Generators", "viewof radius"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","bins","hexbin","color"], function(d3,width,height,xAxis,yAxis,bins,hexbin,color)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.1)
    .selectAll("path")
    .data(bins)
    .join("path")
      .attr("d", hexbin.hexagon())
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("fill", d => color(d.length));

  return svg.node();
}
);
  main.variable(observer("height")).define("height", ["width"], function(width){return(
Math.max(640, width)
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 30, left: 40}
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleLog()
    .domain(d3.extent(data, d => d.x))
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLog()
    .domain(d3.extent(data, d => d.y))
    .rangeRound([height - margin.bottom, margin.top])
)});
  main.variable(observer("color")).define("color", ["d3","bins"], function(d3,bins){return(
d3.scaleSequential(d3.interpolateBuPu)
    .domain([0, d3.max(bins, d => d.length) / 2])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width","data"], function(height,margin,d3,x,width,data){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, ""))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, ".1s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", 4)
        .attr("y", margin.top)
        .attr("dy", ".71em")
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text(data.y))
)});
  main.variable(observer("hexbin")).define("hexbin", ["d3","x","y","radius","width","margin","height"], function(d3,x,y,radius,width,margin,height){return(
d3.hexbin()
    .x(d => x(d.x))
    .y(d => y(d.y))
    .radius(radius * width / 964)
    .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
)});
  main.variable(observer("bins")).define("bins", ["hexbin","data"], function(hexbin,data){return(
hexbin(data)
)});
  main.variable(observer("data")).define("data", ["d3"], async function(d3){return(
Object.assign(await d3.csv("http://localhost:8080/api/d3/hexbin", ({carat, price}) => ({x: +carat, y: +price})), {x: "ABV", y: "Estimated Ranking"})
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-hexbin@0.2")
)});
  return main;
}
