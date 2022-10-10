"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d2s = exports.csh = exports.CCollectionShape = exports.CRecordShape = exports.CAnyShape = exports.NullableBooleanShape = exports.BooleanShape = exports.CBooleanShape = exports.NullableStringShape = exports.StringShape = exports.CStringShape = exports.NullableNumberShape = exports.NumberShape = exports.CNumberShape = exports.NullShape = exports.CNullShape = exports.BottomShape = exports.CBottomShape = exports.EntityContext = exports.FieldContext = exports.getReferencedRecordShapes = void 0;
var emit_1 = require("./emit");
function pascalCase(n) {
    return n.split("_").map(function (s) { return (s[0] ? s[0].toUpperCase() : "") + s.slice(1); }).join("");
}
function getReferencedRecordShapes(e, s, sh) {
    switch (sh.type) {
        case 2 /* RECORD */:
            if (!s.has(sh)) {
                s.add(sh);
                sh.getReferencedRecordShapes(e, s);
            }
            break;
        case 6 /* COLLECTION */:
            getReferencedRecordShapes(e, s, sh.baseShape);
            break;
        case 7 /* ANY */:
            sh.getDistilledShapes(e).forEach(function (sh) { return getReferencedRecordShapes(e, s, sh); });
            break;
    }
}
exports.getReferencedRecordShapes = getReferencedRecordShapes;
var FieldContext = /** @class */ (function () {
    function FieldContext(parent, field) {
        this.parent = parent;
        this.field = field;
    }
    Object.defineProperty(FieldContext.prototype, "type", {
        get: function () {
            return 1 /* FIELD */;
        },
        enumerable: false,
        configurable: true
    });
    FieldContext.prototype.getName = function (e) {
        var name = pascalCase(this.field);
        return name;
    };
    return FieldContext;
}());
exports.FieldContext = FieldContext;
var EntityContext = /** @class */ (function () {
    function EntityContext(parent) {
        this.parent = parent;
    }
    Object.defineProperty(EntityContext.prototype, "type", {
        get: function () {
            return 0 /* ENTITY */;
        },
        enumerable: false,
        configurable: true
    });
    EntityContext.prototype.getName = function (e) {
        return this.parent.getName(e) + "Entity";
    };
    return EntityContext;
}());
exports.EntityContext = EntityContext;
var CBottomShape = /** @class */ (function () {
    function CBottomShape() {
    }
    Object.defineProperty(CBottomShape.prototype, "type", {
        get: function () {
            return 0 /* BOTTOM */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CBottomShape.prototype, "nullable", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    CBottomShape.prototype.makeNullable = function () {
        throw new TypeError("Doesn't make sense.");
    };
    CBottomShape.prototype.makeNonNullable = function () {
        return this;
    };
    CBottomShape.prototype.emitType = function (e) {
        throw new Error("Doesn't make sense.");
    };
    CBottomShape.prototype.getProxyType = function (e) {
        throw new Error("Doesn't make sense.");
    };
    CBottomShape.prototype.equal = function (t) {
        return this === t;
    };
    return CBottomShape;
}());
exports.CBottomShape = CBottomShape;
exports.BottomShape = new CBottomShape();
var CNullShape = /** @class */ (function () {
    function CNullShape() {
    }
    Object.defineProperty(CNullShape.prototype, "nullable", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CNullShape.prototype, "type", {
        get: function () {
            return 1 /* NULL */;
        },
        enumerable: false,
        configurable: true
    });
    CNullShape.prototype.makeNullable = function () {
        return this;
    };
    CNullShape.prototype.makeNonNullable = function () {
        return this;
    };
    CNullShape.prototype.emitType = function (e) {
        e.interfaces.write("null");
    };
    CNullShape.prototype.getProxyType = function (e) {
        return "null";
    };
    CNullShape.prototype.equal = function (t) {
        return this === t;
    };
    return CNullShape;
}());
exports.CNullShape = CNullShape;
exports.NullShape = new CNullShape();
var CNumberShape = /** @class */ (function () {
    function CNumberShape() {
    }
    Object.defineProperty(CNumberShape.prototype, "nullable", {
        get: function () {
            return this === exports.NullableNumberShape;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CNumberShape.prototype, "type", {
        get: function () {
            return 5 /* NUMBER */;
        },
        enumerable: false,
        configurable: true
    });
    CNumberShape.prototype.makeNullable = function () {
        return exports.NullableNumberShape;
    };
    CNumberShape.prototype.makeNonNullable = function () {
        return exports.NumberShape;
    };
    CNumberShape.prototype.emitType = function (e) {
        e.interfaces.write(this.getProxyType(e));
    };
    CNumberShape.prototype.getProxyType = function (e) {
        var rv = "number";
        if (this.nullable) {
            rv += " | null";
        }
        return rv;
    };
    CNumberShape.prototype.equal = function (t) {
        return this === t;
    };
    return CNumberShape;
}());
exports.CNumberShape = CNumberShape;
exports.NumberShape = new CNumberShape();
exports.NullableNumberShape = new CNumberShape();
var CStringShape = /** @class */ (function () {
    function CStringShape() {
    }
    Object.defineProperty(CStringShape.prototype, "type", {
        get: function () {
            return 3 /* STRING */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CStringShape.prototype, "nullable", {
        get: function () {
            return this === exports.NullableStringShape;
        },
        enumerable: false,
        configurable: true
    });
    CStringShape.prototype.makeNullable = function () {
        return exports.NullableStringShape;
    };
    CStringShape.prototype.makeNonNullable = function () {
        return exports.StringShape;
    };
    CStringShape.prototype.emitType = function (e) {
        e.interfaces.write(this.getProxyType(e));
    };
    CStringShape.prototype.getProxyType = function (e) {
        var rv = "string";
        if (this.nullable) {
            rv += " | null";
        }
        return rv;
    };
    CStringShape.prototype.equal = function (t) {
        return this === t;
    };
    return CStringShape;
}());
exports.CStringShape = CStringShape;
exports.StringShape = new CStringShape();
exports.NullableStringShape = new CStringShape();
var CBooleanShape = /** @class */ (function () {
    function CBooleanShape() {
    }
    Object.defineProperty(CBooleanShape.prototype, "type", {
        get: function () {
            return 4 /* BOOLEAN */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CBooleanShape.prototype, "nullable", {
        get: function () {
            return this === exports.NullableBooleanShape;
        },
        enumerable: false,
        configurable: true
    });
    CBooleanShape.prototype.makeNullable = function () {
        return exports.NullableBooleanShape;
    };
    CBooleanShape.prototype.makeNonNullable = function () {
        return exports.BooleanShape;
    };
    CBooleanShape.prototype.emitType = function (e) {
        e.interfaces.write(this.getProxyType(e));
    };
    CBooleanShape.prototype.getProxyType = function (e) {
        var rv = "boolean";
        if (this.nullable) {
            rv += " | null";
        }
        return rv;
    };
    CBooleanShape.prototype.equal = function (t) {
        return this === t;
    };
    return CBooleanShape;
}());
exports.CBooleanShape = CBooleanShape;
exports.BooleanShape = new CBooleanShape();
exports.NullableBooleanShape = new CBooleanShape();
var CAnyShape = /** @class */ (function () {
    function CAnyShape(shapes, nullable) {
        this._nullable = false;
        this._hasDistilledShapes = false;
        this._distilledShapes = [];
        this._shapes = shapes;
        this._nullable = nullable;
    }
    Object.defineProperty(CAnyShape.prototype, "type", {
        get: function () {
            return 7 /* ANY */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CAnyShape.prototype, "nullable", {
        get: function () {
            return this._nullable === true;
        },
        enumerable: false,
        configurable: true
    });
    CAnyShape.prototype.makeNullable = function () {
        if (this._nullable) {
            return this;
        }
        else {
            return new CAnyShape(this._shapes, true);
        }
    };
    CAnyShape.prototype.makeNonNullable = function () {
        if (this._nullable) {
            return new CAnyShape(this._shapes, false);
        }
        else {
            return this;
        }
    };
    CAnyShape.prototype._ensureDistilled = function (e) {
        var _this = this;
        if (!this._hasDistilledShapes) {
            var shapes = new Map();
            for (var i = 0; i < this._shapes.length; i++) {
                var s = this._shapes[i];
                if (!shapes.has(s.type)) {
                    shapes.set(s.type, []);
                }
                shapes.get(s.type).push(s);
            }
            shapes.forEach(function (shapes, key) {
                var shape = exports.BottomShape;
                for (var i = 0; i < shapes.length; i++) {
                    shape = csh(e, shape, shapes[i]);
                }
                _this._distilledShapes.push(shape);
            });
            this._hasDistilledShapes = true;
        }
    };
    CAnyShape.prototype.getDistilledShapes = function (e) {
        this._ensureDistilled(e);
        return this._distilledShapes;
    };
    CAnyShape.prototype.addToShapes = function (shape) {
        var shapeClone = this._shapes.slice(0);
        shapeClone.push(shape);
        return new CAnyShape(shapeClone, this._nullable);
    };
    CAnyShape.prototype.emitType = function (e) {
        var _this = this;
        this._ensureDistilled(e);
        this._distilledShapes.forEach(function (s, i) {
            s.emitType(e);
            if (i < _this._distilledShapes.length - 1) {
                e.interfaces.write(" | ");
            }
        });
    };
    CAnyShape.prototype.getProxyType = function (e) {
        this._ensureDistilled(e);
        return this._distilledShapes.map(function (s) { return s.getProxyType(e); }).join(" | ");
    };
    CAnyShape.prototype.equal = function (t) {
        return this === t;
    };
    return CAnyShape;
}());
exports.CAnyShape = CAnyShape;
var CRecordShape = /** @class */ (function () {
    function CRecordShape(fields, nullable, contexts) {
        var _this = this;
        this._name = null;
        // Assign a context to all fields.
        var fieldsWithContext = new Map();
        fields.forEach(function (val, index) {
            if (val.type === 2 /* RECORD */ || val.type === 6 /* COLLECTION */) {
                fieldsWithContext.set(index, val.addContext(new FieldContext(_this, index)));
            }
            else {
                fieldsWithContext.set(index, val);
            }
        });
        this._fields = fieldsWithContext;
        this._nullable = nullable;
        this.contexts = contexts;
    }
    Object.defineProperty(CRecordShape.prototype, "type", {
        get: function () {
            return 2 /* RECORD */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CRecordShape.prototype, "nullable", {
        get: function () {
            return this._nullable;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Construct a new record shape. Returns an existing, equivalent record shape
     * if applicable.
     */
    CRecordShape.Create = function (e, fields, nullable, contexts) {
        if (contexts === void 0) { contexts = []; }
        var record = new CRecordShape(fields, nullable, contexts);
        return e.registerRecordShape(record);
    };
    CRecordShape.prototype.makeNullable = function () {
        if (this._nullable) {
            return this;
        }
        else {
            return new CRecordShape(this._fields, true, this.contexts);
        }
    };
    CRecordShape.prototype.addContext = function (ctx) {
        this.contexts.push(ctx);
        return this;
    };
    CRecordShape.prototype.makeNonNullable = function () {
        if (this._nullable) {
            return new CRecordShape(this._fields, false, this.contexts);
        }
        else {
            return this;
        }
    };
    CRecordShape.prototype.forEachField = function (cb) {
        this._fields.forEach(cb);
    };
    CRecordShape.prototype.getField = function (name) {
        var t = this._fields.get(name);
        if (!t) {
            return exports.NullShape;
        }
        else {
            return t;
        }
    };
    CRecordShape.prototype.equal = function (t) {
        if (t.type === 2 /* RECORD */ && this._nullable === t._nullable && this._fields.size === t._fields.size) {
            var rv_1 = true;
            var tFields_1 = t._fields;
            // Check all fields.
            // NOTE: Since size is equal, no need to iterate over t. Either they have the same fields
            // or t is missing fields from this one.
            this.forEachField(function (t, name) {
                if (rv_1) {
                    var field = tFields_1.get(name);
                    if (field) {
                        rv_1 = field.equal(t);
                    }
                    else {
                        rv_1 = false;
                    }
                }
            });
            return rv_1;
        }
        return false;
    };
    CRecordShape.prototype.emitType = function (e) {
        e.interfaces.write(this.getName(e));
        if (this.nullable) {
            e.interfaces.write(" | null");
        }
    };
    CRecordShape.prototype.getProxyClass = function (e) {
        return this.getName(e) + "Proxy";
    };
    CRecordShape.prototype.getProxyType = function (e) {
        var rv = this.getName(e) + "Proxy";
        if (this.nullable) {
            rv += " | null";
        }
        return rv;
    };
    CRecordShape.prototype.emitInterfaceDefinition = function (e) {
        var w = e.interfaces;
        w.write("export interface " + this.getName(e) + " {").endl();
        this.forEachField(function (t, name) {
            w.tab(1).write(name);
            if (t.nullable) {
                w.write("?");
            }
            w.write(": ");
            t.emitType(e);
            w.write(";").endl();
        });
        w.write("}");
    };
    CRecordShape.prototype.emitProxyClass = function (e) {
        var w = e.proxies;
        w.writeln("export class " + this.getProxyClass(e) + " {");
        this.forEachField(function (t, name) {
            w.tab(1).writeln("public readonly " + name + ": " + t.getProxyType(e) + ";");
        });
        w.tab(1).writeln("public static Parse(d: string): " + this.getProxyType(e) + " {");
        w.tab(2).writeln("return " + this.getProxyClass(e) + ".Create(JSON.parse(d));");
        w.tab(1).writeln("}");
        w.tab(1).writeln("public static Create(d: any, field: string = 'root'): " + this.getProxyType(e) + " {");
        w.tab(2).writeln("if (!field) {");
        w.tab(3).writeln("obj = d;");
        w.tab(3).writeln("field = \"root\";");
        w.tab(2).writeln("}");
        w.tab(2).writeln("if (d === null || d === undefined) {");
        w.tab(3);
        if (this.nullable) {
            w.writeln("return null;");
        }
        else {
            e.markHelperAsUsed('throwNull2NonNull');
            w.writeln("throwNull2NonNull(field, d);");
        }
        w.tab(2).writeln("} else if (typeof(d) !== 'object') {");
        e.markHelperAsUsed('throwNotObject');
        w.tab(3).writeln("throwNotObject(field, d, " + this.nullable + ");");
        w.tab(2).writeln("} else if (Array.isArray(d)) {");
        e.markHelperAsUsed('throwIsArray');
        w.tab(3).writeln("throwIsArray(field, d, " + this.nullable + ");");
        w.tab(2).writeln("}");
        // At this point, we know we have a non-null object.
        // Check all fields.
        this.forEachField(function (t, name) {
            emit_1.emitProxyTypeCheck(e, w, t, 2, "d." + name, "field + \"." + name + "\"");
        });
        w.tab(2).writeln("return new " + this.getProxyClass(e) + "(d);");
        w.tab(1).writeln("}");
        w.tab(1).writeln("private constructor(d: any) {");
        // Emit an assignment for each field.
        this.forEachField(function (t, name) {
            w.tab(2).writeln("this." + name + " = d." + name + ";");
        });
        w.tab(1).writeln("}");
        w.writeln('}');
    };
    CRecordShape.prototype.getReferencedRecordShapes = function (e, rv) {
        this.forEachField(function (t, name) {
            getReferencedRecordShapes(e, rv, t);
        });
    };
    CRecordShape.prototype.markAsRoot = function (name) {
        this._name = name;
    };
    CRecordShape.prototype.getName = function (e) {
        if (typeof (this._name) === 'string') {
            return this._name;
        }
        // Calculate unique name.
        var nameSet = new Set();
        var name = this.contexts
            .map(function (c) { return c.getName(e); })
            // Remove duplicate names.
            .filter(function (n) {
            if (!nameSet.has(n)) {
                nameSet.add(n);
                return true;
            }
            return false;
        })
            .join("Or");
        name = '_' + name;
        this._name = e.registerName(name);
        return this._name;
    };
    return CRecordShape;
}());
exports.CRecordShape = CRecordShape;
var CCollectionShape = /** @class */ (function () {
    function CCollectionShape(baseShape, contexts) {
        if (contexts === void 0) { contexts = []; }
        this._name = null;
        // Add context if a record/collection.
        this.baseShape = (baseShape.type === 2 /* RECORD */ || baseShape.type === 6 /* COLLECTION */) ? baseShape.addContext(new EntityContext(this)) : baseShape;
        this.contexts = contexts;
    }
    Object.defineProperty(CCollectionShape.prototype, "type", {
        get: function () {
            return 6 /* COLLECTION */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCollectionShape.prototype, "nullable", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    CCollectionShape.prototype.makeNullable = function () {
        return this;
    };
    CCollectionShape.prototype.makeNonNullable = function () {
        return this;
    };
    CCollectionShape.prototype.addContext = function (ctx) {
        this.contexts.push(ctx);
        return this;
    };
    CCollectionShape.prototype.emitType = function (e) {
        e.interfaces.write("(");
        this.baseShape.emitType(e);
        e.interfaces.write(")[] | null");
    };
    CCollectionShape.prototype.getProxyType = function (e) {
        var base = this.baseShape.getProxyType(e);
        if (base.indexOf("|") !== -1) {
            return "(" + base + ")[] | null";
        }
        else {
            return base + "[] | null";
        }
    };
    CCollectionShape.prototype.equal = function (t) {
        return t.type === 6 /* COLLECTION */ && this.baseShape.equal(t.baseShape);
    };
    CCollectionShape.prototype.getName = function (e) {
        if (typeof (this._name) === 'string') {
            return this._name;
        }
        var nameSet = new Set();
        // No need to make collection names unique.
        this._name = this.contexts
            .map(function (c) { return c.getName(e); })
            .filter(function (name) {
            if (!nameSet.has(name)) {
                nameSet.add(name);
                return true;
            }
            return false;
        })
            .join("Or");
        return this._name;
    };
    return CCollectionShape;
}());
exports.CCollectionShape = CCollectionShape;
function csh(e, s1, s2) {
    // csh(σ, σ) = σ
    if (s1 === s2) {
        return s1;
    }
    if (s1.type === 6 /* COLLECTION */ && s2.type === 6 /* COLLECTION */) {
        // csh([σ1], [σ2]) = [csh(σ1, σ2)]
        return new CCollectionShape(csh(e, s1.baseShape, s2.baseShape));
    }
    // csh(⊥, σ) = csh(σ, ⊥) = σ
    if (s1.type === 0 /* BOTTOM */) {
        return s2;
    }
    if (s2.type === 0 /* BOTTOM */) {
        return s1;
    }
    // csh(null, σ) = csh(σ, null) = nullable<σ>
    if (s1.type === 1 /* NULL */) {
        return s2.makeNullable();
    }
    if (s2.type === 1 /* NULL */) {
        return s1.makeNullable();
    }
    // csh(any, σ) = csh(σ, any) = any
    if (s1.type === 7 /* ANY */) {
        return s1.addToShapes(s2);
    }
    if (s2.type === 7 /* ANY */) {
        return s2.addToShapes(s1);
    }
    // csh(σ2, nullable<σˆ1> ) = csh(nullable<σˆ1> , σ2) = nullable<csh(σˆ1, σ2)>
    if (s1.nullable && s1.type !== 6 /* COLLECTION */) {
        return csh(e, s1.makeNonNullable(), s2).makeNullable();
    }
    if (s2.nullable && s2.type !== 6 /* COLLECTION */) {
        return csh(e, s2.makeNonNullable(), s1).makeNullable();
    }
    // (recd) rule
    if (s1.type === 2 /* RECORD */ && s2.type === 2 /* RECORD */) {
        // Get all fields.
        var fields_1 = new Map();
        s1.forEachField(function (t, name) {
            fields_1.set(name, csh(e, t, s2.getField(name)));
        });
        s2.forEachField(function (t, name) {
            if (!fields_1.has(name)) {
                fields_1.set(name, csh(e, t, s1.getField(name)));
            }
        });
        return CRecordShape.Create(e, fields_1, false);
    }
    // (any) rule
    return new CAnyShape([s1, s2], s1.nullable || s2.nullable);
}
exports.csh = csh;
function d2s(e, d) {
    if (d === undefined || d === null) {
        return exports.NullShape;
    }
    switch (typeof (d)) {
        case 'number':
            return exports.NumberShape;
        case 'string':
            return exports.StringShape;
        case 'boolean':
            return exports.BooleanShape;
    }
    // Must be an object or array.
    if (Array.isArray(d)) {
        // Empty array: Not enough information to figure out a precise type.
        if (d.length === 0) {
            return new CCollectionShape(exports.NullShape);
        }
        var t = exports.BottomShape;
        for (var i = 0; i < d.length; i++) {
            t = csh(e, t, d2s(e, d[i]));
        }
        return new CCollectionShape(t);
    }
    var keys = Object.keys(d);
    var fields = new Map();
    for (var i = 0; i < keys.length; i++) {
        var name = keys[i];
        fields.set(name, d2s(e, d[name]));
    }
    return CRecordShape.Create(e, fields, false);
}
exports.d2s = d2s;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEQ7QUFvQjlELFNBQVMsVUFBVSxDQUFDLENBQVM7SUFDM0IsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQTdDLENBQTZDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQUVELFNBQWdCLHlCQUF5QixDQUFDLENBQVUsRUFBRSxDQUFvQixFQUFFLEVBQVM7SUFDbkYsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFO1FBQ2Y7WUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDZCxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNWLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDcEM7WUFDRCxNQUFNO1FBQ1I7WUFDRSx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxNQUFNO1FBQ1I7WUFDRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEseUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1lBQzlFLE1BQU07S0FDVDtBQUNILENBQUM7QUFmRCw4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