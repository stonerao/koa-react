function add() {

}
window.onload = function () {
    var dataset = [180, 180, 180, 40, 60, 80, 100];    //数据都是自定义

    var width = 400;
    var height = 400;

    var svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px dashed #ccc");

    var padding = { left: 30, right: 30, top: 20, bottom: 20 };
    var grap = 10;

    var xScale = d3 //x轴比例尺
        .scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, width - padding.left - padding.right]);

    var yScale = d3 //y轴比例尺
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([width - padding.top - padding.bottom, 0]);

    //x轴
    var gAxis = svg
        .append("g")
        .attr(
            "transform",
            "translate(" + padding.left + "," + (height - padding.bottom) + ")"
        )
        .call(d3.axisBottom(xScale));

    //y轴
    var gYxis = svg
        .append("g")
        .attr(
            "transform",
            "translate(" + padding.left + "," + padding.top + ")"
        )
        .call(d3.axisLeft(yScale));

    //柱形图
    var rect = svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("fill", "steelblue")
        .attr("x", function (d, i) {
            return xScale(i) + grap / 2;
        })
        // .attr("y", function(d, i) {  //这种方式和下面直接用比例尺的方式一样。
        //   return yScale(d);
        // })
        .attr("y", yScale)
        .attr(
            "transform",
            "translate(" + padding.left + "," + padding.bottom + ")"
        )
        .attr("width", xScale.step() - grap)
        .attr("height", function (d, i) {
            return height - padding.top - padding.bottom - yScale(d);
        });

    //图形标注
    var texts = svg
        .selectAll("MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "MyText")
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .attr(
            "transform",
            "translate(" + padding.left / 2 + "," + padding.top + ")"
        )
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d, i) {
            return yScale(d);
        })
        .attr("dx", function () {
            // return (xScale.bandwidth() - grap) / 2; //V4版本
            return (xScale.step()) / 2; //V4版本

            //step（）  和 bandwidth（）都表示坐标两点间的距离
        })
        .attr("dy", function () {
            return "2em";
        })
        .text(function (d) {
            return d;
        });
}