//获取cookie、
const cookieTool = {
	getCookie: (name: string) => {
		let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return (arr[2]);
		else
			return null;
	},

	//设置cookie,增加到vue实例方便全局调用
	setCookie: (c_name: any, value: any, expiredays: any) => {
		let exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
	},

	//删除cookie
	delCookie: (name: any) => {
		let exp = new Date();
		exp.setTime(exp.getTime() - 1);
		let cval = cookieTool.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
	}
}
export default cookieTool