/**
 *  Pohhnii's Library is coded by Pohhnii | Chris, an amateur.
 *  This Library is for Machine-Learning and Math.
 *  I hope this Library helps to understand the Math and Logic behind Machine-Learning.
 */
// --------------------------------------------------------------------------------------------------------------------
// ####################################################################################################################
// ##########                                  ############################                                  ##########
// ##########                                  ####  Pohhnii's Library ####                                  ########## 
// ##########                                  ############################                                  ##########
// ####################################################################################################################
// --------------------------------------------------------------------------------------------------------------------

// 2019 Hennef, Germany


/**
 * @description Object of Pohhnii's Library. Usefull for Math and Machine-Learning.
 */
const Pohhnii = {};

/**
 * @description Object for the Machine-Learning Models.
 */
Pohhnii.MODELS = {};

/**
 * @description Object for Miscellanious Functions and tools.
 */
Pohhnii.MISC = {};

/**
 * @description Objects with tools and functions for Systems to manage Objects and arrays.
 */
Pohhnii.SYSTEMS = {};

/**
 * @description Object for Functions with Parameters with an UUID as a Reference.
 */
Pohhnii.MODELS.ReferenceFunctions = {};

/**
 * @description Object with Presets for Models.
 */
Pohhnii.MODELS.ReferenceFunctions.Presets = {};

/**
 * @description Shuffles the elements of an Array randomly.
 * @param {Array} array
 * @returns {Array} shuffled-Array
 */
Pohhnii.MISC.shuffle = function (array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
/**
 * @description maps a value with the given minimum and maximum between a new Minimum and maximum.
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @param {Number} new_min
 * @param {Number} new_max
 * @returns {Number} Mapped-value
 */
Pohhnii.MISC.map = function (val, min, max, new_min, new_max) {
    return (val - min) / (max - min) * (new_max - new_min) + new_min;
}
/**
 * @description Creates a one-Dimensional-Array from a multi-dimensional-array.
 * @param {Array} arr Multi-Dimensional-Array
 * @returns {Array} One-Dimensional-Array
 */
Pohhnii.MISC.toOneDimension = function (arr) {
    let single_arr = [];
    for (let item of arr) {
        if (Array.isArray(item)) {
            single_arr = single_arr.concat(Pohhnii.MISC.toOneDimension(item));
        } else {
            single_arr.push(item);
        }
    }
    return single_arr;
}
/**
 * @description Generates a multi-dimensional-array with the given shape and one Dimensional Array.
 * @param {Array} array Array which will be turned into a multi dimensional Array.
 * @param {Array<Number>} shape Dimensions of the new Array.
 * @returns {Array} Multi-Dimensional-Array
 */
Pohhnii.MISC.shapeArray = function (array, shape) {
    let data = [...array];
    let dimensions = shape;
    let dim = dimensions.pop();
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let index = Math.floor(i / dim);
        if (i % dim === 0) {
            arr[index] = [];
        }
        arr[index].push(data[i]);
    }
    if (dimensions.length > 0) {
        arr = Pohhnii.MISC.shapeArray(arr, dimensions);
    }
    return arr;
}
/**
 * @description Generates a Universal Unique Identifier (UUID).
 * @returns {String} UUID
 */
Pohhnii.SYSTEMS.generateUUID = function () {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString();
    });
}
/**
 * @description Container for saving Objects with a generated UUID.
 */
Pohhnii.SYSTEMS.UUIDContainer = class {
    /**
     * @param {Function} generator 
     */
    constructor(generator) {
        this.generator = generator;
        if (typeof this.generator === 'undefined' || typeof this.generator !== 'function') {
            this.generator = Pohhnii.SYSTEMS.generateUUID;
        }
        this.uuids = {};
    }
    /**
     * @description Saves an Object and returns the uuid.
     * @param {Object} ContainerObject 
     * @returns {String} UUID
     */
    add(ContainerObject) {
        let id = this.generator();
        while (typeof this.uuids[id] !== 'undefined') {
            console.warn("The ID already exists!");
            id = this.generator();
        }
        this.uuids[id] = { uuid: id, Container: ContainerObject };
        return id;
    }
    /**
     * @description Returns an Object with the UUID.
     * @param {String} uuid 
     * @returns {Object} UUID-Object
     */
    get(uuid) {
        return this.uuids[uuid];
    }
    /**
     * @description Removes the Object from the Container.
     * @param {String} uuid 
     * @returns {Object} Removed Object
     */
    remove(uuid) {
        let obj = this.uuids[uuid];
        delete this.uuids[uuid];
        return obj;
    }
    /**
     * @description Sets the Container-Object with the given uuid.
     * @param {String} uuid
     * @param {Object} obj
     * @returns {Object} Old Object
     */
    replace(uuid, obj) {
        let object = this.uuids[uuid];
        this.uuids[uuid] = { uuid: uuid, Container: obj };
        return object;
    }
    /**
     * @description Returns the Hash-table with the Objects.
     * @returns {Object} UUID-Objects
     */
    uuidHashTable() {
        return this.uuids;
    }
    /**
     * @description Returns all UUIDs
     * @returns {Array<String>} UUIDs
     */
    getUUIDS() {
        return Object.keys(this.uuids);
    }
}
/**
 * @description Has all Parameters saved.
 */
Pohhnii.MODELS.ReferenceFunctions.ReferenceObject = class {
    /**
     * @param {Pohhnii.SYSTEMS.UUIDContainer} [parameter=optional] 
     */
    constructor(parameter) {
        this.parameter = parameter;
        if (typeof this.parameter === 'undefined') this.parameter = new Pohhnii.SYSTEMS.UUIDContainer();
        this.ZERO = this.addParameter(0);
        this.ONE = this.addParameter(1);
        this.TWO = this.addParameter(2);
        this.THREE = this.addParameter(3);
        this.PI = this.addParameter(Math.PI);
        this.E = this.addParameter(Math.E);
        this.INFINITY = this.addParameter(Infinity);
        this.NEGATIVEINFINITY = this.addParameter(-Infinity);
    }
    /**
     * @description Adds a Parameter to the Function.
     * @param {Any} value 
     * @returns {String} UUID as reference to the Parameter.
     */
    addParameter(value) {
        let key = this.parameter.add({ value });
        return key;
    }
    /**
     * @description Returns the Parameter with the given id/UUID as Reference.
     * @param {String} id 
     * @returns {Object} Parameter
     */
    getParameter(id) {
        return this.parameter.get(id).Container;
    }
    /**
     * @description Removes a Parameter with the given id/UUID as Reference.
     * @param {String} id 
     */
    removeParameter(id) {
        this.parameter.remove(id);
    }
}
/**
 * @description Function System which defines the relations between the parameters.
 */
