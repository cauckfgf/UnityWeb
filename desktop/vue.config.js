module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/static/UnityWeb/desktop/dist/" : "/",
	devServer: {
		proxy: {
			"^/login": {
				target: "http://116.236.213.2:9000"
			},
			"^/static": {
				target: "http://116.236.213.2:9000"
			},
			"^/upload": {
				target: "http://116.236.213.2:9000"
			},
			"^/file": {
				target: "http://116.236.213.2:9000"
			},
			"^/faceDatabase": {
				target: "http://116.236.213.2:9000"
			},
			"^/image": {
				target: "http://116.236.213.2:9000"
			},
			"^/s6": {
				target: "http://116.236.213.2:9000"
			},
			"^/mag": {
				target: "http://116.236.213.2:9000"
			},
			"^/Space": {
				target: "http://192.168.0.131:8000/"
			},
			"^/api": {
				target: "http://116.236.213.2:9000",
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias["~"] = "node_modules";
		return config;
	}
};
