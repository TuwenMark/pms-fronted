import myAxios from "../plugins/myAxios";
import {useRouter} from "vue-router";
import {Toast} from "vant";

// const router = useRouter();

const getCurrentUser = async () => {
	const router = useRouter();
	const res = await myAxios.get("/user/current");
	if (res.code === 20000 && res.data) {
		// 用户已登录，返回当前用户
		return res.data;
	}
	// 用户未登录直接返回登录页面
	Toast.fail("用户未登录，请重新登录！");
	// console.log(router);
	router.replace("/user/login");
}

export {
	getCurrentUser,
}

