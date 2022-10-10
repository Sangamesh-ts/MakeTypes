"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseThrows = exports.parseEquals = void 0;
var assert = require("assert");
var Context = /** @class */ (function () {
    function Context(fail, prop, msg) {
        this.fail = fail;
        this.prop = prop;
        this.msg = msg;
    }
    Context.prototype.or = function (test, msg) {
        if (!this.fail) {
            return new Context(test(), this.prop, msg);
        }
        else {
            return this;
        }
    };
    return Context;
}());
function equal(expected, actual, prop) {
    if (expected === null || typeof (expected) !== "object") {
        return new Context(expected !== actual, prop, expected + " !== " + actual);
    }
    if (Array.isArray(expected)) {
        var ctx = new Context(!Array.isArray(actual), prop, 'Expected an array.')
            .or(function () { return actual.length !== expected.length; }, "Array lengths do not match.");
        if (!ctx.fail) {
            for (var i = 0; i < expected.length; i++) {
                var ctx_1 = equal(expected[i], actual[i], prop + "[" + i + "]");
                if (ctx_1.fail) {
                    return ctx_1;
                }
            }
            return new Context(false, prop, '');
        }
        else {
            return ctx;
        }
    }
    else {
        var keys = Object.keys(expected);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var ctx = equal(expected[key], actual[key], prop + "." + key);
            if (ctx.fail) {
                return ctx;
            }
        }
        return new Context(false, prop, '');
    }
}
function parseEquals(proxy, s, expected) {
    var d = proxy.Parse(s);
    var ctx = equal(expected, d, 'root');
    assert(!ctx.fail, "Property " + ctx.prop + " does not match: " + ctx.msg);
}
exports.parseEquals = parseEquals;
function parseThrows(proxy, s) {
    var threw = false;
    try {
        proxy.Parse(s);
    }
    catch (e) {
        threw = true;
    }
    assert(threw);
}
exports.parseThrows = parseThrows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQWlDO0FBTWpDO0lBSUUsaUJBQVksSUFBYSxFQUFFLElBQVksRUFBRSxHQUFXO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxvQkFBRSxHQUFULFVBQVUsSUFBbUIsRUFBRSxHQUFXO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBRUQsU0FBUyxLQUFLLENBQUMsUUFBYSxFQUFFLE1BQVcsRUFBRSxJQUFZO0lBQ3JELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3RELE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxJQUFJLEVBQUssUUFBUSxhQUFRLE1BQVEsQ0FBQyxDQUFDO0tBQzVFO0lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzNCLElBQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLENBQUM7YUFDeEUsRUFBRSxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQWpDLENBQWlDLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFNLEtBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBSyxJQUFJLFNBQUksQ0FBQyxNQUFHLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxLQUFHLENBQUMsSUFBSSxFQUFFO29CQUNaLE9BQU8sS0FBRyxDQUFDO2lCQUNaO2FBQ0Y7WUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDO1NBQ1o7S0FDRjtTQUFNO1FBQ0wsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUssSUFBSSxTQUFJLEdBQUssQ0FBQyxDQUFDO1lBQ2hFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckM7QUFDSCxDQUFDO0FBRUQsU0FBZ0IsV0FBVyxDQUFJLEtBQWUsRUFBRSxDQUFTLEVBQUUsUUFBVztJQUNwRSxJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsY0FBWSxHQUFHLENBQUMsSUFBSSx5QkFBb0IsR0FBRyxDQUFDLEdBQUssQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFKRCxrQ0FJQztBQUVELFNBQWdCLFdBQVcsQ0FBSSxLQUFlLEVBQUUsQ0FBUztJQUN2RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsSUFBSTtRQUNGLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDZDtJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQixDQUFDO0FBUkQsa0NBUUMifQ==