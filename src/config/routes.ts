// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Index from "../pages/IndexPage.vue";
import Team from "../pages/teamPages/TeamPage.vue";
import TeamCreate from "../pages/teamPages/TeamCreatePage.vue";
import TeamUpdate from "../pages/teamPages/TeamUpdatePage.vue";
import TeamSearch from "../pages/teamPages/TeamSearchPage.vue";
import User from "../pages/UserPage.vue";
import IndexSearch from "../pages/IndexSearchPage.vue";
import SearchResult from "../pages/SearchResultPage.vue";
import Edit from "../pages/UserEditPage.vue";
import Login from "../pages/UserLoginPage.vue";
import LoginCode from "../pages/UserLoginCodePage.vue";
import SupplierAllBack from "../pages/SupplierAllBack.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/team/create', component: TeamCreate },
    { path: '/team/update', component: TeamUpdate },
    { path: '/team/search', component: TeamSearch },
    { path: '/user', component: User },
    { path: '/index/search', component: IndexSearch },
    { path: '/user/list', component: SearchResult },
    { path: '/user/edit', component: Edit },
    { path: '/user/login', component: Login },
    { path: '/user/login/code', component: LoginCode },
    { path: '/supplier/allBack', component: SupplierAllBack },
]

export default routes;