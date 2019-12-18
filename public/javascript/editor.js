function createEditor(config) {
    var editor = null;

    var hideSplash = function () {
        // Fades-out the splash screen
        var splash = document.getElementById('splash');

        if (splash != null) {
            try {
                mxEvent.release(splash);
                mxEffects.fadeOut(splash, 100, true);
            } catch (e) {
                splash.parentNode.removeChild(splash);
            }
        }
    };

    try {
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            mxObjectCodec.allowEval = true;
            var node = mxUtils.load(config).getDocumentElement();
            editor = new mxEditor(node);
            mxObjectCodec.allowEval = false;

            // Adds active border for panning inside the container
            editor.graph.createPanningManager = function () {
                var pm = new mxPanningManager(this);
                pm.border = 30;

                return pm;
            };

            editor.graph.allowAutoPanning = true;
            editor.graph.timerAutoScroll = true;


            let graph = editor.graph;
            var margin = 15;
            var max = 15;

            var bounds = graph.getGraphBounds();
            var cw = graph.container.clientWidth - margin;
            var ch = graph.container.clientHeight - margin;
            var w = bounds.width / graph.view.scale;
            var h = bounds.height / graph.view.scale;
            var s = Math.min(max, Math.min(cw / w, ch / h));

            graph.view.scaleAndTranslate(s,
                (margin + cw - w * s) / (2 * s) - bounds.x / graph.view.scale,
                (margin + ch - h * s) / (2 * s) - bounds.y / graph.view.scale);

            // console.log({clientWidth: graph.container.clientWidth, clientHeight: graph.container.clientHeight});
            // console.log({width: bounds.width, height: bounds.height});
            // console.log(graph.view.scale);

            window.addEventListener('resize', () => {
                // editor.graph.updateCellSize();
                editor.graph.fit();
                var bounds = graph.getGraphBounds();
                var cw = graph.container.clientWidth - margin;
                var ch = graph.container.clientHeight - margin;
                var w = bounds.width / graph.view.scale;
                var h = bounds.height / graph.view.scale;
                var s = Math.min(max, Math.min(cw / w, ch / h));

                graph.view.scaleAndTranslate(s,
                    (margin + cw - w * s) / (2 * s) - bounds.x / graph.view.scale,
                    (margin + ch - h * s) / (2 * s) - bounds.y / graph.view.scale);
                editor.graph.fit();
            });
            // let displayWindowSize = () => {
            //     setTimeout(() => {
            //         let graph = editor.graph;
            //         var margin = 2;
            //         var max = 3;
            //
            //         var bounds = graph.getGraphBounds();
            //         var cw = graph.container.clientWidth - margin;
            //         var ch = graph.container.clientHeight - margin;
            //         var w = bounds.width / graph.view.scale;
            //         var h = bounds.height / graph.view.scale;
            //         var s = Math.min(max, Math.min(cw / w, ch / h));
            //
            //         graph.view.scaleAndTranslate(s,
            //             (margin + cw - w * s) / (2 * s) - bounds.x / graph.view.scale,
            //             (margin + ch - h * s) / (2 * s) - bounds.y / graph.view.scale);
            //     }, 1000);
            // };
            //
            // window.addEventListener("resize", displayWindowSize);
            //
            // displayWindowSize();

            // Updates the window title after opening new files
            var title = document.title;
            var funct = function (sender) {
                document.title = title + ' - ' + sender.getTitle();
            };

            editor.addListener(mxEvent.OPEN, funct);

            // Prints the current root in the window title if the
            // current root of the graph changes (drilling).
            editor.addListener(mxEvent.ROOT, funct);
            funct(editor);

            // Displays version in statusbar
            // editor.setStatus('mxGraph ' + mxClient.VERSION);

            // Shows the application
            hideSplash();
        }
    } catch (e) {
        hideSplash();

        // Shows an error message if the editor cannot start
        mxUtils.alert('Cannot start application: ' + e.message);
        throw e; // for debugging
    }

    return editor;
}