Pohhnii.MODELS.ReferenceFunctions.FunctionSystem = class {
    /**
     * @param {Function} [innerFunction=optional] 
     * @param {Pohhnii.MODELS.ReferenceFunctions.ReferenceObject} [referenceObj=optional] 
     */
    constructor(innerFunction, referenceObj) {
        this.innerFunction = innerFunction;
        this.referenceObject = referenceObj;
        if (typeof this.referenceObject === 'undefined' || this.referenceObject === null) this.referenceObject = new Pohhnii.MODELS.ReferenceFunctions.ReferenceObject();
        this.ZERO = this.referenceObject.ZERO;
        this.ONE = this.referenceObject.ONE;
        this.TWO = this.referenceObject.TWO;
        this.THREE = this.referenceObject.THREE;
        this.E = this.referenceObject.E;
        this.PI = this.referenceObject.PI;
        this.INFINITY = this.referenceObject.INFINITY;
        this.NEGATIVEINFINITY = this.referenceObject.NEGATIVEINFINITY;
        if (typeof this.innerFunction === 'undefined' || this.innerFunction === null) this.innerFunction = this.ZERO;
    }
    /**
     * @description Calculates the Value of the function.
     * @param {...String|Number} [parameters=optional] parameter, value, ...
     * @returns {Number} Value of the function.
     */
    valueOf(...parameters) {
        for (let i = 0; i < parameters.length; i += 2) {
            this.referenceObject.getParameter(parameters[i]).value = parameters[i + 1];
        }
        return this.innerFunction.valueOf(this.referenceObject);
    }
    /**
     * @description Calculates the Derivative of the function with respect to the specified Parameter.
     * @param {String} parameter 
     * @param  {...String|Number} [parameters=optional] parameter, value, ...
     * @returns {Number} Derivative of the function. 
     */
    derivative(parameter, ...parameters) {
        for (let i = 0; i < parameters.length; i += 2) {
            this.referenceObject.getParameter(parameters[i]).value = parameters[i + 1];
        }
        return this.innerFunction.derivative(parameter, this.referenceObject);
    }
    /**
     * @description Adds a Parameter to the function.
     * @param {Number} value 
     * @returns {String} UUID
     */
    addParameter(value) {
        if (typeof value === 'undefined' || value === null) value = 0;
        return this.referenceObject.addParameter(value);
    }
    /**
     * @description Returns the Parameter Object.
     * @param {String} id 
     * @returns {Object} Parameter Object
     */
    getParameter(id) {
        return this.referenceObject.getParameter(id);
    }
    /**
     * @description Removes a Parameter with the given id/UUID as Reference.
     * @param {String} id 
     */
    removeParameter(id) {
        this.referenceObject.removeParameter(id);
    }
    /**
     * @description Sets the value of a Parameter.
     * @param {String} id
     * @param {Number} value
     */
    setParameter(id, value) {
        this.referenceObject.getParameter(id).value = value;
    }
    /**
     * @description Sets the first value of the function. If not used, value of the function will be 0. Resets the function.
     * @param {String|Function} parameter 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    startWith(parameter) {
        this.innerFunction = parameter;
        return this;
    }
    /**
     * @description Sets a Bracket. Returns a new Function with the same reference-object. If used in a function, use getFunction().
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} new Function
     */
    br() {
        return new Pohhnii.MODELS.ReferenceFunctions.FunctionSystem(null, this.referenceObject);
    }
    /**
     * @description Get the function. Is used by applying a new function.
     * @returns {Function} innerFunction
     */
    getFunction() {
        return this.innerFunction;
    }
    /**
     * @description Adds a Parameter to the value of the function.
     * @param {String} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    add(a) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.a = a;
            this.b = oldFunc;
            this.valueOf = function (ref) {
                let valA = (typeof this.a === 'string') ? ref.getParameter(this.a).value : this.a.valueOf(ref);
                let valB = (typeof this.b === 'string') ? ref.getParameter(this.b).value : this.b.valueOf(ref);
                return valA + valB;
            }
            this.derivative = function (parameter, ref) {
                let valA = (typeof this.a === 'string') ? ((this.a === parameter) ? 1 : 0) : this.a.derivative(parameter, ref);
                let valB = (typeof this.b === 'string') ? ((this.b === parameter) ? 1 : 0) : this.b.derivative(parameter, ref);
                return valA + valB;
            }
        }
        return this;
    }
    /**
     * @description Subtracts a Parameter to the value of the function.
     * @param {String} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    subtract(a) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.a = oldFunc;
            this.b = a;
            this.valueOf = function (ref) {
                let valA = (typeof this.a === 'string') ? ref.getParameter(this.a).value : this.a.valueOf(ref);
                let valB = (typeof this.b === 'string') ? ref.getParameter(this.b).value : this.b.valueOf(ref);
                return valA - valB;
            }
            this.derivative = function (parameter, ref) {
                let valA = (typeof this.a === 'string') ? ((this.a === parameter) ? 1 : 0) : this.a.derivative(parameter, ref);
                let valB = (typeof this.b === 'string') ? ((this.b === parameter) ? 1 : 0) : this.b.derivative(parameter, ref);
                return valA - valB;
            }
        }
        return this;
    }
    /**
     * @description Multiplies a Parameter with the value of the function.
     * @param {String} factor 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    multiply(factor) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.factor1 = oldFunc;
            this.factor2 = factor;
            this.valueOf = function (ref) {
                let valA = (typeof this.factor1 === 'string') ? ref.getParameter(this.factor1).value : this.factor1.valueOf(ref);
                let valB = (typeof this.factor2 === 'string') ? ref.getParameter(this.factor2).value : this.factor2.valueOf(ref);
                return valA * valB;
            }
            this.derivative = function (parameter, ref) {
                let der1 = (typeof this.factor1 === 'string') ? ((this.factor1 === parameter) ? 1 : 0) : this.factor1.derivative(parameter, ref);
                let der2 = (typeof this.factor2 === 'string') ? ((this.factor2 === parameter) ? 1 : 0) : this.factor2.derivative(parameter, ref);
                let val1 = (typeof this.factor1 === 'string') ? ref.getParameter(this.factor1).value : this.factor1.valueOf(ref);
                let val2 = (typeof this.factor2 === 'string') ? ref.getParameter(this.factor2).value : this.factor2.valueOf(ref);
                return der1 * val2 + der2 * val1;
            }
        }
        return this;
    }
    /**
     * @description Devides the function by the dividend.
     * @param {String} dividend 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    devide(dividend) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.divisor = oldFunc;
            this.dividend = dividend;
            this.valueOf = function (ref) {
                let valA = (typeof this.divisor === 'string') ? ref.getParameter(this.divisor).value : this.divisor.valueOf(ref);
                let valB = (typeof this.dividend === 'string') ? ref.getParameter(this.dividend).value : this.dividend.valueOf(ref);
                return valA / valB;
            }
            this.derivative = function (parameter, ref) {
                let der1 = (typeof this.divisor === 'string') ? ((this.divisor === parameter) ? 1 : 0) : this.divisor.derivative(parameter, ref);
                let der2 = (typeof this.dividend === 'string') ? ((this.dividend === parameter) ? 1 : 0) : this.dividend.derivative(parameter, ref);
                let val1 = (typeof this.divisor === 'string') ? ref.getParameter(this.divisor).value : this.divisor.valueOf(ref);
                let val2 = (typeof this.dividend === 'string') ? ref.getParameter(this.dividend).value : this.dividend.valueOf(ref);
                return (der1 * val2 - der2 * val1) / (val2 * val2);
            }
        }
        return this;
    }
    /**
     * @description Returns e (the base of natural logarithms) raised to a power - The value of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    exp() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.power = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.power === 'string') ? ref.getParameter(this.power).value : this.power.valueOf(ref);
                return Math.exp(val);
            }
            this.derivative = function (parameter, ref) {
                let der = (typeof this.power === 'string') ? ((this.power === parameter) ? 1 : 0) : this.power.derivative(parameter, ref);
                let val = (typeof this.power === 'string') ? ref.getParameter(this.power).value : this.power.valueOf(ref);
                return der * Math.exp(val);
            }
        }
        return this;
    }
    /**
     * @description Returns the value of a base expression taken to a specified power. The power must be a number!
     * @param {Number} power 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    simplePow(power) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.base = oldFunc;
            this.power = power;
            this.valueOf = function (ref) {
                let val = (typeof this.base === 'string') ? ref.getParameter(this.base).value : this.base.valueOf(ref);
                return Math.pow(val, this.power);
            }
            this.derivative = function (parameter, ref) {
                let der = (typeof this.base === 'string') ? ((this.base === parameter) ? 1 : 0) : this.base.derivative(parameter, ref);
                let val = (typeof this.base === 'string') ? ref.getParameter(this.base).value : this.base.valueOf(ref);
                if (val === 0) return 0;
                return this.power * Math.pow(val, this.power - 1) * der;
            }
        }
        return this;
    }
    /**
     * @description Returns the natural logarithm (base e).
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    ln() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return Math.log(val);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return 1 / val;
            }
        }
        return this;
    }
    /**
     * @description Returns the value of a base expression taken to a specified power.
     * @param {String} exponent
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    pow(exponent) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.base = oldFunc;
            this.exponent = exponent;
            this.valueOf = function (ref) {
                let val1 = (typeof this.base === 'string') ? ref.getParameter(this.base).value : this.base.valueOf(ref);
                let val2 = (typeof this.exponent === 'string') ? ref.getParameter(this.exponent).value : this.exponent.valueOf(ref);
                return Math.pow(val1, val2);
            }
            this.derivative = function (parameter, ref) {
                let val1 = (typeof this.base === 'string') ? ref.getParameter(this.base).value : this.base.valueOf(ref);
                let val2 = (typeof this.exponent === 'string') ? ref.getParameter(this.exponent).value : this.exponent.valueOf(ref);
                let der1 = (typeof this.base === 'string') ? ((this.base === parameter) ? 1 : 0) : this.base.derivative(parameter, ref);
                let der2 = (typeof this.exponent === 'string') ? ((this.exponent === parameter) ? 1 : 0) : this.exponent.derivative(parameter, ref);
                if (val1 === 0) return 0;
                return (1 / val1 * der1 * val2 + Math.log(val1) * der2) * Math.pow(val1, val2);
            }
        }
        return this;
    }
    /**
     * @description Negates the function - multiplies by -1.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    negate() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return -val;
            }
            this.derivative = function (parameter, ref) {
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return -der;
            }
        }
        return this;
    }
    /**
     * @description Returns the hyperbolic tangent of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    tanh() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return Math.tanh(val);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return der / Math.pow(Math.cosh(val), 2);
            }
        }
        return this;
    }
    /**
     * @description Returns the sine of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    sin() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return Math.sin(val);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return der * Math.cos(val);
            }
        }
        return this;
    }
    /**
     * @description Returns the cosine of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    cos() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return Math.cos(val);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return - der * Math.sin(val);
            }
        }
        return this;
    }
    /**
     * @description Returns the tangent of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    tan() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return Math.tan(val);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return der / Math.pow(Math.cos(val), 2);
            }
        }
        return this;
    }
    /**
     * @description Rectified Linear Units (ReLu).
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    ReLu() {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return ((val >= 0) ? val : 0);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return ((val >= 0) ? der : 0);
            }
        }
        return this;
    }
    /**
     * @description Leaky Rectified Linear Units (LeakyReLu).
     * @param {Number} factor
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    LeakyReLu(factor) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.inner = oldFunc;
            this.factor = factor;
            this.valueOf = function (ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                return ((val >= 0) ? val : this.factor * val);
            }
            this.derivative = function (parameter, ref) {
                let val = (typeof this.inner === 'string') ? ref.getParameter(this.inner).value : this.inner.valueOf(ref);
                let der = (typeof this.inner === 'string') ? ((this.inner === parameter) ? 1 : 0) : this.inner.derivative(parameter, ref);
                return ((val >= 0) ? der : this.factor * der);
            }
        }
        return this;
    }
    /**
     * @description Compares two function and returns the maximum.
     * @param {*} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    max(a) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.b = oldFunc;
            this.a = a;
            this.valueOf = function (ref) {
                let val1 = (typeof this.b === 'string') ? ref.getParameter(this.b).value : this.b.valueOf(ref);
                let val2 = (typeof this.a === 'string') ? ref.getParameter(this.a).value : this.a.valueOf(ref);
                return (val1 > val2) ? val1 : val2;
            }
            this.derivative = function (parameter, ref) {
                let val1 = (typeof this.b === 'string') ? ref.getParameter(this.b).value : this.b.valueOf(ref);
                let val2 = (typeof this.a === 'string') ? ref.getParameter(this.a).value : this.a.valueOf(ref);
                return (val1 > val2) ? (typeof this.b === 'string') ? ((this.b === parameter) ? 1 : 0) : this.b.derivative(parameter, ref) : (typeof this.a === 'string') ? ((this.a === parameter) ? 1 : 0) : this.a.derivative(parameter, ref);
            }
        }
        return this;
    }
    /**
     * @description Compares two function and returns the minimum.
     * @param {*} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    min(a) {
        let oldFunc = this.innerFunction;
        this.innerFunction = new function () {
            this.b = oldFunc;
            this.a = a;
            this.valueOf = function (ref) {
                let val1 = (typeof this.b === 'string') ? ref.getParameter(this.b).value : this.b.valueOf(ref);
                let val2 = (typeof this.a === 'string') ? ref.getParameter(this.a).value : this.a.valueOf(ref);
                return (val1 < val2) ? val1 : val2;
            }
            this.derivative = function (parameter, ref) {
                let val1 = (typeof this.b === 'string') ? ref.getParameter(this.b).value : this.b.valueOf(ref);
                let val2 = (typeof this.a === 'string') ? ref.getParameter(this.a).value : this.a.valueOf(ref);
                return (val1 < val2) ? (typeof this.b === 'string') ? ((this.b === parameter) ? 1 : 0) : this.b.derivative(parameter, ref) : (typeof this.a === 'string') ? ((this.a === parameter) ? 1 : 0) : this.a.derivative(parameter, ref);
            }
        }
        return this;
    }
    /**
     * @description Returns the square root of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    sqrt() {
        this.simplePow(1 / 2);
        return this;
    }
    /**
     * @description Returns the Sigmoid (logistic function 1/(1+exp(-x))) of the function.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} this
     */
    sigmoid() {
        let oldFunc = this.innerFunction;
        this.startWith(oldFunc).negate().exp().add(this.ONE).simplePow(-1);
        return this;
    }
    /**
     * @description Trains the model with regression by using gradient descent.
     * @param {Array<String>} parameter An array with the references to the parameters for the regressionanalysis
     * @param {Number} y The expected output value
     * @param {Number} [learnrate=optional] the learnrate which will be multiplied with the error - can be null (Standard-value: 0.05)
     * @param  {...String|Number} [parameters=optional] parameter, value, ...
     * @returns {Number} Squared Error
     */
    regression(parameter, y, learnrate, ...parameters) {
        if (learnrate === null || typeof learnrate === 'undefined') learnrate = 0.05;
        let prediction = this.valueOf(...parameters);
        let error = (prediction - y);
        for (let i = 0; i < parameter.length; i++) {
            let derivative = this.derivative(parameter[i], ...parameters);
            this.getParameter(parameter[i]).value -= error * derivative * learnrate;
        }
        return Math.pow(error, 2);
    }
}
/**
 * @typedef {Object} PolynomialFunctionObject
 * @property {Pohhnii.MODELS.ReferenceFunctions.FunctionSystem} Model The Model itself - f(x) = nx^n...
 * @property {String} X The reference to the main variable x
 * @property {Array<String>} Parameters Array with all references to the parameters of the function.
 */
