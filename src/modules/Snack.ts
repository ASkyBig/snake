
class Snack {
    head: HTMLElement;
    bodies: HTMLCollection;

    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snack')!;
        this.head = document.querySelector('#snack > div')!;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇头坐标
    get x() {
        return this.head.offsetLeft;
    }

    get y() {
        return this.head.offsetTop;
    }

    setX(value: number) {
        if (this.x === value) return;
        // 判断是否撞墙
        if (value < 0 || value > 290) {
            throw new Error('error')
        }

        // 是否掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            console.log('掉头了');
            // 往反方向继续移动
            if (value > this.x) {
                value = this.x - 10;
            } else {
                value = this.x + 10;
            }
        }
        this.moveBody();
        this.head.style.left = `${value}px`;
        this.checkHeadBody();
    }

    setY(value: number) {
        if (this.y === value) return;
        if (value < 0 || value > 290) {
            throw new Error('error')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            console.log('掉头了');
            // 往反方向继续移动
            if (value > this.y) {
                value = this.y - 10;
            } else {
                value = this.y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = `${value}px`;
        this.checkHeadBody();
    }

    // 增加一个方块
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    moveBody() {
        // 从后往前改位置
        for (let i = this.bodies.length - 1; i > 0; --i) {
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }

    // 是否撞到自身
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; ++i) {
            const bd = (this.bodies[i] as HTMLElement);
            if (this.x === bd.offsetLeft && this.y === bd.offsetTop) {
                throw new Error('撞到了')
            }
        }
    }
  
}

export default Snack;