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
    };
};