/**
 * @description Creates a Polynomial Function model.
 * @param {number} grade
 * @returns {PolynomialFunctionObject} Function Object
 */
Pohhnii.MODELS.ReferenceFunctions.Presets.PolynomialFunction = function (grade) {
    let model = new Pohhnii.MODELS.ReferenceFunctions.FunctionSystem();
    let x = model.addParameter(0);
    let parameters = [];
    for (let i = 0; i < grade + 1; i++) {
        parameters[i] = model.addParameter(0);
        model.add(model.br().startWith(x).simplePow(i).multiply(parameters[i]).getFunction());
    }
    return {
        Model: model,
        X: x,
        Parameters: parameters
    }
}
/**
 * @description Initializes an array with a specific value or the values of a function.
 * @param {Number} length
 * @param {Number|Function} value
 * @returns {Array} array
 */
Pohhnii.MISC.initArray = function (length, value) {
    if (typeof value === 'function') {
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr[i] = value(i, arr);
        }
        return arr;
    }
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr[i] = value;
    }
    return arr;
}
/**
 * @description MatrixFunction for Matrix Math.
 */
Pohhnii.MODELS.ReferenceFunctions.MatrixFunction = class {
    /**
     * @param {Matrix} innerFunction 
     * @param {Pohhnii.MODELS.ReferenceFunctions.ReferenceObject} referenceObj 
     * @param {Pohhnii.MODELS.ReferenceFunctions.ReferenceObject} matrices 
     */
    constructor(innerFunction, referenceObj, matrices) {
        this.innerFunction = innerFunction;
        this.referenceObject = referenceObj;
        this.matrices = matrices;
        if (this.referenceObject === null || typeof this.referenceObject === 'undefined') this.referenceObject = new Pohhnii.MODELS.ReferenceFunctions.ReferenceObject();
        if (this.matrices === null || typeof this.matrices === 'undefined') this.matrices = new Pohhnii.MODELS.ReferenceFunctions.ReferenceObject();
        this.ZERO = this.referenceObject.ZERO;
        this.ONE = this.referenceObject.ONE;
        this.TWO = this.referenceObject.TWO;
        this.THREE = this.referenceObject.THREE;
        this.PI = this.referenceObject.PI;
        this.E = this.referenceObject.E;
        this.INFINITY = this.referenceObject.INFINITY;
        this.NEGATIVEINFINITY = this.referenceObject.NEGATIVEINFINITY;
    }
    /**
     * @description Adds a Matrix to the Function.
     * @param {Number} rows 
     * @param {Number} cols 
     * @param {Array<Number>} data 
     * @returns {String} Matrix-ID
     */
    addMatrix(rows, cols, data) {
        if (typeof data === 'number') data = Pohhnii.MISC.initArray(rows * cols, data);
        if (data === null || typeof data === 'undefined') data = Pohhnii.MISC.initArray(rows * cols, 0);
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d[i] = this.referenceObject.addParameter(data[i]);
        }
        return this.matrices.addParameter(Pohhnii.MODELS.ReferenceFunctions.Matrix(rows, cols, d));
    }
    /**
     * @description Returns the Matrix with the References to the values.
     * @param {String} id 
     * @returns {Matrix} Reference-Matrix
     */
    getRefMatrix(id) {
        return this.matrices.getParameter(id).value;
    }
    /**
     * @description Returns a Parameter of the Function.
     * @param {String} id 
     * @returns {ParameterObject} Parameter-Object
     */
    getParameter(id) {
        return this.referenceObject.getParameter(id);
    }
    /**
     * @description Returns a Matrix with the values. No Reference anymore.
     * @param {String} id
     * @returns {Matrix} Matrix
     */
    getMatrix(id) {
        let data = [];
        let refm = this.getRefMatrix(id);
        for (let i = 0; i < refm.data.length; i++) {
            data[i] = this.getParameter(refm.data[i]).value;
        }
        return Pohhnii.MODELS.ReferenceFunctions.Matrix(refm.rows, refm.cols, data);
    }
    /**
     * @description Sets the data of the Matrix.
     * @param {String} id 
     * @param {Array<Number>} data
     */
    setMatrix(id, data) {
        let refm = this.getRefMatrix(id);
        for (let i = 0; i < refm.data.length; i++) {
            this.getParameter(refm.data[i]).value = data[i];
        }
    }
    /**
     * @description Removes a Parameter with the given id/UUID as Reference.
     * @param {String} id 
     */
    removeParameter(id) {
        this.referenceObject.removeParameter(id);
    }
    /**
     * @description Removes a matrix with the given id/UUID as Reference.
     * @param {String} id 
     */
    removeMatrix(id) {
        let refm = this.getRefMatrix(id);
        for (let i = 0; i < refm.data.length; i++) {
            this.removeParameter(refm.data[i]);
        }
        this.matrices.removeParameter(id);
    }
    /**
     * @description Sets the first Matrix of the function.
     * @param {String} matrix 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    startWith(matrix) {
        this.innerFunction = (typeof matrix === 'string') ? this.getRefMatrix(matrix) : matrix;
        this.innerFunction = Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows, this.innerFunction.cols, [...this.innerFunction.data]);
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            if (typeof this.innerFunction.data[i] === 'string') {
                this.innerFunction.data[i] = new Pohhnii.MODELS.ReferenceFunctions.FunctionSystem(null, this.referenceObject).startWith(this.innerFunction.data[i]);
            }
        }
        return this;
    }
    /**
     * @description Sets a Bracket. Returns a new Function with the same reference-object. If used in a function, use getFunction().
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} new Function
     */
    br() {
        return new Pohhnii.MODELS.ReferenceFunctions.MatrixFunction(null, this.referenceObject, this.matrices);
    }
    /**
     * @description Get the function. Is used by applying a new function.
     * @returns {Matrix} innerFunction
     */
    getFunction() {
        let data = [];
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            data[i] = this.innerFunction.data[i].getFunction();
        }
        return Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows, this.innerFunction.cols, data);
    }
    /**
     * @description Calculates the Value of the function.
     * @param {...String|Matrix} [matrices=optional] Matrix, Data, ...
     * @returns {Matrix} Value of the function.
     */
    valueOf(...matrices) {
        if (this.innerFunction === null || typeof this.innerFunction === 'undefined') throw console.error("The function has to be defined!");
        for (let i = 0; i < matrices.length; i += 2) {
            this.setMatrix(matrices[i], matrices[i + 1]);
        }
        let data = [];
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            data[i] = (typeof this.innerFunction.data[i] === 'string') ? this.getParameter(this.innerFunction.data[i]).value : this.innerFunction.data[i].valueOf();
        }
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] === 'string') data[i] = this.getParameter(data[i]).value;
        }
        return Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows, this.innerFunction.cols, data);
    }
    /**
     * @description Calculates the Derivative of the function.
     * @param {String} parameter Parameter, not a Matrix!
     * @param {...String|Matrix} [matrices=optional] Matrix, Data, ...
     * @returns {Matrix} Value of the function.
     */
    derivative(parameter, ...matrices) {
        if (this.innerFunction === null || typeof this.innerFunction === 'undefined') throw console.error("The function has to be defined!");
        for (let i = 0; i < matrices.length; i += 2) {
            this.setMatrix(matrices[i], matrices[i + 1]);
        }
        let data = [];
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            data[i] = (typeof this.innerFunction.data[i] === 'string') ? ((this.innerFunction.data[i] === parameter) ? 1 : 0) : this.innerFunction.data[i].derivative(parameter);
        }
        return Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows, this.innerFunction.cols, data);
    }
    /**
     * @description Adds a Matrix to the function.
     * @param {String|Matrix} a
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    add(a) {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        if (matrixA.rows !== this.innerFunction.rows && matrixA.cols !== this.innerFunction.cols) throw console.error("The number of columns and rows must equal!");
        for (let i = 0; i < matrixA.data.length; i++) {
            this.innerFunction.data[i].add(matrixA.data[i]);
        }
        return this;
    }
    /**
     * @description Subtracts a Matrix from the function.
     * @param {String|Matrix} a
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    subtract(a) {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        if (matrixA.rows !== this.innerFunction.rows && matrixA.cols !== this.innerFunction.cols) throw console.error("The number of columns and rows must equal!");
        for (let i = 0; i < matrixA.data.length; i++) {
            this.innerFunction.data[i].subtract(matrixA.data[i]);
        }
        return this;
    }
    /**
     * @description Elementwise Multiplication
     * @param {String|Matrix} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    HadamardProduct(a) {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        if (matrixA.rows !== this.innerFunction.rows && matrixA.cols !== this.innerFunction.cols) throw console.error("The number of columns and rows must equal!");
        for (let i = 0; i < matrixA.data.length; i++) {
            this.innerFunction.data[i].multiply(matrixA.data[i]);
        }
        return this;
    }
    /**
     * @description Negates the Matrix - Multiplies by -1.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    negate() {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        if (matrixA.rows !== this.innerFunction.rows && matrixA.cols !== this.innerFunction.cols) throw console.error("The number of columns and rows must equal!");
        for (let i = 0; i < matrixA.data.length; i++) {
            this.innerFunction.data[i].negate();
        }
        return this;
    }
    /**
     * @description Multiplies the Matrix by a scalar.
     * @param {Number} number 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    multiplyBy(number) {
        let num = this.referenceObject.addParameter(number);
        if (matrixA.rows !== this.innerFunction.rows && matrixA.cols !== this.innerFunction.cols) throw console.error("The number of columns and rows must equal!");
        for (let i = 0; i < matrixA.data.length; i++) {
            this.innerFunction.data[i].multiply(num);
        }
        return this;
    }
    /**
     * @description Multiplies a Matrix with the function.
     * @param {String|Matrix} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    MatrixProduct(a) {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        if (this.innerFunction.cols !== matrixA.rows) throw console.error("The number of rows must equal the number of columns of the function!");
        let transposedMatrix = matrixA.transpose();
        let newdata = [];
        for (let i = 0; i < transposedMatrix.rows; i++) {
            for (let j = 0; j < this.innerFunction.rows; j++) {
                let sum = new Pohhnii.MODELS.ReferenceFunctions.FunctionSystem(null, this.referenceObject);
                let inner = new Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows, this.innerFunction.cols, [...this.innerFunction.data]);
                let trans = new Pohhnii.MODELS.ReferenceFunctions.Matrix(transposedMatrix.rows, transposedMatrix.cols, [...transposedMatrix.data]);
                for (let k = 0; k < this.innerFunction.cols; k++) {
                    sum.add(sum.br().startWith(inner.get(j, k).getFunction()).multiply(trans.get(i, k)).getFunction());
                }
                newdata.push(sum);
            }
        }
        this.innerFunction = new Pohhnii.MODELS.ReferenceFunctions.Matrix(transposedMatrix.rows, this.innerFunction.rows, newdata);
        this.innerFunction = this.innerFunction.transpose();
        return this;
    }
    /**
     * @description Executes the Sigmoid Function over each Element of the Matrix.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    Sigmoid() {
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            this.innerFunction.data[i].sigmoid();
        }
        return this;
    }
    /**
     * @description Executes the TanH Function over each Element of the Matrix. BROKEN!!!
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    TanH() {
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            this.innerFunction.data[i].tanh();
        }
        return this;
    }
    /**
     * @description Adds a padding to the Matrix filled with zeros.
     * @param {Number} paddingR Rows, if paddingC is undefined, padding for rows and columns.
     * @param {Number} [paddingC=optional] Columns, if undefined, paddingR will include Columns and Rows.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    addPadding(paddingR, paddingC) {
        if (typeof paddingC === 'undefined') paddingC = paddingR;
        let zero = this.ZERO;
        let tda = [...this.innerFunction.twoDimensionalArray()];
        for (let i = 0; i < paddingR; i++) {
            tda.unshift(Pohhnii.MISC.initArray(this.innerFunction.cols, zero));
            tda.push(Pohhnii.MISC.initArray(this.innerFunction.cols, zero));
        }
        for (let i = 0; i < tda.length; i++) {
            tda[i].unshift(...Pohhnii.MISC.initArray(paddingC, zero));
            tda[i].push(...Pohhnii.MISC.initArray(paddingC, zero));
        }
        this.innerFunction = Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows + paddingR * 2, this.innerFunction.cols + paddingC * 2, [...Pohhnii.MISC.toOneDimension(tda)]);
        return this;
    }
    /**
     * @description Returns a Part of the Matrix.
     * @param {Number} row 
     * @param {Number} col 
     * @param {Number} height 
     * @param {Number} width 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    getPart(row, col, height, width) {
        this.innerFunction = this.innerFunction.getPart(row, col, height, width);
        return this;
    }
    /**
     * @description Reshapes the Matrix to a Vector. new shape = (rows * cols) x 1.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} Vectorized Matrix
     */
    vec() {
        this.innerFunction = Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.cols * this.innerFunction.rows, 1, this.innerFunction.data);
        return this;
    }
    /**
     * @description Transposes the Matrix. Rows gets to Columns.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    transpose() {
        this.innerFunction = this.innerFunction.transpose();
        return this;
    }
    /**
     * @description Convolutes a Matrix over the function.
     * @param {String|Matrix} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    Convolute(a) {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        matrixA = matrixA.transpose();
        let rows = this.innerFunction.rows;
        let cols = this.innerFunction.cols;
        let filterR = matrixA.rows;
        let filterC = matrixA.cols;
        let pr = Math.floor(filterR / 2);
        let pc = Math.floor(filterC / 2);
        this.addPadding(pr, pc);
        let m = this.br().startWith(this.innerFunction).getFunction();
        let data = [];
        for (let i = 0; i < this.innerFunction.rows - filterR + 1; i++) {
            for (let j = 0; j < this.innerFunction.cols - filterC + 1; j++) {
                data.push(this.br().startWith(matrixA).vec().transpose().MatrixProduct(this.br().startWith(m).getPart(i, j, filterR, filterC).vec().getFunction()).innerFunction.data[0]);
            }
        }
        this.startWith(Pohhnii.MODELS.ReferenceFunctions.Matrix(rows, cols, data));
        return this;
    }
    /**
     * @description Calculates the Correlation of the Function with the Matrix.
     * @param {String|Matrix} a 
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    Correlate(a) {
        let matrixA = (typeof a === 'string') ? this.getRefMatrix(a) : a;
        let rows = this.innerFunction.rows;
        let cols = this.innerFunction.cols;
        let filterR = matrixA.rows;
        let filterC = matrixA.cols;
        let pr = Math.floor(filterR / 2);
        let pc = Math.floor(filterC / 2);
        this.addPadding(pr, pc);
        let m = this.br().startWith(this.innerFunction).getFunction();
        let data = [];
        for (let i = 0; i < this.innerFunction.rows - filterR + 1; i++) {
            for (let j = 0; j < this.innerFunction.cols - filterC + 1; j++) {
                data.push(this.br().startWith(matrixA).vec().transpose().MatrixProduct(this.br().startWith(m).getPart(i, j, filterR, filterC).vec().getFunction()).innerFunction.data[0]);
            }
        }
        this.startWith(Pohhnii.MODELS.ReferenceFunctions.Matrix(rows, cols, data));
        return this;
    }
    /**
     * @description 2x2 Pooling-Layer.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    maxPooling() {
        let rows = this.innerFunction.rows;
        let cols = this.innerFunction.cols;
        let poolingSize = 2;
        let newRows = Math.floor(rows / poolingSize) + ((rows % poolingSize === 0) ? 0 : 1);
        let newCols = Math.floor(cols / poolingSize) + ((cols % poolingSize === 0) ? 0 : 1);
        let data = [];
        for (let i = 0; i < newRows; i++) {
            for (let j = 0; j < newCols; j++) {
                let startRow = i * poolingSize;
                let startCol = j * poolingSize;
                let func = this.innerFunction.get(startRow, startCol).br().startWith(this.NEGATIVEINFINITY);
                for (let k = 0; k < poolingSize; k++) {
                    for (let l = 0; l < poolingSize; l++) {
                        let val = this.innerFunction.get(startRow + k, startCol + l);
                        if (val === null || typeof val === 'undefined') val = func.br().startWith(this.NEGATIVEINFINITY);
                        func.max(val.getFunction());
                    }
                }
                data.push(func);
            }
        }
        this.startWith(Pohhnii.MODELS.ReferenceFunctions.Matrix(newRows, newCols, data));
        return this;
    }
    /**
     * @description Rectified Linear Units (ReLu). Activation Function.
     * @returns @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    ReLu() {
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            this.innerFunction.data[i].ReLu();
        }
        return this;
    }
    /**
     * @description Leaky Rectified Linear Units (Leaky ReLu). Activation Function.
     * @param {Number} factor
     * @returns @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    LeakyReLu(factor) {
        for (let i = 0; i < this.innerFunction.data.length; i++) {
            this.innerFunction.data[i].LeakyReLu(factor);
        }
        return this;
    }
    /**
     * @description Does Nothing.
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    NONE() {
        return this;
    }
    /**
     * 
     * @param {Object} config
     * @param {Number} config.nodes
     * @param {Number} [config.inputs=optional]
     * @param {Function} cb
     * @returns {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} this
     */
    DenseLayer(config, cb) {
        let nodes = config.nodes;
        let inputs = (typeof config.inputs === 'number') ? config.inputs : this.innerFunction.cols;
        let Parameter = [];
        Parameter[0] = this.addMatrix(inputs, nodes);
        Parameter[1] = this.addMatrix(1, nodes);
        this.MatrixProduct(Parameter[0]).add(Parameter[1]);
        cb(Parameter[0], Parameter[1]);
        return this;
    }
    /**
     * @description Trains the Model with regression and gradient descent. Returns the Mean-Squared-Error.
     * @param {Array<String>} parameter 
     * @param {Matrix|String|Array<Number>} y 
     * @param {Number} learnrate Standard value: 0.05
     * @param  {...String|Array<Number>} matrices 
     * @returns {Number} mse
     */
    regression(parameter, y, learnrate, ...matrices) {
        if (learnrate === null || typeof learnrate === 'undefined' || typeof learnrate !== 'number') learnrate = 0.05;
        if (this.innerFunction === null || typeof this.innerFunction === 'undefined') throw console.error("The function has to be defined!");
        if (typeof y === 'string') y = this.getMatrix(y);
        if (Array.isArray(y)) y = Pohhnii.MODELS.ReferenceFunctions.Matrix(this.innerFunction.rows, this.innerFunction.cols, y);
        let prediction = this.valueOf(...matrices);
        let errdata = [];
        for (let i = 0; i < prediction.data.length; i++) {
            errdata[i] = prediction.data[i] - y.data[i];
        }
        for (let i = 0; i < parameter.length; i++) {
            let derivative = this.derivative(parameter[i]).data;
            let dp = 0;
            for (let i = 0; i < derivative.length; i++) {
                dp += derivative[i] * errdata[i] * learnrate;
            }
            this.getParameter(parameter[i]).value -= dp;
        }
        let mse = 0;
        for (let i = 0; i < errdata.length; i++) {
            mse += Math.pow(errdata[i], 2);
        }
        return mse / errdata.length;
    }
}
/**
 * @typedef {Object} ParameterObject
 * @property {any}value
 */
