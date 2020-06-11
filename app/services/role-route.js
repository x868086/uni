const { RoleRouteModel } = require("../models/role-route")

class RoleRouteService {
    constructor({ roleId, routeId }) {
        this.roleId = roleId
        this.routeId = routeId
    }

    async roleRouteCreate(t) {
        await RoleRouteModel.findOrCreate({
            where: {
                role_id: this.roleId,
                route_id: this.routeId
            }, t
        })
    }
}

module.exports = {
    RoleRouteService
}