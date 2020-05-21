const Router = require('koa-router')

const requireDirectory = require('require-directory')
const { apiDirectory, environment } = require('../config/config.js')
const errors = require('../core/http-exception')


class InitManager {
    static initCore(app) {
        InitManager.initLoadRouters(app)
        InitManager.initLoadEnvironment()
        InitManager.initLoadErrors()
    }

    static initLoadRouters(app) {
        const loadModules = (moduleObj) => {
            // 获取apiDirectory目录下所有router模块对象的value
            const router = Reflect.get(moduleObj, Reflect.ownKeys(moduleObj))
            if (router instanceof Router) {
                app.use(router.routes(), router.allowedMethods())
            }
        }
        requireDirectory(module, apiDirectory, { visit: loadModules })
    }

    static initLoadEnvironment() {
        global.environment = environment.env
    }

    static initLoadErrors() {
        global.errs = errors
    }
}

module.exports = {
    InitManager
}