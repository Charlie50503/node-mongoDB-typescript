"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Include = void 0;
var Include = /** @class */ (function () {
    function Include() {
    }
    Include.execute = function (list, key) {
        return list.some(function (item) {
            item === key;
        });
    };
    return Include;
}());
exports.Include = Include;