/**
 * @typedef {Object} Matrix
 * @property {Number} rows
 * @property {Number} cols
 * @property {Array} data
 * @property {Function} get Returns an Item of the Matrix.
 * @property {Function} set Sets an Item of the Matrix.
 * @property {Function} twoDimensionalArray Returns a Representation of the Matrix as a 2-Dimensional Array.
 * @property {Function} transpose Transposes the Matrix. Rows getting to Columns.
 * @property {Function} getPart Returns a part of the Matrix.
 */
/**
 * @description Creates a Matrix-Object with rows, columns and the data.
 * @param {Number} rows
 * @param {Number} cols
 * @param {Array} data
 * @returns {Matrix} Matrix
 */
Pohhnii.MODELS.ReferenceFunctions.Matrix = function (rows, cols, data) {
    if (rows * cols !== data.length) throw console.warn("The shape of the Matrix does not fit with the data!");
    return {
        rows, cols, data,
        get: function (row, col) {
            return this.data[row * this.cols + col];
        },
        set: function (row, col, value) {
            this.data[row * this.cols + col] = value;
        },
        twoDimensionalArray: function () {
            return Pohhnii.MISC.shapeArray(this.data, [this.rows, this.cols])[0];
        },
        transpose: function () {
            let oldData = [...this.twoDimensionalArray()];
            let d = [];
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    d.push(oldData[j][i]);
                }
            }
            return Pohhnii.MODELS.ReferenceFunctions.Matrix(this.cols, this.rows, d);
        },
        getPart: function (row, col, height, width) {
            let newdata = [];
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    newdata.push(this.get(row + i, col + j));
                }
            }
            return Pohhnii.MODELS.ReferenceFunctions.Matrix(height, width, [...newdata]);
        },
        rotateHalf: function () {
            return Pohhnii.MODELS.ReferenceFunctions.Matrix(this.rows, this.cols, this.data.reverse());
        }
    };
}
/**
 * @typedef {Object} MatrixFunctionObject
 * @property {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} Model The Model itself - f(x) = nx^n...
 * @property {String} X The reference to the main variable x
 * @property {Array<String>} Parameters Array with all references to the parameters of the function.
 */
