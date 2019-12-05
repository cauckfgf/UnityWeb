import axios from "axios";
import cookie from "cookie";
export default axios.create({
	baseURL: process.env.NODE_ENV === "production" ? "/" : "/api/",
	headers: {
		"X-CSRFToken": cookie.parse(document.cookie).csrftoken
	}
});
