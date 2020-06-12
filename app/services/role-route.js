const { RoleRouteModel } = require("../models/role-route")

class RoleRouteService {
    constructor({ roleId, routeId }) {
        this.roleId = roleId
        this.routeId = routeId
    }

    async roleRouteCreate({ transaction }) {
        await RoleRouteModel.findOrCreate({
            where: {
                role_id: this.roleId,
                route_id: this.routeId
            }, transaction
        })
    }

    async roleRouteRemove({ transaction }) {
        return await RoleRouteModel.destroy({
            where: {
                role_id: this.roleId
            }, transaction
        })
    }

    async roleRouteEnable({ transaction }) {
        return await RoleRouteModel.restore({
            where: {
                role_id: this.roleId
            }, transaction
        })
    }
}

module.exports = {
    RoleRouteService
}
