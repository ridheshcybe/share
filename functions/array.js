"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.array = void 0;
var events_1 = __importDefault(require("events"));
var array = /** @class */ (function () {
    function array() {
        this.inner = [];
        this.EE = new events_1["default"]();
    }
    array.prototype.push = function () {
        var _a;
        var val = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            val[_i] = arguments[_i];
        }
        (_a = this.inner).push.apply(_a, val);
        this.EE.emit("update", this.inner);
    };
    array.prototype.remove = function (val) {
        this.inner = this.inner.filter(function (e) { return e.ip !== val; });
        this.EE.emit("update", this.inner);
    };
    array.prototype.onUpdate = function (callback) {
        this.EE.on("update", callback);
    };
    return array;
}());
exports.array = array;
exports["default"] = array;