/**
 * @description Creates a Simple NeuralNetwork with two Dense Layers.
 * @param {Number} inputs
 * @param {Number} hidden
 * @param {Number} outputs
 * @returns {MatrixFunctionObject} NN
 */
Pohhnii.MODELS.ReferenceFunctions.Presets.SimpleNN = function (inputs, hidden, outputs) {
    let model = new Pohhnii.MODELS.ReferenceFunctions.MatrixFunction();
    let x = model.addMatrix(1, inputs, Pohhnii.MISC.initArray(inputs, 0));
    let hiddenLayer, hiddenBias, outputLayer, outputBias;
    model.startWith(x).DenseLayer({ nodes: hidden }, (w, b) => {
        hiddenLayer = w;
        hiddenBias = b;
    }).Sigmoid().DenseLayer({ nodes: outputs }, (w, b) => {
        outputLayer = w;
        outputBias = b;
    }).Sigmoid();
    let Parameters = [];
    Parameters.push(...model.getRefMatrix(hiddenLayer).data);
    Parameters.push(...model.getRefMatrix(hiddenBias).data);
    Parameters.push(...model.getRefMatrix(outputLayer).data);
    Parameters.push(...model.getRefMatrix(outputBias).data);
    return {
        Model: model,
        Parameters,
        X: x,
        hiddenLayer, hiddenBias, outputLayer, outputBias
    }
}
/**
 * @typedef {Object} SimpleRecurrentModel
 * @property {Number} inputs
 * @property {Number} hidden
 * @property {Number} outputs
 * @property {Number} standard_value
 * @property {Pohhnii.MODELS.ReferenceFunctions.MatrixFunction} model
 * @property {Array<String>} input_parameter
 * @property {String} hidden_layer
 * @property {String} hidden_bias
 * @property {String} output_layer
 * @property {String} output_bias
 * @property {String} recurrent_layer
 * @property {String} recurrent_bias
 * @property {String} recurrent_start
 * @property {Matrix} recurrent_state
 * @property {Array<String>} Parameter
 * @property {Function} reset
 * @property {Function} time_step
 * @property {Function} predict
 * @property {Function} regression
 */
