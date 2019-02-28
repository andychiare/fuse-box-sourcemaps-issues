const { src, task, exec, context } = require("fuse-box/sparky");
const { FuseBox, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const path = require('path')
const fs = require('fs')

let DEVELOPMENT = false
const projectRootFolder = fs.realpathSync(process.cwd());

class AppContext {
    getConfig() {
        return FuseBox.init({
            homeDir: "src/app",
            output: "dist/$name.js",
            target : "browser@es5",
            sourceMaps: { project: true, vendor: true, inline: true },
            hash: false,
            useTypescriptCompiler : true,
            allowSyntheticDefaultImports : true,
            cache: false,
            modulesFolder: "my_modules",
            plugins: [
                WebIndexPlugin({
                    template : "./src/app/index.html"
                })
            ],
            globals: {"default": "*"}
        })
    }

    createMainBundle(fuse) {
        const bundle = fuse.bundle("app")
        if (this.isDevelopment) {
            bundle.watch()
            bundle.hmr()
        }
        bundle.instructions("!>[index.jsx]")
        return bundle
    }

    createVendorBundle(fuse) {
        const bundle = fuse.bundle("vendor")
        if (this.isDevelopment) {
            bundle.watch()
            bundle.hmr()
        }
        bundle.instructions("~index.jsx")
        return bundle
    }
}

class WidgetContext {
    getConfig() {
        return FuseBox.init({
            homeDir: "src/widget",
            output: "dist/$name.js",
            target : "browser@es5",
            sourceMaps: { project: true, vendor: false, inline: true },
            hash: false,
            useTypescriptCompiler : true,
            allowSyntheticDefaultImports : true,
            cache: false,
            globals: {"default": "WidgetModule"}
        })
    }

    createMainBundle(fuse) {
        const bundle = fuse.bundle("widget")
        bundle.instructions("!>[widget.jsx]")
        return bundle
    }
}

class LibContext {
    getConfig() {
        return FuseBox.init({
            homeDir: "src/lib",
            output: "my_modules/mylib/$name.js",
            target : "server",
            sourceMaps: { project: true, vendor: false, inline: true },
            hash: false,
            useTypescriptCompiler : true,
            allowSyntheticDefaultImports : true,
            cache: false,
            plugins: [
                QuantumPlugin({
                    bakeApiIntoBundle: "index",
                    uglify: false,
                    containedAPI: true,
                    target: "npm",
                    treeshake : true,
                    sourceMaps: true
                })
            ],
            globals: {"default": "*"}
        })
    }

    createMainBundle(fuse) {
        const bundle = fuse.bundle("index")
        bundle.instructions("!>[index.js]")
        return bundle
    }
}

task("clean", () => src("dist").clean("dist").exec() )

task("start", async () => {
    DEVELOPMENT = true
    await exec("build")
})

task("build", ["clean"], async () => {
    await exec("build-lib")
    await exec("build-widget")
    await exec("build-app")
})

task("build-lib", async () => {
    const context = new LibContext()
    const fuse = context.getConfig()
    context.createMainBundle(fuse)
    await fuse.run()

    await src("package.json", { base: "./src/lib" }).dest("./my_modules/mylib").exec();
})

task("build-widget", async () => {
    const context = new WidgetContext()
    const fuse = context.getConfig()
    context.createMainBundle(fuse)
    await fuse.run()
})

task("build-app", async () => {
    const context = new AppContext()
    context.isDevelopment = DEVELOPMENT
    const fuse = context.getConfig()

    if (DEVELOPMENT) {
        fuse.dev({
            port: 8082,
            fallback: "index.html"
        })
    }

    context.createVendorBundle(fuse)
    context.createMainBundle(fuse)
    await fuse.run()
})