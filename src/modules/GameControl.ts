import Snack from './Snack';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControl {
    snack: Snack;
    food: Food;
    scroePanel: ScorePanel;

    constructor() {
        this.snack = new Snack();
        this.food = new Food();
        this.scroePanel = new ScorePanel(10, 1);


        this.init();
    }

    direction: string = '';

    // 是否结束
    isLive: boolean = true;

    init() {
        // 绑定键盘按键
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run();
    }

    // 键盘响应函数
    keydownHandler(e: KeyboardEvent) {
        // 检查按键是否为方向键
        console.log(e.keyCode);
        this.direction = e.key;
        
    }

    run() {
        let x = this.snack.x;
        let y = this.snack.y;

        switch(this.direction) {
            case 'ArrowUp':
                y -= 10;
                break;
            case 'ArrowDown':
                y += 10;
                break;
            case 'ArrowLeft':
                x -= 10;
                break;
            case 'ArrowRight':
                x += 10;
                break;
            default:
            
        }
        this.checkEat(x, y);
        
        try {
            this.snack.setX(x);
            this.snack.setY(y);
        } catch(err) {
            alert('Game Over')
            this.isLive = false;
        }
    
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scroePanel.level - 1) * 30)
    }

    // 是否吃到
    checkEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change();
            this.scroePanel.addScore();
            this.snack.addBody();
        }
        return x === this.snack.x && y === this.snack.y
    }
}

export default GameControl;