const cluster = require("cluster");
const os = require("os");

const CPUS = os.cpus();

if (cluster.isMaster) {
    console.log(CPUS);
    console.log(`Master ${process.pid} is running`);

    CPUS.forEach(() => cluster.fork());
    cluster.on("listening", worker => {
        console.log("Cluster %d conectado", worker.process.pid);
    });
    cluster.on("disconnect", worker => {
        console.log("Cluster %d desconectado", worker.process.pid);
    });
    cluster.on("exit", worker => {
        console.log("Cluster %d esta muerto", worker.process.pid); cluster.fork();
// Ensure starts of a new cluster if an old one dies
    });
} else {
    require("./main.js");
}
