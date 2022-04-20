
class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('food')!;
    }

    // 获取食物坐标
    get x() {
        return this.element.offsetLeft;
    }
    get y() {
        return this.element.offsetTop;
    }

    // 修改食物位置
    change() {
        // x最小0， 最大300 - 10 = 290；
        this.element.style.left =  Math.round(Math.random() * 29) * 10 + 'px';
        this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px';
    }
}

export default Food;