/**
 * @description preset for a simple recurrent neural network.
 * @param {Number} inputs
 * @param {Number} hidden
 * @param {Number} outputs
 * @returns {SimpleRecurrentModel} simple RNN
 */
Pohhnii.MODELS.ReferenceFunctions.Presets.SimpleRecurrentModel = function (inputs, hidden, outputs) {
    return new function () {
        this.inputs = inputs;
        this.outputs = outputs;
        this.hidden = hidden;

        this.standard_value = 0;

        this.model = new Pohhnii.MODELS.ReferenceFunctions.MatrixFunction();

        this.hidden_layer = this.model.addMatrix(this.inputs, this.hidden, Pohhnii.MISC.initArray(this.inputs * this.hidden, this.standard_value));
        this.hidden_bias = this.model.addMatrix(1, this.hidden, Pohhnii.MISC.initArray(this.hidden, this.standard_value));

        this.output_layer = this.model.addMatrix(this.hidden, this.outputs, Pohhnii.MISC.initArray(this.hidden * this.outputs, this.standard_value));
        this.output_bias = this.model.addMatrix(1, this.outputs, Pohhnii.MISC.initArray(this.outputs, this.standard_value));

        this.recurrent_layer = this.model.addMatrix(this.hidden, this.hidden, Pohhnii.MISC.initArray(this.hidden * this.hidden, this.standard_value));
        this.recurrent_bias = this.model.addMatrix(1, this.hidden), Pohhnii.MISC.initArray(this.hidden, this.standard_value);

        this.recurrent_start = this.model.addMatrix(1, this.hidden), Pohhnii.MISC.initArray(this.hidden, this.standard_value);
        this.recurrent_state = this.model.br().startWith(this.recurrent_start).getFunction();

        this.Parameter = [
            ...this.model.getRefMatrix(this.hidden_layer).data,
            ...this.model.getRefMatrix(this.hidden_bias).data,
            ...this.model.getRefMatrix(this.output_layer).data,
            ...this.model.getRefMatrix(this.output_bias).data,
            ...this.model.getRefMatrix(this.recurrent_layer).data,
            ...this.model.getRefMatrix(this.recurrent_bias).data
        ];

        this.input_parameter = [];

        /**
         * @description Resets the Model and the Hidden-State.
         */
        this.reset = function () {
            for (let i = 0; i < this.input_parameter.length; i++) {
                this.model.removeMatrix(this.input_parameter[i]);
            }
            this.input_parameter = [];
            this.model = new Pohhnii.MODELS.ReferenceFunctions.MatrixFunction(this.model.innerFunction, this.model.referenceObject, this.model.matrices);
            this.recurrent_state = this.model.br().startWith(this.recurrent_start).getFunction();
        }
        /**
         * @description Feedforward-Process for one time-step.
         * @param {Array<Number>} new_data New x-value for the time-step
         * @returns {Matrix} output
         */
        this.time_step = function (new_data) {
            this.input_parameter.push(this.model.addMatrix(1, this.inputs, new_data));
            this.recurrent_state = this.model.br().startWith(this.input_parameter[this.input_parameter.length - 1]).MatrixProduct(this.hidden_layer).add(this.hidden_bias).add(this.recurrent_state).Sigmoid().getFunction();
            this.model.startWith(this.recurrent_start).add(this.recurrent_state).MatrixProduct(this.output_layer).add(this.output_bias).Sigmoid();
            return this.model.valueOf();
        }
        /**
         * @description FeedForward-Process for more than one time-step.
         * @param {Array<Array<Number>>} data x-values for each time-step
         * @returns {Array<Matrix>>} outputs
         */
        this.predict = function (data) {
            let predictions = [];
            for (let i = 0; i < data.length; i++) {
                predictions.push(this.time_step(data[i]));
            }
            return predictions;
        }
        /**
         * @description Trains the Model with regression and gradient descent.
         * @param {Array<Array<Number>>} data x-values for each time-step
         * @param {Array<Matrix>} outputs output-matrices for each time-step
         * @param {Number} lr learnrate
         */
        this.regression = function (data, outputs, lr) {
            this.reset();
            for (let i = 0; i < data.length; i++) {
                this.time_step(data[i]);
                this.model.regression(this.Parameter, outputs[i], lr);
            }
            this.reset();
        }
    }
}
/**
 * @description Class for structuring genetic algorithm
 */
