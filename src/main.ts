import {createApp} from 'vue'
import App from './App.vue'
import {
    Button,
    Icon,
    NavBar,
    Tabbar,
    TabbarItem,
    Search,
    Divider,
    Tag,
    TreeSelect,
    Col,
    Row,
    Cell,
    CellGroup,
    Form,
    Field,
    Card,
    Toast,
    Empty,
    Stepper,
    DatetimePicker,
    RadioGroup,
    Radio,
    Picker,
    Popup,
} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/routes";
import 'vant/lib/index.css';

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Divider);
app.use(Tag);
app.use(TreeSelect);
app.use(Col);
app.use(Row);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Card);
app.use(Toast);
app.use(Empty);
app.use(Stepper);
app.use(DatetimePicker);
app.use(RadioGroup);
app.use(Radio);
app.use(Picker);
app.use(Popup);


// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')
