gr(function(){
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    gr.registerComponent('ModelInfoFetcher', {
        attributes: {
        },
        $mount: function() {
          this._fetchModelInfo();
        },
        $update: function() {
        },
        _fetchModelInfo: function() {
            return __awaiter(this, void 0, void 0, function () {
                var gltf;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gltf = this.node.getComponent(gr.lib.gltf.Components.GLTFModelComponent);
                            return [4 /*yield*/, gltf.loadPromise];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._calcAABB(gltf)];
                        case 2:
                            _a.sent();
                            this.node.sendMessage("modelInfoFetched", this);
                            return [2 /*return*/];
                    }
                });
            });
        },
        _calcAABB: function(gltf) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var meshes, aabbs, i, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            meshes = gltf.node.getComponentsInChildren(gr.lib.fundamental.Components.MeshRendererComponent);
                            aabbs = [];
                            i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(i < meshes.length)) return [3 /*break*/, 4];
                            _b = (_a = aabbs).push;
                            return [4 /*yield*/, meshes[i].geometry];
                        case 2:
                            _b.apply(_a, [(_c.sent()).aabb]);
                            _c.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            this.modelAABB = new gr.lib.math.AABB();
                            aabbs.forEach(function (aabb) {
                                _this.modelAABB.expand(aabb.pointLBF);
                                _this.modelAABB.expand(aabb.pointRTN);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        $modelInfoFetched : function(_modelInfo) {
            var _size = _modelInfo.modelAABB.pointRTN.subtractWith(_modelInfo.modelAABB.pointLBF);
            var _iscale = Math.max(_size.X,_size.Y,_size.Z);
            var scale = 1;
            if(_iscale != 0){
                scale = 1 / _iscale * 2;
                this.node.setAttribute('scale', '' + scale + ',' + scale + ',' + scale);
            }
            
            var _center = _modelInfo.modelAABB.pointRTN.addWith(_modelInfo.modelAABB.pointLBF).multiplyWith(0.5);
            this.node.setAttribute('position', '' + (_center.X * scale * -1) + ',' + (_center.Z * scale * -1) + ',' + (_center.Y * scale * -1));
        }
    });
});

var GrimoireView = function() {
    var enabled = false;

    this.cleanup = function() {
        gr("*")("goml").remove();
    };

    this.startPreview = function() {
        mainViewModel.hasBackground(false);
        gr.Node.GomlLoader.loadForPage();
        gr.Node.GomlLoader.loadFromScriptTag();
        var rootPath = document.getElementById("gltfRootPath").textContent;
        var fileName = document.getElementById('gltfFileName').textContent;
        gr("*")("scene").append('<model src="' + rootPath + fileName + '" />');
        gr("*")("model").addComponent('ModelInfoFetcher');
    };
};