Pohhnii.MODELS.Genetix = class {
    /**
     * @param {*} [Organism=optional] Array of organism in the genetic Model
     */
    constructor(Organism) {
        this.Organism = Organism || [];
        this.fitnessOf = function () { return 0; };
        this.mutate = function (org) { return org; };
    }
    /**
     * @description Sets the Array of organism
     * @param {*} organism Array of organism in the genetic Model
     */
    setOrganism(organism) {
        this.Organism = organism;
    }
    /**
     * @description Sets the Function for calculating the fitness of a single Organism. The function takes a single Organism as a parameter.
     * @param {Function} func 
     */
    setFitnessFunction(func) {
        this.fitnessOf = func;
    }
    /**
     * @description Sests the Function for mutating an organism. The function takes a single Organism as a parameter.
     * @param {Function} func 
     */
    setMutationFunction(func) {
        this.mutate = func;
    }
    /**
     * @description Does a whole Lifecycle of the Organism. Includes generating a new generation by choosing the fittest organism and mutating that.
     * @param {Function} func Function for doing the lifecycle and the tasks of the Organism.
     * @returns {Promise}
     */
    lifeCycle(func) {
        return new Promise((resolve, reject) => {
            let lc = new Promise((res, rej) => {
                func(res, rej);
            }).then(() => {
                const best = this.Organism.map(val => { return { Organism: val, Fitness: this.fitnessOf(val) }; }).sort((a, b) => { return (a.Fitness > b.Fitness) ? -1 : 1; })[0].Organism;
                this.Organism = this.Organism.map((org, index) => {
                    return (index === 0) ? org : this.mutate(org);
                });
                resolve(this.Organism);
            });
        });
    }
}

//Exporting the Library
if (typeof module !== 'undefined' && module.exports) module.exports = Pohhnii;