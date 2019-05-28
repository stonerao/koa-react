import * as d3 from "d3";
let _this;
export default class RenderCanvas {
    constructor(option) {
        let { width, height, geo, click } = option;
        // 管理渲染的数据
        this.state = {
            geo: geo,
            position: {},//坐标
            isNext: false,
            click: click || function () { }
        }
        _this = this;
        //Set canvas 
        let canvas = this.canvas = document.getElementById("canvas")
        this.context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        // this.projection = d3.geoMercator().fitSize([width - 20, height], geo)
        let padding = 50;
        this.projection = d3.geoMercator().fitExtent([[padding, padding], [width - padding * 2, height - padding * 2]], geo);
        //注册事件
        this.addWindowEvent()
    }
    addWindowEvent() {
        window.addEventListener("click", this.canvasClick)
    }
    removeWindowEvent() {
        window.removeEventListener("click", this.canvasClick)
    }
    getEventPosition(ev) {
        let x, y;
        if (ev.layerX || ev.layerX === 0) {
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX === 0) {
            // Opera
            x = ev.offsetX;
            y = ev.offsetY;
        }
        return { x: x, y: y };
    }
    canvasClick(e) {
        e.preventDefault();
        e.stopPropagation();
        _this.state.isNext = true;
        _this.state.position = _this.getEventPosition(e)

    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw map 
        // set map cneter position  
        let path = d3.geoPath().projection(this.projection);
        let mapPath = path.context(this.context);
        const addPath = d => {
            this.context.beginPath();
            mapPath(d);
            this.context.strokeStyle = "rgba(0, 0, 255,1)";
            this.context.lineWidth = 1;
            this.context.stroke();
            this.context.closePath();
            return this.context;
        };
        let features = JSON.parse(JSON.stringify(this.state.geo.features));
        //遍历添加地图
        let map_index = 0;
        while (map_index < features.length) {
            let cxt = features[map_index];
            //划线
            addPath(cxt);
            //判断当前点击
            let { position } = this.state;
            if (this.context.isPointInPath(position.x, position.y)) {
                this.context.fillStyle = "#58a";
                this.context.fill();
                if (this.state.isNext) {
                    this.state.click(cxt)
                    this.state.isNext = false;
                }
            }

            map_index++;
        }
        map_index = null;

    }
    renders() {
        // requestAnimationFrame(RenderCanvas.renders)
    }

}