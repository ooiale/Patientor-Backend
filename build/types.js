"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var healthCheckRating;
(function (healthCheckRating) {
    healthCheckRating[healthCheckRating["Health"] = 0] = "Health";
    healthCheckRating[healthCheckRating["LowRisk"] = 1] = "LowRisk";
    healthCheckRating[healthCheckRating["HighRisk"] = 2] = "HighRisk";
    healthCheckRating[healthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(healthCheckRating || (healthCheckRating = {}));
